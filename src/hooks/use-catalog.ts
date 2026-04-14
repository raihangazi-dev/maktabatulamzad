import { useQuery } from "@tanstack/react-query";

import {
  getAllBooks,
  getBookById,
  getBooks,
  getBooksLength,
  getCategories,
  getEditors,
  getImportedCountries,
  getCollectionCounts,
  getOrders,
  getPublishers,
  getSubCategories,
  getTranslators,
  getUsers,
  getUserByEmail,
  getWriterById,
  getWriters,
} from "@/lib/catalog-service";

type BooksQuery = {
  title?: string;
  sort?: number;
  gte?: number;
  lte?: number;
  page?: number;
  size?: number;
  category?: string;
  subCategory?: string;
  publisher?: string;
  writer?: string;
};

export function useBooks(params: BooksQuery = {}) {
  return useQuery({
    queryKey: ["books", params],
    queryFn: () => getBooks(params),
  });
}

export function useAllBooks() {
  return useQuery({
    queryKey: ["all-books"],
    queryFn: () => getAllBooks(),
  });
}

export function useBook(id: string | undefined) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(String(id)),
    enabled: Boolean(id),
  });
}

export function useBooksLength() {
  return useQuery({
    queryKey: ["book-length"],
    queryFn: () => getBooksLength(),
  });
}

export function useWriters() {
  return useQuery({
    queryKey: ["writers"],
    queryFn: () => getWriters(),
  });
}

export function useWriter(writerId: string | undefined) {
  return useQuery({
    queryKey: ["writer", writerId],
    queryFn: () => getWriterById(String(writerId)),
    enabled: Boolean(writerId),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
}

export function useSubCategories(mainCategoryId?: string) {
  return useQuery({
    queryKey: ["sub-categories", mainCategoryId],
    queryFn: () => getSubCategories({ mainCategoryId }),
  });
}

export function usePublishers() {
  return useQuery({
    queryKey: ["publishers"],
    queryFn: () => getPublishers(),
  });
}

export function useImportedCountries() {
  return useQuery({
    queryKey: ["imported-country"],
    queryFn: () => getImportedCountries(),
  });
}

export function useEditors() {
  return useQuery({
    queryKey: ["editors"],
    queryFn: () => getEditors(),
  });
}

export function useTranslators() {
  return useQuery({
    queryKey: ["translators"],
    queryFn: () => getTranslators(),
  });
}

export function useOrders(email?: string) {
  return useQuery({
    queryKey: ["orders", email],
    queryFn: () => getOrders(email),
  });
}

export function useUserDetails(email?: string) {
  return useQuery({
    queryKey: ["user-details", email],
    queryFn: () => getUserByEmail(email),
    enabled: Boolean(email),
  });
}

export function useCollectionCounts() {
  return useQuery({
    queryKey: ["collection-counts"],
    queryFn: () => getCollectionCounts(),
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
}
