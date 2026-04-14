import { Card } from "@/components/ui/card";
import { BookOpen, Scroll, GraduationCap, Heart } from "lucide-react";
import { useAllBooks, useCategories } from "@/hooks/use-catalog";
import { getDisplayText } from "@/lib/catalog-ui";
import { Link } from "react-router-dom";

const Categories = () => {
  const { data: categories = [], isLoading } = useCategories();
  const { data: books = [] } = useAllBooks();

  const iconSet = [BookOpen, Scroll, GraduationCap, Heart];
  const colorSet = [
    "bg-primary/10 text-primary",
    "bg-secondary/10 text-secondary",
    "bg-gold/10 text-gold",
    "bg-primary/10 text-primary",
  ];

  const countByCategory = (categoryId: string) =>
    books.filter((book) => book.category === categoryId).length;

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-3">Browse by Category</h2>
          <p className="text-muted-foreground">Explore our extensive collection organized by Islamic sciences</p>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-muted-foreground">Loading categories...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category, index) => {
              const Icon = iconSet[index % iconSet.length];
              const color = colorSet[index % colorSet.length];
              return (
                <Link key={category._id} to={`/categories/${category.categoryId}`}>
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group h-full">
                    <div
                      className={`w-16 h-16 rounded-lg ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{getDisplayText(category.name)}</h3>
                    <p className="text-muted-foreground">{countByCategory(category.categoryId)} Books</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
