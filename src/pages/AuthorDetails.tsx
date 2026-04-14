import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAllBooks, useWriter } from "@/hooks/use-catalog";
import { formatPrice, getBookAuthor, getDisplayText } from "@/lib/catalog-ui";
import { ArrowLeft, BookOpen, Calendar, MapPin, Star, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const AuthorDetails = () => {
  const { id } = useParams();
  const { data: writer, isLoading } = useWriter(id);
  const { data: books = [] } = useAllBooks();

  const writerBooks = books.filter((book) => Array.isArray(book.writer) && book.writer.includes(id || ""));
  const totalSold = writerBooks.reduce((sum, book) => sum + Number(book.sold || 0), 0);
  const rating = Math.min(5, 4 + writerBooks.length / 100);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Loading author...</div>
        <Footer />
      </div>
    );
  }

  if (!writer) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Author not found</h1>
          <Link to="/writers" className="mt-4 inline-block text-primary hover:underline">
            Back to Authors
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 py-16 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/writers" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-8">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Authors</span>
          </Link>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="relative flex-shrink-0">
              <img
                src={writer.image}
                alt={getDisplayText(writer.name)}
                className="w-56 h-56 lg:w-72 lg:h-72 object-cover rounded-2xl border-4 border-gold shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-gold text-dark px-4 py-2 rounded-xl text-lg font-bold flex items-center gap-2 shadow-lg">
                <Star className="h-5 w-5 fill-current" />
                {rating.toFixed(1)}
              </div>
            </div>

            <div className="flex-1 text-primary-foreground">
              <Badge className="bg-gold/20 text-gold border-gold/30 mb-3">Collection Writer</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{getDisplayText(writer.name)}</h1>

              <div className="flex flex-wrap gap-6 mb-6 text-primary-foreground/90">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{writerBooks.length} Published Works</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{totalSold.toLocaleString()} Total Readers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Legacy Collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>Maktabatul Amzad Dataset</span>
                </div>
              </div>

              <p className="text-primary-foreground/90 leading-relaxed text-lg">{getDisplayText(writer.desc)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Books by {getDisplayText(writer.name)}</h2>
            <Link to="/books">
              <Button variant="outline">View All Books</Button>
            </Link>
          </div>

          {writerBooks.length === 0 ? (
            <Card className="p-12 text-center text-muted-foreground">No books were found for this writer.</Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {writerBooks.slice(0, 12).map((book) => (
                <Link to={`/book/${book._id}`} key={book._id}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img src={book.thumb} alt={getDisplayText(book.title)} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="line-clamp-2 font-semibold text-foreground">{getDisplayText(book.title)}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{getBookAuthor(book)}</p>
                      <p className="text-primary font-bold mt-2">{formatPrice(book.price)}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AuthorDetails;
