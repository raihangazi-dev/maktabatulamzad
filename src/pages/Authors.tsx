import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAllBooks, useWriters } from "@/hooks/use-catalog";
import { getDisplayText } from "@/lib/catalog-ui";
import { ArrowLeft, BookOpen, PenTool, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Authors = () => {
  const { data: writers = [], isLoading } = useWriters();
  const { data: books = [] } = useAllBooks();

  const booksByWriter = (writerId: string) =>
    books.filter((book) => Array.isArray(book.writer) && book.writer.includes(writerId)).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <span className="text-primary-foreground/70">Back to Home</span>
          </div>
          <div className="flex items-center gap-3">
            <PenTool className="h-10 w-10 text-gold" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">Our Authors</h1>
          </div>
          <p className="text-primary-foreground/80 mt-4 max-w-2xl">
            Authors and scholars are loaded from your collection data with real book counts.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="py-20 text-center text-muted-foreground">Loading authors...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {writers.map((writer) => {
                const totalBooks = booksByWriter(writer.writerId);
                const score = Math.min(5, 4 + totalBooks / 100);

                return (
                  <Link to={`/writer/${writer.writerId}`} key={writer._id}>
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group h-full">
                      <div className="relative w-full aspect-square overflow-hidden bg-muted">
                        {writer.image ? (
                          <img
                            src={writer.image}
                            alt={getDisplayText(writer.name)}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : null}
                        <div className="absolute top-3 right-3 bg-gold text-dark px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" />
                          {score.toFixed(1)}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-1 text-foreground line-clamp-2">{getDisplayText(writer.name)}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{getDisplayText(writer.desc)}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <BookOpen className="h-4 w-4" />
                            <span className="text-sm">{totalBooks} Books</span>
                          </div>
                          <Button size="sm" variant="outline">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Authors;
