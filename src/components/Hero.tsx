import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBooks from "@/assets/hero-books.jpg";

const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBooks})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            The Six Books Collection
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gold">
            Bukhari, Muslim, Abu Dawud, Tirmidhi, Nasa'i and Ibn Majah
          </p>
          <p className="text-lg mb-8 opacity-90">
            Discover authentic Islamic literature and expand your knowledge with our curated collection of classical and contemporary works.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Browse Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-dark">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
