import { db } from "@/firebase/firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const CACHE_TTL_MS = 30_000;
const cache = new Map();

function now() {
  return Date.now();
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function sanitizeForFirestore(value) {
  if (value === undefined) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => sanitizeForFirestore(item))
      .filter((item) => item !== undefined);
  }

  if (value && typeof value === "object" && !(value instanceof Date)) {
    const next = {};
    Object.entries(value).forEach(([key, nestedValue]) => {
      const sanitized = sanitizeForFirestore(nestedValue);
      if (sanitized !== undefined) {
        next[key] = sanitized;
      }
    });
    return next;
  }

  return value;
}

function normalizeDocument(input) {
  const documentValue = { ...input };

  if (documentValue._id && typeof documentValue._id === "object" && documentValue._id.$oid) {
    documentValue._id = documentValue._id.$oid;
  }

  if (documentValue.timestamp && typeof documentValue.timestamp === "object") {
    if (typeof documentValue.timestamp.toDate === "function") {
      documentValue.timestamp = documentValue.timestamp.toDate().toISOString();
    } else if (documentValue.timestamp.$date) {
      documentValue.timestamp = documentValue.timestamp.$date;
    }
  }

  if (documentValue._id === undefined || documentValue._id === null) {
    delete documentValue._id;
  } else {
    documentValue._id = String(documentValue._id);
  }

  return documentValue;
}

function generateObjectIdLike() {
  const chars = "abcdef0123456789";
  let nextId = "";
  for (let i = 0; i < 24; i += 1) {
    nextId += chars[Math.floor(Math.random() * chars.length)];
  }
  return nextId;
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function toPrice(value) {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function getNameByLanguage(value, language = 1) {
  if (!Array.isArray(value)) {
    return String(value || "");
  }
  return value[language] || value[1] || value[0] || "";
}

function matchesSearch(book, titleQuery = "") {
  if (!titleQuery) {
    return true;
  }
  const title = asArray(book.title).join(" ").toLowerCase();
  return title.includes(String(titleQuery).toLowerCase());
}

function filterByField(book, key, value) {
  if (!value) {
    return true;
  }
  if (Array.isArray(book[key])) {
    return book[key].includes(value);
  }
  return book[key] === value;
}

function invalidateCollection(name) {
  cache.delete(name);
}

function invalidateCollections(...names) {
  names.forEach((name) => invalidateCollection(name));
}

async function readCollection(name, force = false) {
  const cached = cache.get(name);
  if (!force && cached && now() - cached.time < CACHE_TTL_MS) {
    return clone(cached.data);
  }

  const snapshot = await getDocs(collection(db, name));
  const data = snapshot.docs.map((snapshotDoc) =>
    normalizeDocument({
      _id: snapshotDoc.id,
      ...snapshotDoc.data(),
    }),
  );

  cache.set(name, { time: now(), data });
  return clone(data);
}

async function findOneByField(collectionName, fieldName, fieldValue) {
  const firestoreQuery = query(
    collection(db, collectionName),
    where(fieldName, "==", fieldValue),
    limit(1),
  );
  const snapshot = await getDocs(firestoreQuery);
  if (snapshot.empty) {
    return null;
  }
  const firstDoc = snapshot.docs[0];
  return normalizeDocument({
    _id: firstDoc.id,
    ...firstDoc.data(),
  });
}

async function findRefByField(collectionName, fieldName, fieldValue) {
  const firestoreQuery = query(
    collection(db, collectionName),
    where(fieldName, "==", fieldValue),
    limit(1),
  );
  const snapshot = await getDocs(firestoreQuery);
  if (snapshot.empty) {
    return null;
  }
  return doc(db, collectionName, snapshot.docs[0].id);
}

async function upsertByDocumentId(collectionName, id, payload) {
  const normalizedId = String(id || payload?._id || generateObjectIdLike());
  const nextPayload = sanitizeForFirestore(
    normalizeDocument({
      ...payload,
      _id: normalizedId,
    }),
  );
  await setDoc(doc(db, collectionName, normalizedId), nextPayload, { merge: true });
  invalidateCollection(collectionName);
  return clone(nextPayload);
}

async function removeByDocumentId(collectionName, id) {
  const normalizedId = String(id || "").trim();
  if (!normalizedId) {
    return { deletedCount: 0 };
  }

  await deleteDoc(doc(db, collectionName, normalizedId));
  invalidateCollection(collectionName);
  return { deletedCount: 1 };
}

async function prepareLookups() {
  const [writers, translators, editors, publishers, categories, subcategories, importedCountries] =
    await Promise.all([
      readCollection("writers"),
      readCollection("translators"),
      readCollection("editors"),
      readCollection("publishers"),
      readCollection("categories"),
      readCollection("subcategories"),
      readCollection("importedCountries"),
    ]);

  return {
    writers,
    translators,
    editors,
    publishers,
    categories,
    subcategories,
    importedCountries,
  };
}

function enrichBook(rawBook, lookups) {
  const book = normalizeDocument(rawBook);
  const writerIds = asArray(book.writer);
  const translatorIds = asArray(book.translator);
  const editorIds = asArray(book.editor);

  return {
    ...book,
    writerDetails: lookups.writers.filter((writer) => writerIds.includes(writer.writerId)),
    translatorDetails: lookups.translators.filter((translator) =>
      translatorIds.includes(translator.translatorId),
    ),
    editorDetails: lookups.editors.filter((editor) => editorIds.includes(editor.editorId)),
    publisherDetails: lookups.publishers.filter(
      (publisher) => publisher.publisherId === book.publisher || publisher._id === book.publisher,
    ),
    categoryDetails: lookups.categories.filter(
      (category) => category.categoryId === book.category || category._id === book.category,
    ),
    subCategoryDetails: lookups.subcategories.filter(
      (subCategory) => subCategory.subCategoryId === book.subCategory || subCategory._id === book.subCategory,
    ),
    importedCountryDetails: lookups.importedCountries.filter(
      (country) => country.countryId === book.importedCountry || country._id === book.importedCountry,
    ),
  };
}

export async function getBooks(params = {}) {
  const {
    title = "",
    sort = 1,
    gte = 0,
    lte = 50000,
    page = 0,
    size = 10,
    category,
    subCategory,
    publisher,
    writer,
  } = params;

  const skip = Number(page) * Number(size);
  const books = await readCollection("books");
  const lookups = await prepareLookups();

  return books
    .filter((book) => matchesSearch(book, title))
    .filter((book) => {
      const price = toPrice(book.price);
      return price >= Number(gte) && price <= Number(lte);
    })
    .filter((book) => filterByField(book, "category", category))
    .filter((book) => filterByField(book, "subCategory", subCategory))
    .filter((book) => filterByField(book, "publisher", publisher))
    .filter((book) => filterByField(book, "writer", writer))
    .sort((a, b) => {
      const aPrice = toPrice(a.price);
      const bPrice = toPrice(b.price);
      return Number(sort) >= 0 ? aPrice - bPrice : bPrice - aPrice;
    })
    .slice(skip, skip + Number(size))
    .map((book) => enrichBook(book, lookups));
}

export async function getBooksLength() {
  const books = await readCollection("books");
  return books.length;
}

export async function getAllBooks() {
  const books = await readCollection("books");
  const lookups = await prepareLookups();
  return books.map((book) => enrichBook(book, lookups));
}

export async function getBookById(id) {
  const normalizedId = String(id || "").trim();
  if (!normalizedId) {
    return null;
  }

  const snapshot = await getDoc(doc(db, "books", normalizedId));
  const lookups = await prepareLookups();

  if (snapshot.exists()) {
    return enrichBook(
      normalizeDocument({
        _id: snapshot.id,
        ...snapshot.data(),
      }),
      lookups,
    );
  }

  const books = await readCollection("books");
  const fallback = books.find((item) => item._id === normalizedId);
  return fallback ? enrichBook(fallback, lookups) : null;
}

export async function getBooksByCategory(categoryId) {
  const books = await readCollection("books");
  const lookups = await prepareLookups();
  return books
    .filter((book) => book.category === categoryId)
    .map((book) => enrichBook(book, lookups));
}

export async function addBook(payload) {
  const insertedId = String(payload?._id || generateObjectIdLike());
  await setDoc(
    doc(db, "books", insertedId),
    sanitizeForFirestore(
      normalizeDocument({
        ...payload,
        _id: insertedId,
      }),
    ),
  );
  invalidateCollection("books");
  return { insertedId };
}

export async function editBook(id, payload) {
  return upsertByDocumentId("books", id, payload);
}

export async function deleteBook(id) {
  return removeByDocumentId("books", id);
}

export async function getWriters() {
  return readCollection("writers");
}

export async function getWriterById(writerId) {
  if (!writerId) {
    return null;
  }
  return findOneByField("writers", "writerId", writerId);
}

export async function getWritersByIds(writerIds = []) {
  const writers = await readCollection("writers");
  return writers.filter((writer) => writerIds.includes(writer.writerId));
}

export async function addWriter(payload) {
  const insertedId = String(payload?._id || generateObjectIdLike());
  await setDoc(
    doc(db, "writers", insertedId),
    sanitizeForFirestore(
      normalizeDocument({
        ...payload,
        _id: insertedId,
      }),
    ),
  );
  invalidateCollection("writers");
  return { insertedId };
}

export async function editWriter(writerId, payload) {
  const existingRef = await findRefByField("writers", "writerId", writerId);
  if (existingRef) {
    await updateDoc(existingRef, sanitizeForFirestore({ ...payload, writerId }));
    invalidateCollection("writers");
    return { modifiedCount: 1 };
  }

  const insertedId = generateObjectIdLike();
  await setDoc(
    doc(db, "writers", insertedId),
    sanitizeForFirestore(
      normalizeDocument({
        ...payload,
        writerId,
        _id: insertedId,
      }),
    ),
  );
  invalidateCollection("writers");
  return { upsertedId: insertedId };
}

export async function deleteWriter(id) {
  return removeByDocumentId("writers", id);
}

export async function getEditors() {
  return readCollection("editors");
}

export async function getEditorById(editorId) {
  if (!editorId) {
    return null;
  }
  return findOneByField("editors", "editorId", editorId);
}

export async function addEditor(payload) {
  const insertedId = String(payload?._id || generateObjectIdLike());
  await setDoc(
    doc(db, "editors", insertedId),
    sanitizeForFirestore(
      normalizeDocument({
        ...payload,
        _id: insertedId,
      }),
    ),
  );
  invalidateCollection("editors");
  return { insertedId };
}

export async function editEditor(editorId, payload) {
  const existingRef = await findRefByField("editors", "editorId", editorId);
  if (existingRef) {
    await updateDoc(existingRef, sanitizeForFirestore({ ...payload, editorId }));
    invalidateCollection("editors");
    return { modifiedCount: 1 };
  }

  const insertedId = generateObjectIdLike();
  await setDoc(
    doc(db, "editors", insertedId),
    sanitizeForFirestore(
      normalizeDocument({
        ...payload,
        editorId,
        _id: insertedId,
      }),
    ),
  );
  invalidateCollection("editors");
  return { upsertedId: insertedId };
}

export async function deleteEditor(id) {
  return removeByDocumentId("editors", id);
}

export async function getTranslators() {
  return readCollection("translators");
}

export async function getTranslatorById(translatorId) {
  if (!translatorId) {
    return null;
  }
  return findOneByField("translators", "translatorId", translatorId);
}

export async function addTranslator(payload) {
  const insertedId = String(payload?._id || generateObjectIdLike());
  await setDoc(
    doc(db, "translators", insertedId),
    sanitizeForFirestore(
      normalizeDocument({
        ...payload,
        _id: insertedId,
      }),
    ),
  );
  invalidateCollection("translators");
  return { insertedId };
}

export async function editTranslator(translatorId, payload) {
  const existingRef = await findRefByField("translators", "translatorId", translatorId);
  if (existingRef) {
    await updateDoc(existingRef, sanitizeForFirestore({ ...payload, translatorId }));
    invalidateCollection("translators");
    return { modifiedCount: 1 };
  }

  const insertedId = generateObjectIdLike();
  await setDoc(
    doc(db, "translators", insertedId),
    sanitizeForFirestore(
      normalizeDocument({
        ...payload,
        translatorId,
        _id: insertedId,
      }),
    ),
  );
  invalidateCollection("translators");
  return { upsertedId: insertedId };
}

export async function deleteTranslator(id) {
  return removeByDocumentId("translators", id);
}

export async function getPublishers() {
  return readCollection("publishers");
}

export async function getPublisherById(id) {
  if (!id) {
    return null;
  }
  const publishers = await readCollection("publishers");
  return publishers.find((item) => item.publisherId === id || item._id === id) || null;
}

export async function getPublisherByQueryEntries(queryEntries = []) {
  const filters = {};
  queryEntries.forEach((entry) => {
    const [field, value] = String(entry || "").split(":");
    if (field) {
      filters[field] = value;
    }
  });

  const publishers = await readCollection("publishers");
  return publishers.filter((item) =>
    Object.entries(filters).every(([field, value]) => String(item[field]) === String(value)),
  );
}

export async function addPublisher(payload) {
  const insertedId = String(payload?._id || generateObjectIdLike());
  await setDoc(
    doc(db, "publishers", insertedId),
    sanitizeForFirestore(
      normalizeDocument({
        ...payload,
        _id: insertedId,
      }),
    ),
  );
  invalidateCollection("publishers");
  return { insertedId };
}

export async function editPublisher(id, payload) {
  return upsertByDocumentId("publishers", id, payload);
}

export async function deletePublisher(id) {
  return removeByDocumentId("publishers", id);
}

export async function getCategories() {
  return readCollection("categories");
}

export async function getCategoryById(categoryId) {
  if (!categoryId) {
    return null;
  }
  const categories = await readCollection("categories");
  return categories.find((item) => item.categoryId === categoryId || item._id === categoryId) || null;
}

export async function getCategoriesByQuery(queryInput = {}) {
  const categories = await readCollection("categories");
  return categories.filter((item) =>
    Object.entries(queryInput).every(([field, value]) => String(item[field]) === String(value)),
  );
}

export async function addCategory(payload) {
  const insertedId = String(payload?._id || generateObjectIdLike());
  await setDoc(
    doc(db, "categories", insertedId),
    sanitizeForFirestore(
      normalizeDocument({
        ...payload,
        _id: insertedId,
      }),
    ),
  );
  invalidateCollection("categories");
  return { insertedId };
}

export async function editCategory(categoryId, payload) {
  const existingRef = await findRefByField("categories", "categoryId", categoryId);
  if (existingRef) {
    await updateDoc(existingRef, sanitizeForFirestore({ ...payload, categoryId }));
    invalidateCollection("categories");
    return { modifiedCount: 1 };
  }

  const insertedId = generateObjectIdLike();
  await setDoc(
    doc(db, "categories", insertedId),
    sanitizeForFirestore(
      normalizeDocument({
        ...payload,
        categoryId,
        _id: insertedId,
      }),
    ),
  );
  invalidateCollection("categories");
  return { upsertedId: insertedId };
}

export async function deleteCategory(id) {
  return removeByDocumentId("categories", id);
}

export async function getSubCategories({ mainCategoryId } = {}) {
  const subcategories = await readCollection("subcategories");
  const categories = await readCollection("categories");

  const selected = mainCategoryId
    ? subcategories.filter((item) => item.mainCategory === mainCategoryId)
    : subcategories;

  return selected.map((subCategory) => ({
    ...subCategory,
    mainCategoryDetails: categories.filter((category) => category.categoryId === subCategory.mainCategory),
  }));
}

export async function getSubCategoryById(subCategoryId) {
  if (!subCategoryId) {
    return null;
  }
  const subcategories = await readCollection("subcategories");
  return (
    subcategories.find(
      (item) => item.subCategoryId === subCategoryId || item._id === subCategoryId,
    ) || null
  );
}

export async function getSubCategoriesByQuery(queryInput = {}) {
  const subcategories = await readCollection("subcategories");
  return subcategories.filter((item) =>
    Object.entries(queryInput).every(([field, value]) => String(item[field]) === String(value)),
  );
}

export async function addSubCategory(payload) {
  const insertedId = String(payload?._id || generateObjectIdLike());
  await setDoc(
    doc(db, "subcategories", insertedId),
    sanitizeForFirestore(
      normalizeDocument({
        ...payload,
        _id: insertedId,
      }),
    ),
  );
  invalidateCollection("subcategories");
  return { insertedId };
}

export async function editSubCategory(subCategoryId, payload) {
  const existingRef = await findRefByField("subcategories", "subCategoryId", subCategoryId);
  if (existingRef) {
    await updateDoc(existingRef, sanitizeForFirestore({ ...payload, subCategoryId }));
    invalidateCollection("subcategories");
    return { modifiedCount: 1 };
  }

  const insertedId = generateObjectIdLike();
  await setDoc(
    doc(db, "subcategories", insertedId),
    sanitizeForFirestore(
      normalizeDocument({
        ...payload,
        subCategoryId,
        _id: insertedId,
      }),
    ),
  );
  invalidateCollection("subcategories");
  return { upsertedId: insertedId };
}

export async function deleteSubCategory(id) {
  return removeByDocumentId("subcategories", id);
}

export async function getImportedCountries() {
  return readCollection("importedCountries");
}

export async function getImportedCountryById(id) {
  if (!id) {
    return null;
  }
  const importedCountries = await readCollection("importedCountries");
  return importedCountries.find((item) => item._id === id || item.countryId === id) || null;
}

export async function addImportedCountry(payload) {
  const insertedId = String(payload?._id || generateObjectIdLike());
  await setDoc(
    doc(db, "importedCountries", insertedId),
    sanitizeForFirestore(
      normalizeDocument({
        ...payload,
        _id: insertedId,
      }),
    ),
  );
  invalidateCollection("importedCountries");
  return { insertedId };
}

export async function editImportedCountry(id, payload) {
  return upsertByDocumentId("importedCountries", id, payload);
}

export async function deleteImportedCountry(id) {
  return removeByDocumentId("importedCountries", id);
}

export async function getOrders(email) {
  if (!email) {
    return readCollection("carts");
  }

  const firestoreQuery = query(collection(db, "carts"), where("mail", "==", email));
  const snapshot = await getDocs(firestoreQuery);
  return snapshot.docs.map((snapshotDoc) =>
    normalizeDocument({
      _id: snapshotDoc.id,
      ...snapshotDoc.data(),
    }),
  );
}

export async function addOrder(payload) {
  const insertedId = generateObjectIdLike();
  await setDoc(
    doc(db, "carts", insertedId),
    sanitizeForFirestore(
      normalizeDocument({
        ...payload,
        _id: insertedId,
        timestamp: new Date().toISOString(),
      }),
    ),
  );
  invalidateCollection("carts");
  return { insertedId };
}

export async function editOrderStatus(orderId, editedStatus) {
  const normalizedId = String(orderId || "").trim();
  if (!normalizedId) {
    return { modifiedCount: 0 };
  }

  try {
    await updateDoc(doc(db, "carts", normalizedId), { status: editedStatus });
    invalidateCollection("carts");
    return { modifiedCount: 1 };
  } catch (_error) {
    return { modifiedCount: 0 };
  }
}

export async function deleteOrder(id) {
  return removeByDocumentId("carts", id);
}

export async function getUsers() {
  return readCollection("users");
}

export async function getUserByEmail(email) {
  if (!email) {
    return null;
  }
  return findOneByField("users", "email", String(email));
}

export async function createUser(payload) {
  const email = String(payload?.email || "");
  if (!email) {
    return "User Already Exist";
  }

  const existUser = await getUserByEmail(email);
  if (existUser) {
    return "User Already Exist";
  }

  const insertedId = String(payload?._id || generateObjectIdLike());
  await setDoc(
    doc(db, "users", insertedId),
    sanitizeForFirestore(
      normalizeDocument({
        ...payload,
        _id: insertedId,
      }),
    ),
  );
  invalidateCollection("users");
  return { insertedId };
}

export async function updateUser(id, payload) {
  return upsertByDocumentId("users", id, payload);
}

export function getText(value, language = 1) {
  return getNameByLanguage(value, language);
}

export function getBookWriterName(book, language = 1) {
  const writer = asArray(book?.writerDetails)[0];
  return getNameByLanguage(writer?.name, language) || "";
}

export function getBookCategoryName(book, language = 1) {
  const category = asArray(book?.categoryDetails)[0];
  return getNameByLanguage(category?.name, language) || "Category";
}

export function resetCatalogState() {
  cache.clear();
}

export async function getCollectionCounts() {
  const [books, writers, publishers, categories, orders, users] = await Promise.all([
    getBooksLength(),
    readCollection("writers"),
    readCollection("publishers"),
    readCollection("categories"),
    readCollection("carts"),
    readCollection("users"),
  ]);

  return {
    books,
    writers: writers.length,
    publishers: publishers.length,
    categories: categories.length,
    orders: orders.length,
    users: users.length,
  };
}
