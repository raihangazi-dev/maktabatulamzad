import { Card } from "@/components/ui/card";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAllBooks } from "@/hooks/use-catalog";
import { getBookAuthor, getDisplayText } from "@/lib/catalog-ui";
import { useMemo } from "react";

const Blogs = () => {
  const { data: books = [] } = useAllBooks();

  const highlights = useMemo(() => {
    return [...books]
      .sort((a, b) => Number(b.sold || 0) - Number(a.sold || 0))
      .slice(0, 3)
      .map((book) => ({
        id: book._id,
        title: getDisplayText(book.title),
        excerpt: getDisplayText(book.desc).slice(0, 140),
        author: getBookAuthor(book),
        date: book.publishedYear || "-",
        image: book.thumb,
        category: getDisplayText(book.categoryDetails?.[0]?.name) || "Books",
      }));
  }, [books]);

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-3">Latest from Our Blog</h2>
          <p className="text-muted-foreground">Insights, knowledge, and reflections on Islamic teachings</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((blog) => (
            <Card key={blog.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <div className="h-48 overflow-hidden relative">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-semibold">
                  {blog.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2 text-foreground line-clamp-2">{blog.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{blog.excerpt}...</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {blog.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {blog.date}
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="group/btn p-0 h-auto text-primary hover:text-primary/80">
                  Read More 
                  <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
