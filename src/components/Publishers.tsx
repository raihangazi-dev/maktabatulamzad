import { Card } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { useAllBooks, usePublishers } from "@/hooks/use-catalog";
import { getDisplayText } from "@/lib/catalog-ui";
import { Link } from "react-router-dom";

const Publishers = () => {
  const { data: publishers = [], isLoading } = usePublishers();
  const { data: books = [] } = useAllBooks();

  const countBooks = (publisherId: string) =>
    books.filter((book) => book.publisher === publisherId).length;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Building2 className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">Featured Publishers</h2>
          </div>
          <p className="text-muted-foreground">Trusted publishers of authentic Islamic literature</p>
        </div>
        {isLoading ? (
          <div className="py-16 text-center text-muted-foreground">Loading publishers...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {publishers.slice(0, 8).map((publisher) => (
              <Link key={publisher._id} to={`/publishers/${publisher.publisherId || publisher._id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group h-full">
                  <div className="h-40 overflow-hidden bg-muted">
                    {publisher.image ? (
                      <img
                        src={publisher.image}
                        alt={getDisplayText(publisher.name)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                        <Building2 className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 text-foreground">{getDisplayText(publisher.name)}</h3>
                    <p className="text-sm text-muted-foreground">{countBooks(publisher.publisherId)} Books</p>
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

export default Publishers;
