import BookCard from "@/components/BookCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { useAllBooks, usePublishers } from "@/hooks/use-catalog";
import { formatPrice, getBookAuthor, getDisplayText } from "@/lib/catalog-ui";
import { ArrowLeft, Building2 } from "lucide-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const PublisherDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { data: publishers = [], isLoading: publishersLoading } = usePublishers();
  const { data: books = [], isLoading: booksLoading } = useAllBooks();

  const publisher = useMemo(
    () => publishers.find((item) => item.publisherId === id || item._id === id),
    [publishers, id],
  );

  const publisherKey = publisher?.publisherId || publisher?._id || id;
  const publisherBooks = useMemo(
    () => books.filter((book) => book.publisher === publisherKey),
    [books, publisherKey],
  );

  const isLoading = publishersLoading || booksLoading;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-10">
        <Link to="/publishers" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to publishers
        </Link>

        {isLoading ? (
          <div className="py-24 text-center text-muted-foreground">Loading publisher details...</div>
        ) : !publisher ? (
          <Card className="py-20 text-center">
            <h1 className="text-2xl font-bold text-foreground">Publisher not found</h1>
            <Link to="/publishers" className="mt-4 inline-block text-primary hover:underline">
              Browse all publishers
            </Link>
          </Card>
        ) : (
          <>
            <Card className="mb-10 overflow-hidden">
              <div className="grid gap-6 p-6 md:grid-cols-[220px_1fr] md:items-center">
                <div className="h-48 w-full overflow-hidden rounded-xl bg-muted">
                  {publisher.image ? (
                    <img
                      src={publisher.image}
                      alt={getDisplayText(publisher.name)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      <Building2 className="h-14 w-14" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{getDisplayText(publisher.name)}</h1>
                  <p className="mt-3 text-muted-foreground">
                    {publisherBooks.length} books available from this publisher.
                  </p>
                  <Link to={`/books?publisher=${publisher.publisherId || publisher._id}`} className="mt-5 inline-block">
                    <Button variant="outline">Open in filtered books view</Button>
                  </Link>
                </div>
              </div>
            </Card>

            {publisherBooks.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {publisherBooks.map((book) => (
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
              <Card className="py-20 text-center text-muted-foreground">
                No books were found for this publisher.
              </Card>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PublisherDetailsPage;
