import BookCard from "./BookCard";
import { TrendingUp } from "lucide-react";
import { useAllBooks } from "@/hooks/use-catalog";
import { useCart } from "@/context/CartContext";
import { formatPrice, getBookAuthor, getDisplayText } from "@/lib/catalog-ui";
import { useMemo } from "react";

const BestSellers = () => {
  const { addToCart } = useCart();
  const { data: books = [], isLoading } = useAllBooks();

  const bestSellers = useMemo(() => {
    return [...books]
      .sort((a, b) => Number(b.sold || 0) - Number(a.sold || 0))
      .slice(0, 4);
  }, [books]);

  return (
    <section className="py-16 bg-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-primary rounded-full"></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">Best Sellers</h2>
          </div>
          <p className="text-muted-foreground">Most loved books by our community</p>
        </div>
        {isLoading ? (
          <div className="py-16 text-center text-muted-foreground">Loading best sellers...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((book) => (
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

export default BestSellers;
