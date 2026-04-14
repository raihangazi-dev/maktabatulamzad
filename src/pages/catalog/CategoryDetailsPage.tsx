import BookCard from "@/components/BookCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { useAllBooks, useCategories, useSubCategories } from "@/hooks/use-catalog";
import { formatPrice, getBookAuthor, getDisplayText } from "@/lib/catalog-ui";
import { ArrowLeft, Layers3 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CategoryDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { data: categories = [], isLoading: categoryLoading } = useCategories();
  const { data: books = [], isLoading: booksLoading } = useAllBooks();
  const { data: subcategories = [], isLoading: subcategoryLoading } = useSubCategories(id);

  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const category = useMemo(
    () => categories.find((item) => item.categoryId === id || item._id === id),
    [categories, id],
  );

  const categoryId = category?.categoryId || id || "";

  const categoryBooks = useMemo(() => books.filter((book) => book.category === categoryId), [books, categoryId]);

  const filteredBooks = useMemo(() => {
    if (!selectedSubCategory) {
      return categoryBooks;
    }
    return categoryBooks.filter((book) => book.subCategory === selectedSubCategory);
  }, [categoryBooks, selectedSubCategory]);

  const subCategoryCount = (subCategoryId: string) =>
    categoryBooks.filter((book) => book.subCategory === subCategoryId).length;

  const isLoading = categoryLoading || booksLoading || subcategoryLoading;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-10">
        <Link to="/categories" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to categories
        </Link>

        {isLoading ? (
          <div className="py-24 text-center text-muted-foreground">Loading category details...</div>
        ) : !category ? (
          <Card className="py-20 text-center">
            <h1 className="text-2xl font-bold text-foreground">Category not found</h1>
            <Link to="/categories" className="mt-4 inline-block text-primary hover:underline">
              Browse all categories
            </Link>
          </Card>
        ) : (
          <>
            <div className="mb-8 rounded-2xl border bg-card p-6">
              <div className="mb-3 inline-flex items-center gap-2 text-primary">
                <Layers3 className="h-6 w-6" />
                <h1 className="text-3xl font-bold text-foreground">{getDisplayText(category.name)}</h1>
              </div>
              <p className="text-sm text-muted-foreground">{categoryBooks.length} books found in this category.</p>
            </div>

            <div className="mb-8 flex flex-wrap gap-3">
              <Button
                size="sm"
                variant={selectedSubCategory ? "outline" : "default"}
                onClick={() => setSelectedSubCategory("")}
              >
                All Subcategories
              </Button>

              {subcategories.map((subCategory) => (
                <Button
                  key={subCategory._id}
                  size="sm"
                  variant={selectedSubCategory === subCategory.subCategoryId ? "default" : "outline"}
                  onClick={() => setSelectedSubCategory(subCategory.subCategoryId)}
                >
                  {getDisplayText(subCategory.name)} ({subCategoryCount(subCategory.subCategoryId)})
                </Button>
              ))}
            </div>

            {selectedSubCategory ? (
              <div className="mb-6">
                <Badge variant="secondary">
                  Showing books from{" "}
                  {getDisplayText(
                    subcategories.find((item) => item.subCategoryId === selectedSubCategory)?.name,
                  )}
                </Badge>
              </div>
            ) : null}

            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredBooks.map((book) => (
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
            ) : (
              <Card className="py-20 text-center text-muted-foreground">
                No books were found for this subcategory.
              </Card>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryDetailsPage;
