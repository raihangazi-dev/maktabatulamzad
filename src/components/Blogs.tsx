import { Card } from "@/components/ui/card";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blogs = () => {
  const blogs = [
    {
      title: "Understanding the Five Pillars of Islam",
      excerpt: "Explore the fundamental practices that form the foundation of Islamic faith and practice.",
      author: "Dr. Ahmed Hassan",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&h=400&fit=crop",
      category: "Fundamentals",
    },
    {
      title: "The Art of Quranic Recitation",
      excerpt: "Learn about Tajweed and the beautiful science of reciting the Holy Quran correctly.",
      author: "Sheikh Muhammad Ali",
      date: "March 12, 2024",
      image: "https://images.unsplash.com/photo-1564769610726-0dd525e0a2f2?w=600&h=400&fit=crop",
      category: "Quran",
    },
    {
      title: "Islamic Finance in Modern Times",
      excerpt: "Discover how Islamic financial principles apply in today's economic landscape.",
      author: "Dr. Fatima Rahman",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      category: "Contemporary",
    },
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-3">Latest from Our Blog</h2>
          <p className="text-muted-foreground">Insights, knowledge, and reflections on Islamic teachings</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-semibold">
                  {blog.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2 text-foreground line-clamp-2">{blog.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{blog.excerpt}</p>
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
