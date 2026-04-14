import BookCard from "./BookCard";
import { useAllBooks } from "@/hooks/use-catalog";
import { useCart } from "@/context/CartContext";
import { formatPrice, getBookAuthor, getDisplayText } from "@/lib/catalog-ui";
import { useMemo } from "react";

const RecentlySold = () => {
  const { addToCart } = useCart();
  const { data: books = [], isLoading } = useAllBooks();

  const recentlySold = useMemo(() => {
    return [...books]
      .sort((a, b) => Number(b.sold || 0) - Number(a.sold || 0))
      .slice(0, 4);
  }, [books]);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-3">Recently Sold</h2>
          <p className="text-muted-foreground">Books that have found their way to new readers</p>
        </div>
        {isLoading ? (
          <div className="py-16 text-center text-muted-foreground">Loading sold books...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlySold.map((book) => (
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
        )}
      </div>
    </section>
  );
};

export default RecentlySold;
