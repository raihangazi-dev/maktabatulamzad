import { getText } from "@/lib/catalog-service";

export function formatPrice(price: number | string) {
  const numeric = Number(price);
  if (Number.isNaN(numeric)) {
    return String(price || "");
  }

  return `Tk ${numeric.toLocaleString()}`;
}

export function getDisplayText(value: unknown, language = 1) {
  return getText(value, language) || "";
}

export function getBookAuthor(book: any, language = 1) {
  const writer = Array.isArray(book?.writerDetails) ? book.writerDetails[0] : null;
  if (!writer) {
    return "";
  }

  return getDisplayText(writer.name, language);
}
