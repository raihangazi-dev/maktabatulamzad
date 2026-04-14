import { Card } from "@/components/ui/card";
import { Star, Award } from "lucide-react";

const PopularAuthors = () => {
  const authors = [
    {
      name: "Sheikh Abdul Aziz bin Baz",
      rating: 4.9,
      readers: "125K",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=400&fit=crop",
      specialty: "Fiqh & Creed",
    },
    {
      name: "Dr. Bilal Philips",
      rating: 4.8,
      readers: "98K",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop",
      specialty: "Islamic Studies",
    },
    {
      name: "Nouman Ali Khan",
      rating: 4.9,
      readers: "156K",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      specialty: "Quranic Tafsir",
    },
    {
      name: "Mufti Menk",
      rating: 4.7,
      readers: "142K",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop",
      specialty: "Contemporary Issues",
    },
  ];

  return (
    <section className="py-16 bg-background relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold rounded-full blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Award className="h-8 w-8 text-gold" />
            <h2 className="text-4xl font-bold text-foreground">Weekly Popular Authors</h2>
          </div>
          <p className="text-muted-foreground">Most read authors this week</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {authors.map((author, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={author.image} 
                  alt={author.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-gold text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  {author.rating}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 text-foreground">{author.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{author.specialty}</p>
                <p className="text-sm text-primary font-medium">{author.readers} Readers</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularAuthors;
