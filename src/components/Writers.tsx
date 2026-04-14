import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { PenTool } from "lucide-react";
import { useAllBooks, useWriters } from "@/hooks/use-catalog";
import { getDisplayText } from "@/lib/catalog-ui";

const Writers = () => {
  const { data: writers = [], isLoading } = useWriters();
  const { data: books = [] } = useAllBooks();

  const countBooks = (writerId: string) =>
    books.filter((book) => Array.isArray(book.writer) && book.writer.includes(writerId)).length;

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <PenTool className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">Renowned Authors</h2>
          </div>
          <p className="text-muted-foreground">Scholars and writers who shaped Islamic literature</p>
        </div>
        {isLoading ? (
          <div className="py-16 text-center text-muted-foreground">Loading writers...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {writers.slice(0, 12).map((writer) => (
              <Link to={`/writer/${writer.writerId}`} key={writer._id}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer text-center h-full">
                  <div className="w-full aspect-square overflow-hidden bg-muted">
                    {writer.image ? (
                      <img
                        src={writer.image}
                        alt={getDisplayText(writer.name)}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    ) : null}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-1 text-foreground">{getDisplayText(writer.name)}</h3>
                    <p className="text-xs text-muted-foreground mb-1 line-clamp-2">{getDisplayText(writer.desc)}</p>
                    <p className="text-xs text-primary font-medium">{countBooks(writer.writerId)} Books</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Writers;
