import BookCard from "@/components/BookCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { useAllBooks, useBook } from "@/hooks/use-catalog";
import { formatPrice, getBookAuthor, getDisplayText } from "@/lib/catalog-ui";
import { BookOpen, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const { data: book, isLoading } = useBook(id);
  const { data: allBooks = [] } = useAllBooks();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const relatedBooks = useMemo(() => {
    if (!book) {
      return [];
    }

    return allBooks
      .filter((item) => item._id !== book._id)
      .filter((item) => item.category === book.category)
      .slice(0, 4);
  }, [allBooks, book]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Loading book details...</div>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Book not found</h1>
          <Link to="/books" className="mt-4 inline-block text-primary hover:underline">
            Back to all books
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isUpcoming = book.status === "upcoming";
  const isStockOut = Number(book.stock || 0) <= 0;

  const canAddToCart = !isUpcoming && !isStockOut && book.showStatus !== false;

  const handleAddToCart = () => {
    for (let index = 0; index < quantity; index += 1) {
      addToCart({
        _id: book._id,
        title: book.title,
        thumb: book.thumb,
        price: Number(book.price),
        status: book.status,
        stock: Number(book.stock),
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link to="/books" className="hover:text-primary">
            Books
          </Link>
          <span>/</span>
          <span className="line-clamp-1 text-foreground">{getDisplayText(book.title)}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
          <Card className="overflow-hidden">
            <div className="aspect-[3/4] bg-muted">
              <img src={book.thumb} alt={getDisplayText(book.title)} className="h-full w-full object-cover" />
            </div>
          </Card>

          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {book.showCategory ? <Badge variant="secondary">{getDisplayText(book.categoryDetails?.[0]?.name)}</Badge> : null}
              {book.status ? (
                <Badge variant={book.status === "published" ? "default" : "outline"}>{book.status}</Badge>
              ) : null}
            </div>

            <h1 className="text-3xl font-bold text-foreground">{getDisplayText(book.title)}</h1>

            {book.showWriters ? (
              <p className="mt-2 text-muted-foreground">
                by{" "}
                <Link className="text-primary hover:underline" to={`/writer/${book.writer?.[0] || ""}`}>
                  {getBookAuthor(book)}
                </Link>
              </p>
            ) : null}

            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1 text-gold">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current opacity-50" />
              </div>
              <span className="text-sm text-muted-foreground">{Number(book.sold || 0).toLocaleString()} sold</span>
            </div>

            {book.showPrice ? <p className="mt-6 text-4xl font-bold text-primary">{formatPrice(book.price)}</p> : null}

            <div className="mt-6 grid gap-3 rounded-xl bg-muted/50 p-4 sm:grid-cols-2">
              {book.showPublisher ? (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Publisher</p>
                  <p className="font-medium">{getDisplayText(book.publisherDetails?.[0]?.name)}</p>
                </div>
              ) : null}
              {book.showSubCategory ? (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Subcategory</p>
                  <p className="font-medium">{getDisplayText(book.subCategoryDetails?.[0]?.name)}</p>
                </div>
              ) : null}
              {book.showBinding ? (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Binding</p>
                  <p className="font-medium capitalize">{book.binding || "-"}</p>
                </div>
              ) : null}
              {book.showPages ? (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Pages</p>
                  <p className="font-medium">{book.pages || "-"}</p>
                </div>
              ) : null}
              {book.showPublishYear ? (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Published Year</p>
                  <p className="font-medium">{book.publishedYear || "-"}</p>
                </div>
              ) : null}
              {book.showPieces ? (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Stock</p>
                  <p className="font-medium">{book.stock || 0}</p>
                </div>
              ) : null}
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <div className="flex items-center rounded-lg border">
                <Button variant="ghost" size="icon" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity((prev) => prev + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button disabled={!canAddToCart} className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isUpcoming ? "Upcoming" : isStockOut ? "Stock Out" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="summary" className="mt-12">
          <TabsList>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="mt-6">
            <Card className="p-6">
              <h2 className="mb-3 text-2xl font-bold text-foreground">Book Summary</h2>
              <p className="leading-8 text-muted-foreground">{getDisplayText(book.desc)}</p>
            </Card>
          </TabsContent>
          <TabsContent value="details" className="mt-6">
            <Card className="p-6">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Metadata</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Category</p>
                  <p>{getDisplayText(book.categoryDetails?.[0]?.name)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Writer</p>
                  <p>{getBookAuthor(book)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Translator</p>
                  <p>{getDisplayText(book.translatorDetails?.[0]?.name) || "-"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Editor</p>
                  <p>{getDisplayText(book.editorDetails?.[0]?.name) || "-"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Imported Country</p>
                  <p>{getDisplayText(book.importedCountryDetails?.[0]?.name) || "-"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-muted-foreground">Paper Type</p>
                  <p className="capitalize">{book.paperType || "-"}</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-10" />

        <section>
          <div className="mb-6 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Related Books</h2>
          </div>
          {relatedBooks.length === 0 ? (
            <p className="text-muted-foreground">No related books found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedBooks.map((relatedBook) => (
                <BookCard
                  key={relatedBook._id}
                  id={relatedBook._id}
                  title={getDisplayText(relatedBook.title)}
                  author={getBookAuthor(relatedBook)}
                  image={relatedBook.thumb}
                  price={formatPrice(relatedBook.price)}
                  onAddToCart={() =>
                    addToCart({
                      _id: relatedBook._id,
                      title: relatedBook.title,
                      thumb: relatedBook.thumb,
                      price: Number(relatedBook.price),
                      status: relatedBook.status,
                      stock: Number(relatedBook.stock),
                    })
                  }
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BookDetails;
