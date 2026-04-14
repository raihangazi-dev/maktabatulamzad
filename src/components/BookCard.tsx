import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface BookCardProps {
  id?: string | number;
  title: string;
  author: string;
  image: string;
  price: string;
}

const BookCard = ({ id = "1", title, author, image, price }: BookCardProps) => {
  return (
    <Link to={`/book/${id}`}>
      <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{author}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">{price}</span>
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90"
              onClick={(e) => e.preventDefault()}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BookCard;
