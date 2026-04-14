import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenTool, BookOpen, Star, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const authors = [
  {
    id: 1,
    name: "Imam Ibn Taymiyyah",
    books: 85,
    specialty: "Islamic Jurisprudence",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300&h=300&fit=crop",
    bio: "One of the most influential Islamic scholars, known for his extensive works on theology and jurisprudence.",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Imam Al-Nawawi",
    books: 42,
    specialty: "Hadith Sciences",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    bio: "Renowned scholar famous for his compilation of 40 Hadith and commentary on Sahih Muslim.",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Ibn Qayyim Al-Jawziyya",
    books: 67,
    specialty: "Islamic Philosophy",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    bio: "A prolific writer and student of Ibn Taymiyyah, known for his works on spirituality and theology.",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Imam As-Suyuti",
    books: 120,
    specialty: "Tafsir & History",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
    bio: "One of the most prolific scholars in Islamic history with extensive works on Quranic exegesis.",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Dr. Zakir Naik",
    books: 28,
    specialty: "Comparative Religion",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    bio: "Contemporary Islamic scholar known for his comparative religious studies and public debates.",
    rating: 4.6,
  },
  {
    id: 6,
    name: "Maulana Tariq Jameel",
    books: 15,
    specialty: "Islamic Ethics",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=300&h=300&fit=crop",
    bio: "Popular Pakistani scholar known for his lectures on Islamic ethics and spirituality.",
    rating: 4.8,
  },
  {
    id: 7,
    name: "Sheikh Yusuf Al-Qaradawi",
    books: 95,
    specialty: "Contemporary Fiqh",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop",
    bio: "Influential contemporary scholar known for his moderate approach to Islamic jurisprudence.",
    rating: 4.7,
  },
  {
    id: 8,
    name: "Dr. Israr Ahmed",
    books: 32,
    specialty: "Quranic Studies",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop",
    bio: "Pakistani Islamic theologian known for his scholarly approach to Quranic interpretation.",
    rating: 4.8,
  },
];

const Authors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <span className="text-primary-foreground/70">Back to Home</span>
          </div>
          <div className="flex items-center gap-3">
            <PenTool className="h-10 w-10 text-gold" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">Our Authors</h1>
          </div>
          <p className="text-primary-foreground/80 mt-4 max-w-2xl">
            Discover the brilliant minds behind our collection. These renowned scholars and writers have shaped Islamic literature across centuries.
          </p>
        </div>
      </section>

      {/* Authors Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {authors.map((author) => (
              <Link to={`/writer/${author.id}`} key={author.id}>
                <Card 
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    <img 
                      src={author.image} 
                      alt={author.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-gold text-dark px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      {author.rating}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-1 text-foreground">{author.name}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{author.specialty}</p>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{author.bio}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">{author.books} Books</span>
                      </div>
                      <Button size="sm" variant="outline">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Authors;
