import BookCard from "./BookCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FeaturedBooks = () => {
  const books = [
    {
      id: 1,
      title: "Al-Muwatta",
      author: "Imam Malik",
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
      price: "$29.99",
    },
    {
      id: 2,
      title: "Al-Shifa",
      author: "Qadi Iyad",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      price: "$34.99",
    },
    {
      id: 3,
      title: "Ihya Ulum al-Din",
      author: "Imam Al-Ghazali",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
      price: "$45.99",
    },
    {
      id: 4,
      title: "Riyad al-Salihin",
      author: "Imam An-Nawawi",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
      price: "$24.99",
    },
    {
      id: 5,
      title: "Al-Adab al-Mufrad",
      author: "Imam Bukhari",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
      price: "$27.99",
    },
    {
      id: 6,
      title: "Tafsir Ibn Kathir",
      author: "Ibn Kathir",
      image: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&h=600&fit=crop",
      price: "$52.99",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">Maktabatul Amzad</h2>
            <p className="text-muted-foreground">Authentic Islamic Literature Collection</p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline">
            View All Books
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
