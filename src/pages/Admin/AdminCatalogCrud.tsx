import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  useAllBooks,
  useCategories,
  useEditors,
  useImportedCountries,
  usePublishers,
  useSubCategories,
  useTranslators,
  useWriters,
} from "@/hooks/use-catalog";
import {
  addBook,
  addCategory,
  addEditor,
  addImportedCountry,
  addPublisher,
  addSubCategory,
  addTranslator,
  addWriter,
  deleteBook,
  deleteCategory,
  deleteEditor,
  deleteImportedCountry,
  deletePublisher,
  deleteSubCategory,
  deleteTranslator,
  deleteWriter,
  editBook,
  editCategory,
  editEditor,
  editImportedCountry,
  editPublisher,
  editSubCategory,
  editTranslator,
  editWriter,
} from "@/lib/catalog-service";
import { formatPrice, getBookAuthor, getDisplayText } from "@/lib/catalog-ui";
import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useMemo, useState } from "react";

const controlClassName = "h-10 w-full rounded-md border border-input bg-background px-3 text-sm";

const getArrayText = (value: unknown, index: number) =>
  Array.isArray(value) ? String(value[index] || "") : String(value || "");

const toLanguageArray = (bn: string, en: string, ar: string) => [bn || en, en || bn, ar || en || bn];

const parseIdList = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

type SimpleFormState = {
  idValue: string;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  descBn: string;
  descEn: string;
  descAr: string;
  image: string;
  mainCategory: string;
};

const emptySimpleForm: SimpleFormState = {
  idValue: "",
  nameBn: "",
  nameEn: "",
  nameAr: "",
  descBn: "",
  descEn: "",
  descAr: "",
  image: "",
  mainCategory: "",
};

type EntityCrudSectionProps = {
  title: string;
  idLabel: string;
  items: any[];
  idKey: string;
  nameKey?: string;
  descriptionEnabled?: boolean;
  imageEnabled?: boolean;
  mainCategoryEnabled?: boolean;
  categories?: any[];
  onCreate: (payload: any) => Promise<any>;
  onUpdate: (item: any, payload: any) => Promise<any>;
  onDelete: (item: any) => Promise<any>;
  onRefetch: () => Promise<void>;
};

const EntityCrudSection = ({
  title,
  idLabel,
  items,
  idKey,
  nameKey = "name",
  descriptionEnabled = false,
  imageEnabled = false,
  mainCategoryEnabled = false,
  categories = [],
  onCreate,
  onUpdate,
  onDelete,
  onRefetch,
}: EntityCrudSectionProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState<SimpleFormState>(emptySimpleForm);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => getDisplayText(a?.[nameKey]).localeCompare(getDisplayText(b?.[nameKey]))),
    [items, nameKey],
  );

  const reset = () => {
    setEditing(null);
    setForm(emptySimpleForm);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.idValue.trim()) {
      toast({
        title: `${idLabel} is required`,
        description: `Please enter a valid ${idLabel.toLowerCase()}.`,
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    const payload: any = {
      [idKey]: form.idValue.trim(),
      [nameKey]: toLanguageArray(form.nameBn.trim(), form.nameEn.trim(), form.nameAr.trim()),
    };

    if (descriptionEnabled) {
      payload.desc = toLanguageArray(form.descBn.trim(), form.descEn.trim(), form.descAr.trim());
    }
    if (imageEnabled) {
      payload.image = form.image.trim();
    }
    if (mainCategoryEnabled) {
      payload.mainCategory = form.mainCategory.trim();
    }

    try {
      if (editing) {
        await onUpdate(editing, payload);
        toast({
          title: `${title} updated`,
          description: `${getDisplayText(payload[nameKey])} has been updated.`,
        });
      } else {
        await onCreate(payload);
        toast({
          title: `${title} created`,
          description: `${getDisplayText(payload[nameKey])} has been added.`,
        });
      }
      await onRefetch();
      reset();
    } catch (error) {
      toast({
        title: `Unable to save ${title.toLowerCase()}`,
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (item: any) => {
    setEditing(item);
    setForm({
      idValue: String(item?.[idKey] || ""),
      nameBn: getArrayText(item?.[nameKey], 0),
      nameEn: getArrayText(item?.[nameKey], 1),
      nameAr: getArrayText(item?.[nameKey], 2),
      descBn: getArrayText(item?.desc, 0),
      descEn: getArrayText(item?.desc, 1),
      descAr: getArrayText(item?.desc, 2),
      image: String(item?.image || ""),
      mainCategory: String(item?.mainCategory || ""),
    });
  };

  const remove = async (item: any) => {
    const confirmed = window.confirm(`Delete ${getDisplayText(item?.[nameKey])}?`);
    if (!confirmed) {
      return;
    }

    try {
      await onDelete(item);
      await onRefetch();
      toast({
        title: `${title} deleted`,
        description: `${getDisplayText(item?.[nameKey])} has been removed.`,
      });
      if (editing?._id === item?._id) {
        reset();
      }
    } catch (error) {
      toast({
        title: `Unable to delete ${title.toLowerCase()}`,
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">{editing ? `Edit ${title}` : `Add ${title}`}</h3>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
          <div className="space-y-2">
            <Label>{idLabel}</Label>
            <Input
              value={form.idValue}
              onChange={(event) => setForm((prev) => ({ ...prev, idValue: event.target.value }))}
              placeholder={idLabel}
            />
          </div>
          <div className="space-y-2">
            <Label>Name (English)</Label>
            <Input
              value={form.nameEn}
              onChange={(event) => setForm((prev) => ({ ...prev, nameEn: event.target.value }))}
              placeholder="Name in English"
            />
          </div>
          <div className="space-y-2">
            <Label>Name (Bangla)</Label>
            <Input
              value={form.nameBn}
              onChange={(event) => setForm((prev) => ({ ...prev, nameBn: event.target.value }))}
              placeholder="Name in Bangla"
            />
          </div>
          <div className="space-y-2">
            <Label>Name (Arabic)</Label>
            <Input
              value={form.nameAr}
              onChange={(event) => setForm((prev) => ({ ...prev, nameAr: event.target.value }))}
              placeholder="Name in Arabic"
            />
          </div>

          {descriptionEnabled ? (
            <>
              <div className="space-y-2 md:col-span-2">
                <Label>Description (English)</Label>
                <Textarea
                  value={form.descEn}
                  onChange={(event) => setForm((prev) => ({ ...prev, descEn: event.target.value }))}
                  placeholder="Description in English"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Description (Bangla)</Label>
                <Textarea
                  value={form.descBn}
                  onChange={(event) => setForm((prev) => ({ ...prev, descBn: event.target.value }))}
                  placeholder="Description in Bangla"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Description (Arabic)</Label>
                <Textarea
                  value={form.descAr}
                  onChange={(event) => setForm((prev) => ({ ...prev, descAr: event.target.value }))}
                  placeholder="Description in Arabic"
                />
              </div>
            </>
          ) : null}

          {imageEnabled ? (
            <div className="space-y-2 md:col-span-2">
              <Label>Image URL</Label>
              <Input
                value={form.image}
                onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
                placeholder="https://..."
              />
            </div>
          ) : null}

          {mainCategoryEnabled ? (
            <div className="space-y-2 md:col-span-2">
              <Label>Main Category</Label>
              <select
                className={controlClassName}
                value={form.mainCategory}
                onChange={(event) => setForm((prev) => ({ ...prev, mainCategory: event.target.value }))}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.categoryId || category._id}>
                    {getDisplayText(category.name)}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-2 md:col-span-2">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : editing ? `Update ${title}` : `Add ${title}`}
            </Button>
            {editing ? (
              <Button type="button" variant="outline" onClick={reset}>
                Cancel Edit
              </Button>
            ) : null}
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">{title} List</h3>
        <div className="space-y-3 max-h-[520px] overflow-y-auto">
          {sortedItems.map((item) => (
            <div key={item._id} className="rounded-lg border p-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium">{getDisplayText(item?.[nameKey])}</p>
                <p className="text-sm text-muted-foreground">
                  {idLabel}: {item?.[idKey]}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(item)}>
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => void remove(item)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {sortedItems.length === 0 ? <p className="text-sm text-muted-foreground">No data found.</p> : null}
        </div>
      </Card>
    </div>
  );
};

type BookFormState = {
  _id: string;
  thumb: string;
  titleBn: string;
  titleEn: string;
  titleAr: string;
  descBn: string;
  descEn: string;
  descAr: string;
  category: string;
  subCategory: string;
  writerIds: string;
  translatorIds: string;
  editorIds: string;
  publisher: string;
  importedCountry: string;
  price: string;
  pages: string;
  stock: string;
  sold: string;
  status: string;
  binding: string;
  paperType: string;
  publishedYear: string;
  volume: string;
  part: string;
};

const emptyBookForm: BookFormState = {
  _id: "",
  thumb: "",
  titleBn: "",
  titleEn: "",
  titleAr: "",
  descBn: "",
  descEn: "",
  descAr: "",
  category: "",
  subCategory: "",
  writerIds: "",
  translatorIds: "",
  editorIds: "",
  publisher: "",
  importedCountry: "",
  price: "0",
  pages: "0",
  stock: "0",
  sold: "0",
  status: "published",
  binding: "",
  paperType: "",
  publishedYear: "",
  volume: "",
  part: "",
};

const AdminCatalogCrud = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: books = [], isLoading: booksLoading } = useAllBooks();
  const { data: writers = [] } = useWriters();
  const { data: editors = [] } = useEditors();
  const { data: translators = [] } = useTranslators();
  const { data: publishers = [] } = usePublishers();
  const { data: categories = [] } = useCategories();
  const { data: subcategories = [] } = useSubCategories();
  const { data: importedCountries = [] } = useImportedCountries();

  const [bookForm, setBookForm] = useState<BookFormState>(emptyBookForm);
  const [editingBook, setEditingBook] = useState<any | null>(null);
  const [bookSaving, setBookSaving] = useState(false);

  const invalidateCatalog = async (keys: string[]) => {
    await Promise.all(keys.map((key) => queryClient.invalidateQueries({ queryKey: [key] })));
  };

  const refreshBooks = () => invalidateCatalog(["all-books", "books", "book", "book-length", "collection-counts"]);
  const refreshWriters = () => invalidateCatalog(["writers", "all-books", "books"]);
  const refreshEditors = () => invalidateCatalog(["editors", "all-books", "books"]);
  const refreshTranslators = () => invalidateCatalog(["translators", "all-books", "books"]);
  const refreshPublishers = () => invalidateCatalog(["publishers", "all-books", "books", "collection-counts"]);
  const refreshCategories = () => invalidateCatalog(["categories", "sub-categories", "all-books", "books", "collection-counts"]);
  const refreshSubCategories = () => invalidateCatalog(["sub-categories", "all-books", "books"]);
  const refreshImportedCountries = () => invalidateCatalog(["imported-country", "all-books", "books"]);

  const resetBookForm = () => {
    setEditingBook(null);
    setBookForm(emptyBookForm);
  };

  const startBookEdit = (book: any) => {
    setEditingBook(book);
    setBookForm({
      _id: String(book._id || ""),
      thumb: String(book.thumb || ""),
      titleBn: getArrayText(book.title, 0),
      titleEn: getArrayText(book.title, 1),
      titleAr: getArrayText(book.title, 2),
      descBn: getArrayText(book.desc, 0),
      descEn: getArrayText(book.desc, 1),
      descAr: getArrayText(book.desc, 2),
      category: String(book.category || ""),
      subCategory: String(book.subCategory || ""),
      writerIds: Array.isArray(book.writer) ? book.writer.join(", ") : "",
      translatorIds: Array.isArray(book.translator) ? book.translator.join(", ") : "",
      editorIds: Array.isArray(book.editor) ? book.editor.join(", ") : "",
      publisher: String(book.publisher || ""),
      importedCountry: String(book.importedCountry || ""),
      price: String(book.price ?? "0"),
      pages: String(book.pages ?? "0"),
      stock: String(book.stock ?? "0"),
      sold: String(book.sold ?? "0"),
      status: String(book.status || "published"),
      binding: String(book.binding || ""),
      paperType: String(book.paperType || ""),
      publishedYear: String(book.publishedYear || ""),
      volume: String(book.volume || ""),
      part: String(book.part || ""),
    });
  };

  const submitBook = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!bookForm.titleEn.trim()) {
      toast({
        title: "Book title is required",
        description: "Please enter at least the English title.",
        variant: "destructive",
      });
      return;
    }
    if (!bookForm.category) {
      toast({
        title: "Category is required",
        description: "Please select a category for the book.",
        variant: "destructive",
      });
      return;
    }

    setBookSaving(true);
    const payload = {
      thumb: bookForm.thumb.trim(),
      title: toLanguageArray(bookForm.titleBn.trim(), bookForm.titleEn.trim(), bookForm.titleAr.trim()),
      desc: toLanguageArray(bookForm.descBn.trim(), bookForm.descEn.trim(), bookForm.descAr.trim()),
      category: bookForm.category,
      subCategory: bookForm.subCategory,
      writer: parseIdList(bookForm.writerIds),
      translator: parseIdList(bookForm.translatorIds),
      editor: parseIdList(bookForm.editorIds),
      publisher: bookForm.publisher,
      importedCountry: bookForm.importedCountry,
      price: Number(bookForm.price) || 0,
      pages: Number(bookForm.pages) || 0,
      stock: Number(bookForm.stock) || 0,
      sold: Number(bookForm.sold) || 0,
      status: bookForm.status || "published",
      binding: bookForm.binding.trim(),
      paperType: bookForm.paperType.trim(),
      publishedYear: bookForm.publishedYear.trim(),
      volume: bookForm.volume.trim(),
      part: bookForm.part.trim(),
      showCategory: true,
      showSubCategory: true,
      showWriters: true,
      showEditors: true,
      showTranslators: true,
      showImport: true,
      showPublisher: true,
      showPages: true,
      showPrice: true,
      showPieces: true,
      showStatus: true,
      showSummary: true,
      showPapertype: true,
      showBinding: true,
      showPublishYear: true,
      showVolume: true,
      showPart: true,
    };

    try {
      if (editingBook) {
        await editBook(editingBook._id, payload);
        toast({
          title: "Book updated",
          description: `${getDisplayText(payload.title)} has been updated.`,
        });
      } else {
        await addBook(payload);
        toast({
          title: "Book added",
          description: `${getDisplayText(payload.title)} has been created.`,
        });
      }
      await refreshBooks();
      resetBookForm();
    } catch (error) {
      toast({
        title: "Unable to save book",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setBookSaving(false);
    }
  };

  const removeBook = async (book: any) => {
    const confirmed = window.confirm(`Delete ${getDisplayText(book.title)}?`);
    if (!confirmed) {
      return;
    }
    try {
      await deleteBook(book._id);
      await refreshBooks();
      toast({
        title: "Book deleted",
        description: `${getDisplayText(book.title)} has been removed.`,
      });
      if (editingBook?._id === book._id) {
        resetBookForm();
      }
    } catch (error) {
      toast({
        title: "Unable to delete book",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredSubCategories = useMemo(() => {
    if (!bookForm.category) {
      return subcategories;
    }
    return subcategories.filter((item) => item.mainCategory === bookForm.category);
  }, [bookForm.category, subcategories]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-foreground mb-2">Admin Catalog CRUD</h1>
        <p className="text-muted-foreground mb-8">
          Manage books and all related entities from here. Every action writes directly to Firebase Firestore.
        </p>

        <Tabs defaultValue="books" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-2">
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="writers">Writers</TabsTrigger>
            <TabsTrigger value="editors">Editors</TabsTrigger>
            <TabsTrigger value="translators">Translators</TabsTrigger>
            <TabsTrigger value="publishers">Publishers</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="subcategories">Subcategories</TabsTrigger>
            <TabsTrigger value="countries">Imported Countries</TabsTrigger>
          </TabsList>

          <TabsContent value="books" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">{editingBook ? "Edit Book" : "Add Book"}</h3>
              <form className="grid gap-4 md:grid-cols-2" onSubmit={submitBook}>
                <div className="space-y-2 md:col-span-2">
                  <Label>Thumbnail URL</Label>
                  <Input
                    value={bookForm.thumb}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, thumb: event.target.value }))}
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Title (English)</Label>
                  <Input
                    value={bookForm.titleEn}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, titleEn: event.target.value }))}
                    placeholder="Book title in English"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title (Bangla)</Label>
                  <Input
                    value={bookForm.titleBn}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, titleBn: event.target.value }))}
                    placeholder="Book title in Bangla"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Title (Arabic)</Label>
                  <Input
                    value={bookForm.titleAr}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, titleAr: event.target.value }))}
                    placeholder="Book title in Arabic"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label>Description (English)</Label>
                  <Textarea
                    value={bookForm.descEn}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, descEn: event.target.value }))}
                    placeholder="Description in English"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Description (Bangla)</Label>
                  <Textarea
                    value={bookForm.descBn}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, descBn: event.target.value }))}
                    placeholder="Description in Bangla"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Description (Arabic)</Label>
                  <Textarea
                    value={bookForm.descAr}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, descAr: event.target.value }))}
                    placeholder="Description in Arabic"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <select
                    className={controlClassName}
                    value={bookForm.category}
                    onChange={(event) =>
                      setBookForm((prev) => ({
                        ...prev,
                        category: event.target.value,
                        subCategory: "",
                      }))
                    }
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.categoryId || category._id}>
                        {getDisplayText(category.name)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Subcategory</Label>
                  <select
                    className={controlClassName}
                    value={bookForm.subCategory}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, subCategory: event.target.value }))}
                  >
                    <option value="">Select subcategory</option>
                    {filteredSubCategories.map((subCategory) => (
                      <option key={subCategory._id} value={subCategory.subCategoryId || subCategory._id}>
                        {getDisplayText(subCategory.name)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Writers (comma-separated writerId)</Label>
                  <Input
                    value={bookForm.writerIds}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, writerIds: event.target.value }))}
                    placeholder={writers.slice(0, 3).map((item) => item.writerId).join(", ")}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Translators (comma-separated translatorId)</Label>
                  <Input
                    value={bookForm.translatorIds}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, translatorIds: event.target.value }))}
                    placeholder={translators.slice(0, 3).map((item) => item.translatorId).join(", ")}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Editors (comma-separated editorId)</Label>
                  <Input
                    value={bookForm.editorIds}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, editorIds: event.target.value }))}
                    placeholder={editors.slice(0, 3).map((item) => item.editorId).join(", ")}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Publisher</Label>
                  <select
                    className={controlClassName}
                    value={bookForm.publisher}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, publisher: event.target.value }))}
                  >
                    <option value="">Select publisher</option>
                    {publishers.map((publisher) => (
                      <option key={publisher._id} value={publisher.publisherId || publisher._id}>
                        {getDisplayText(publisher.name)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Imported Country</Label>
                  <select
                    className={controlClassName}
                    value={bookForm.importedCountry}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, importedCountry: event.target.value }))}
                  >
                    <option value="">Select imported country</option>
                    {importedCountries.map((country) => (
                      <option key={country._id} value={country.countryId || country._id}>
                        {getDisplayText(country.name)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={bookForm.price}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, price: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Pages</Label>
                  <Input
                    type="number"
                    value={bookForm.pages}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, pages: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    value={bookForm.stock}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, stock: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sold</Label>
                  <Input
                    type="number"
                    value={bookForm.sold}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, sold: event.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <select
                    className={controlClassName}
                    value={bookForm.status}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, status: event.target.value }))}
                  >
                    <option value="published">published</option>
                    <option value="upcoming">upcoming</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Binding</Label>
                  <Input
                    value={bookForm.binding}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, binding: event.target.value }))}
                    placeholder="hardcover / paperback"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Paper Type</Label>
                  <Input
                    value={bookForm.paperType}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, paperType: event.target.value }))}
                    placeholder="white / offset"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Published Year</Label>
                  <Input
                    value={bookForm.publishedYear}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, publishedYear: event.target.value }))}
                    placeholder="2026"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Volume</Label>
                  <Input
                    value={bookForm.volume}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, volume: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Part</Label>
                  <Input
                    value={bookForm.part}
                    onChange={(event) => setBookForm((prev) => ({ ...prev, part: event.target.value }))}
                  />
                </div>

                <div className="md:col-span-2 flex items-center gap-2">
                  <Button type="submit" disabled={bookSaving}>
                    {bookSaving ? "Saving..." : editingBook ? "Update Book" : "Add Book"}
                  </Button>
                  {editingBook ? (
                    <Button type="button" variant="outline" onClick={resetBookForm}>
                      Cancel Edit
                    </Button>
                  ) : null}
                </div>
              </form>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Books List</h3>
              {booksLoading ? (
                <p className="text-muted-foreground">Loading books...</p>
              ) : (
                <div className="space-y-3 max-h-[520px] overflow-y-auto">
                  {books.map((book) => (
                    <div
                      key={book._id}
                      className="rounded-lg border p-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
                    >
                      <div>
                        <p className="font-medium">{getDisplayText(book.title)}</p>
                        <p className="text-sm text-muted-foreground">{getBookAuthor(book)}</p>
                        <p className="text-sm text-muted-foreground">{formatPrice(book.price)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => startBookEdit(book)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => void removeBook(book)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="writers">
            <EntityCrudSection
              title="Writer"
              idLabel="Writer ID"
              items={writers}
              idKey="writerId"
              descriptionEnabled
              imageEnabled
              onCreate={(payload) => addWriter(payload)}
              onUpdate={(item, payload) => editWriter(item.writerId, payload)}
              onDelete={(item) => deleteWriter(item._id)}
              onRefetch={refreshWriters}
            />
          </TabsContent>

          <TabsContent value="editors">
            <EntityCrudSection
              title="Editor"
              idLabel="Editor ID"
              items={editors}
              idKey="editorId"
              onCreate={(payload) => addEditor(payload)}
              onUpdate={(item, payload) => editEditor(item.editorId, payload)}
              onDelete={(item) => deleteEditor(item._id)}
              onRefetch={refreshEditors}
            />
          </TabsContent>

          <TabsContent value="translators">
            <EntityCrudSection
              title="Translator"
              idLabel="Translator ID"
              items={translators}
              idKey="translatorId"
              onCreate={(payload) => addTranslator(payload)}
              onUpdate={(item, payload) => editTranslator(item.translatorId, payload)}
              onDelete={(item) => deleteTranslator(item._id)}
              onRefetch={refreshTranslators}
            />
          </TabsContent>

          <TabsContent value="publishers">
            <EntityCrudSection
              title="Publisher"
              idLabel="Publisher ID"
              items={publishers}
              idKey="publisherId"
              imageEnabled
              onCreate={(payload) => addPublisher(payload)}
              onUpdate={(item, payload) => editPublisher(item._id, payload)}
              onDelete={(item) => deletePublisher(item._id)}
              onRefetch={refreshPublishers}
            />
          </TabsContent>

          <TabsContent value="categories">
            <EntityCrudSection
              title="Category"
              idLabel="Category ID"
              items={categories}
              idKey="categoryId"
              onCreate={(payload) => addCategory(payload)}
              onUpdate={(item, payload) => editCategory(item.categoryId, payload)}
              onDelete={(item) => deleteCategory(item._id)}
              onRefetch={refreshCategories}
            />
          </TabsContent>

          <TabsContent value="subcategories">
            <EntityCrudSection
              title="Subcategory"
              idLabel="Subcategory ID"
              items={subcategories}
              idKey="subCategoryId"
              mainCategoryEnabled
              categories={categories}
              onCreate={(payload) => addSubCategory(payload)}
              onUpdate={(item, payload) => editSubCategory(item.subCategoryId, payload)}
              onDelete={(item) => deleteSubCategory(item._id)}
              onRefetch={refreshSubCategories}
            />
          </TabsContent>

          <TabsContent value="countries">
            <EntityCrudSection
              title="Imported Country"
              idLabel="Country ID"
              items={importedCountries}
              idKey="countryId"
              onCreate={(payload) => addImportedCountry(payload)}
              onUpdate={(item, payload) => editImportedCountry(item._id, payload)}
              onDelete={(item) => deleteImportedCountry(item._id)}
              onRefetch={refreshImportedCountries}
            />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminCatalogCrud;
