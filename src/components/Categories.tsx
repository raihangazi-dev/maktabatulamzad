import { Card } from "@/components/ui/card";
import { BookOpen, Scroll, GraduationCap, Heart } from "lucide-react";

const Categories = () => {
  const categories = [
    {
      icon: BookOpen,
      title: "Hadith Collections",
      count: "245 Books",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Scroll,
      title: "Tafsir & Quranic Studies",
      count: "189 Books",
      color: "bg-secondary/10 text-secondary",
    },
    {
      icon: GraduationCap,
      title: "Islamic Jurisprudence",
      count: "312 Books",
      color: "bg-gold/10 text-gold",
    },
    {
      icon: Heart,
      title: "Spirituality & Ethics",
      count: "156 Books",
      color: "bg-primary/10 text-primary",
    },
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-3">Browse by Category</h2>
          <p className="text-muted-foreground">Explore our extensive collection organized by Islamic sciences</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                <div className={`w-16 h-16 rounded-lg ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{category.title}</h3>
                <p className="text-muted-foreground">{category.count}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
