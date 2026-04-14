import { ShoppingCart, User, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/Authcontext";
import logo from "@/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      toast({
        title: "Signed out",
        description: "You have been logged out successfully.",
      });
      navigate("/", { replace: true });
    } catch (error) {
      toast({
        title: "Unable to sign out",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Top Bar */}
      <div className="bg-dark text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+18801455474" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Phone className="h-3 w-3" />
              (880) 1455474744484
            </a>
            <a href="mailto:amjad@gmail.com" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Mail className="h-3 w-3" />
              amjad@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-transparent h-auto py-1 px-2">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Cart (0 item)
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-transparent h-auto py-1 px-2">
                  Language <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Bangla</DropdownMenuItem>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Arabic</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-transparent h-auto py-1 px-2">
                  <User className="h-4 w-4 mr-1" />
                  {user?.displayName || "Account"} <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {user ? (
                  <>
                    <DropdownMenuLabel className="max-w-52 truncate">
                      {user.displayName || user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => void handleLogout()}>Logout</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/sign-in">Sign In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/sign-up">Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-primary text-primary-foreground py-4 px-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 lg:gap-8 flex-1">
            <img src={logo} alt="Bookstore Logo" className="h-10 md:h-12 w-auto" />
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <a href="/" className="font-medium hover:text-gold transition-colors text-sm xl:text-base">
                Home
              </a>
              <a href="/books" className="font-medium hover:text-gold transition-colors text-sm xl:text-base">
                Books
              </a>
              <a href="/writers" className="font-medium hover:text-gold transition-colors text-sm xl:text-base">
                Writers
              </a>
              <a href="/publishers" className="font-medium hover:text-gold transition-colors text-sm xl:text-base">
                Publishers
              </a>
              <a href="/category" className="font-medium hover:text-gold transition-colors text-sm xl:text-base">
                Category
              </a>
              <a href="/about" className="font-medium hover:text-gold transition-colors text-sm xl:text-base">
                About
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Input
              type="search"
              placeholder="Search..."
              className="w-32 sm:w-48 md:w-64 bg-white text-dark placeholder:text-muted-foreground"
            />
            <Button variant="destructive" size="default" className="hidden sm:inline-flex">
              Submit
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
