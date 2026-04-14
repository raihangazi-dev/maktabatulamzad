import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { useAllBooks, useCategories } from "@/hooks/use-catalog";
import { getDisplayText } from "@/lib/catalog-ui";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const CategoriesPage = () => {
  const { data: categories = [], isLoading } = useCategories();
  const { data: books = [] } = useAllBooks();

  const countBooks = (categoryId: string) =>
    books.filter((book) => book.category === categoryId).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-foreground">All Categories</h1>
          <p className="mt-2 text-muted-foreground">
            Category data is loaded from your imported collections.
          </p>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-muted-foreground">Loading categories...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link key={category._id} to={`/categories/${category.categoryId}`}>
                <Card className="group h-full cursor-pointer p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{getDisplayText(category.name)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{countBooks(category.categoryId)} books</p>
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

export default CategoriesPage;
