import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { useAllBooks, usePublishers } from "@/hooks/use-catalog";
import { getDisplayText } from "@/lib/catalog-ui";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const PublishersPage = () => {
  const { data: publishers = [], isLoading } = usePublishers();
  const { data: books = [] } = useAllBooks();

  const countBooks = (publisherId: string) =>
    books.filter((book) => book.publisher === publisherId).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-10">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-primary">
            <Building2 className="h-8 w-8" />
            <h1 className="text-4xl font-bold text-foreground">All Publishers</h1>
          </div>
          <p className="text-muted-foreground">Publisher logic and counts now come from your reference collections.</p>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-muted-foreground">Loading publishers...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {publishers.map((publisher) => (
              <Link key={publisher._id} to={`/publishers/${publisher.publisherId || publisher._id}`}>
                <Card className="group h-full cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="h-40 overflow-hidden bg-muted">
                    {publisher.image ? (
                      <img
                        src={publisher.image}
                        alt={getDisplayText(publisher.name)}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <Building2 className="h-10 w-10" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="line-clamp-2 text-lg font-semibold text-foreground">{getDisplayText(publisher.name)}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{countBooks(publisher.publisherId)} books</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PublishersPage;
