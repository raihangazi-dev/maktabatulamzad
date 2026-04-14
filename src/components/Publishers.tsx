import { Card } from "@/components/ui/card";
import { Building2 } from "lucide-react";

const Publishers = () => {
  const publishers = [
    {
      name: "Dar Al-Kotob Al-Ilmiyah",
      books: 450,
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop",
    },
    {
      name: "Islamic Book Service",
      books: 320,
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop",
    },
    {
      name: "Dar Al-Salam",
      books: 280,
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
    },
    {
      name: "International Islamic Publishing",
      books: 390,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    },
  ];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {publishers.map((publisher, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <div className="h-40 overflow-hidden">
                <img 
                  src={publisher.image} 
                  alt={publisher.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 text-foreground">{publisher.name}</h3>
                <p className="text-sm text-muted-foreground">{publisher.books} Books</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publishers;
