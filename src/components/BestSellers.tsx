import BookCard from "./BookCard";
import { TrendingUp } from "lucide-react";

const BestSellers = () => {
  const books = [
    {
      title: "Tafsir Ibn Kathir",
      author: "Ibn Kathir",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1585779034823-7e9ac8faec70?w=400&h=600&fit=crop",
    },
    {
      title: "Ihya Ulum al-Din",
      author: "Imam Al-Ghazali",
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    },
    {
      title: "Al-Muwatta",
      author: "Imam Malik",
      price: "$42.99",
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
    },
    {
      title: "Sahih Muslim",
      author: "Imam Muslim",
      price: "$47.99",
      image: "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?w=400&h=600&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-primary rounded-full"></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">Best Sellers</h2>
          </div>
          <p className="text-muted-foreground">Most loved books by our community</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
