import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { useAllBooks, useCategories, usePublishers, useWriters } from "@/hooks/use-catalog";
import { BookOpen, Building2, Layers3, PenTool } from "lucide-react";

const About = () => {
  const { data: books = [] } = useAllBooks();
  const { data: writers = [] } = useWriters();
  const { data: publishers = [] } = usePublishers();
  const { data: categories = [] } = useCategories();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-10">
        <div className="mb-8 rounded-2xl border bg-card p-8">
          <h1 className="text-4xl font-bold text-foreground">About Maktabatul Amzad</h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            This project now uses your shared collection data and logic from the previous codebase while preserving your
            current design system.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <BookOpen className="h-7 w-7 text-primary" />
            <p className="mt-3 text-3xl font-bold text-foreground">{books.length}</p>
            <p className="text-sm text-muted-foreground">Books</p>
          </Card>
          <Card className="p-6">
            <PenTool className="h-7 w-7 text-primary" />
            <p className="mt-3 text-3xl font-bold text-foreground">{writers.length}</p>
            <p className="text-sm text-muted-foreground">Writers</p>
          </Card>
          <Card className="p-6">
            <Building2 className="h-7 w-7 text-primary" />
            <p className="mt-3 text-3xl font-bold text-foreground">{publishers.length}</p>
            <p className="text-sm text-muted-foreground">Publishers</p>
          </Card>
          <Card className="p-6">
            <Layers3 className="h-7 w-7 text-primary" />
            <p className="mt-3 text-3xl font-bold text-foreground">{categories.length}</p>
            <p className="text-sm text-muted-foreground">Categories</p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
