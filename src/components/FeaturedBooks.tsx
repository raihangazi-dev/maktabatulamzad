import BookCard from "./BookCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useBooks } from "@/hooks/use-catalog";
import { useCart } from "@/context/CartContext";
import { formatPrice, getBookAuthor, getDisplayText } from "@/lib/catalog-ui";
import { Link } from "react-router-dom";

const FeaturedBooks = () => {
  const { addToCart } = useCart();
  const { data: books = [], isLoading } = useBooks({ page: 0, size: 6, sort: 1 });

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">Maktabatul Amzad</h2>
            <p className="text-muted-foreground">Authentic Islamic Literature Collection</p>
          </div>
          <Link to="/books">
            <Button variant="outline" className="hidden md:inline-flex">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-muted-foreground">Loading featured books...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {books.map((book) => (
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

        <div className="mt-8 text-center md:hidden">
          <Link to="/books">
            <Button variant="outline">
              View All Books
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
