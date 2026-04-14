import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/context/CartContext";
import { useAllBooks } from "@/hooks/use-catalog";
import { formatPrice, getBookAuthor, getDisplayText } from "@/lib/catalog-ui";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const Books = () => {
  const { addToCart } = useCart();
  const { data: books = [], isLoading } = useAllBooks();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "asc");

  const page = Number(searchParams.get("page") || "1");
  const minPrice = Number(searchParams.get("min") || "0");
  const maxPrice = Number(searchParams.get("max") || "50000");
  const category = searchParams.get("category") || "";
  const publisher = searchParams.get("publisher") || "";
  const writer = searchParams.get("writer") || "";

  const filtered = useMemo(() => {
    return books
      .filter((book) => {
        const title = getDisplayText(book.title, 1).toLowerCase();
        const query = (searchParams.get("q") || "").toLowerCase();
        return !query || title.includes(query);
      })
      .filter((book) => Number(book.price) >= minPrice && Number(book.price) <= maxPrice)
      .filter((book) => !category || book.category === category)
      .filter((book) => !publisher || book.publisher === publisher)
      .filter((book) => !writer || (Array.isArray(book.writer) && book.writer.includes(writer)))
      .sort((a, b) => (sort === "asc" ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price)));
  }, [books, category, maxPrice, minPrice, publisher, searchParams, sort, writer]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const updateParam = (name: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(name, value);
    } else {
      next.delete(name);
    }
    if (name !== "page") {
      next.set("page", "1");
    }
    setSearchParams(next);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-10">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">All Books</h1>
            <p className="mt-2 text-muted-foreground">
              Browse books from your imported collections with original filtering logic.
            </p>
          </div>

          <form
            className="flex w-full max-w-xl items-center gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              updateParam("q", searchInput.trim());
            }}
          >
            <Input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search book title"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
        </div>

        <div className="mb-8 grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Price Sort</Label>
            <Select
              value={sort}
              onValueChange={(value) => {
                setSort(value);
                updateParam("sort", value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Low to High</SelectItem>
                <SelectItem value="desc">High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Min Price</Label>
            <Input
              type="number"
              defaultValue={String(minPrice)}
              onBlur={(event) => updateParam("min", event.target.value || "0")}
            />
          </div>

          <div className="space-y-2">
            <Label>Max Price</Label>
            <Input
              type="number"
              defaultValue={String(maxPrice)}
              onBlur={(event) => updateParam("max", event.target.value || "50000")}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="py-24 text-center text-muted-foreground">Loading books...</div>
        ) : (
          <>
            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {paginated.map((book) => (
                  <BookCard
                    key={book._id}
                    id={book._id}
                    title={getDisplayText(book.title)}
                    author={getBookAuthor(book)}
                    image={book.thumb}
                    price={formatPrice(book.price)}
                    onAddToCart={() =>
                      addToCart({
                        _id: book._id,
                        title: book.title,
                        thumb: book.thumb,
                        price: Number(book.price),
                        status: book.status,
                        stock: Number(book.stock),
                      })
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                No books found for your filters.
              </div>
            )}
          </>
        )}

        {totalPages > 1 ? (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((current) => (
              <Button
                key={current}
                variant={current === safePage ? "default" : "outline"}
                size="sm"
                onClick={() => updateParam("page", String(current))}
              >
                {current}
              </Button>
            ))}
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default Books;
