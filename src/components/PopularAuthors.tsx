import { Card } from "@/components/ui/card";
import { Star, Award } from "lucide-react";
import { useAllBooks, useWriters } from "@/hooks/use-catalog";
import { getDisplayText } from "@/lib/catalog-ui";
import { useMemo } from "react";

const PopularAuthors = () => {
  const { data: writers = [] } = useWriters();
  const { data: books = [] } = useAllBooks();

  const popularWriters = useMemo(() => {
    return writers
      .map((writer) => {
        const writerBooks = books.filter((book) => Array.isArray(book.writer) && book.writer.includes(writer.writerId));
        const readers = writerBooks.reduce((sum, book) => sum + Number(book.sold || 0), 0);
        const rating = Math.min(5, 4 + writerBooks.length / 100);
        return {
          ...writer,
          booksCount: writerBooks.length,
          readers,
          rating: Number(rating.toFixed(1)),
        };
      })
      .sort((a, b) => b.readers - a.readers)
      .slice(0, 4);
  }, [books, writers]);

  return (
    <section className="py-16 bg-background relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Award className="h-8 w-8 text-gold" />
            <h2 className="text-4xl font-bold text-foreground">Weekly Popular Authors</h2>
          </div>
          <p className="text-muted-foreground">Most read authors this week</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularWriters.map((author) => (
            <Card
              key={author._id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
            >
              <div className="h-64 overflow-hidden relative">
                {author.image ? (
                  <img
                    src={author.image}
                    alt={getDisplayText(author.name)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : null}
                <div className="absolute top-3 right-3 bg-gold text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  {author.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 text-foreground">{getDisplayText(author.name)}</h3>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{getDisplayText(author.desc)}</p>
                <p className="text-sm text-primary font-medium">
                  {author.readers.toLocaleString()} Readers | {author.booksCount} Books
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularAuthors;
