import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { PenTool } from "lucide-react";

const Writers = () => {
  const writers = [
    {
      name: "Imam Ibn Taymiyyah",
      books: 85,
      specialty: "Islamic Jurisprudence",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=300&fit=crop",
    },
    {
      name: "Imam Al-Nawawi",
      books: 42,
      specialty: "Hadith Sciences",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    },
    {
      name: "Ibn Qayyim Al-Jawziyya",
      books: 67,
      specialty: "Islamic Philosophy",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    },
    {
      name: "Imam As-Suyuti",
      books: 120,
      specialty: "Tafsir & History",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
    },
    {
      name: "Dr. Zakir Naik",
      books: 28,
      specialty: "Comparative Religion",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    },
    {
      name: "Maulana Tariq Jameel",
      books: 15,
      specialty: "Islamic Ethics",
      image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=300&h=300&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <PenTool className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold text-foreground">Renowned Authors</h2>
          </div>
          <p className="text-muted-foreground">Scholars and writers who shaped Islamic literature</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {writers.map((writer, index) => (
            <Link to="/writers" key={index}>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer text-center">
                <div className="w-full aspect-square overflow-hidden">
                  <img 
                    src={writer.image} 
                    alt={writer.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1 text-foreground">{writer.name}</h3>
                  <p className="text-xs text-muted-foreground mb-1">{writer.specialty}</p>
                  <p className="text-xs text-primary font-medium">{writer.books} Books</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Writers;
