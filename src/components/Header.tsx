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
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/Authcontext";
import logo from "@/assets/logo.png";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user, role, logOut } = useAuth();
  const { itemCount } = useCart();
  const [searchText, setSearchText] = useState("");

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

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchText.trim();
    navigate(query ? `/books?q=${encodeURIComponent(query)}` : "/books");
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
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="text-white hover:text-primary hover:bg-transparent h-auto py-1 px-2">
                <ShoppingCart className="h-4 w-4 mr-1" />
                Cart ({itemCount} item)
              </Button>
            </Link>
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
                    <DropdownMenuItem asChild>
                      <Link to="/user/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/user/orders">My Orders</Link>
                    </DropdownMenuItem>
                    {role === "admin" ? (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/admin/dashboard">Admin Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/orders">Admin Orders</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/catalog">Admin Catalog CRUD</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/profile">Admin Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/users">Admin Users</Link>
                        </DropdownMenuItem>
                      </>
                    ) : null}
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
            <Link to="/">
              <img src={logo} alt="Bookstore Logo" className="h-10 md:h-12 w-auto" />
            </Link>
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <Link to="/" className="font-medium hover:text-gold transition-colors text-sm xl:text-base">
                Home
              </Link>
              <Link to="/books" className="font-medium hover:text-gold transition-colors text-sm xl:text-base">
                Books
              </Link>
              <Link to="/writers" className="font-medium hover:text-gold transition-colors text-sm xl:text-base">
                Writers
              </Link>
              <Link to="/publishers" className="font-medium hover:text-gold transition-colors text-sm xl:text-base">
                Publishers
              </Link>
              <Link to="/categories" className="font-medium hover:text-gold transition-colors text-sm xl:text-base">
                Categories
              </Link>
              <Link to="/about" className="font-medium hover:text-gold transition-colors text-sm xl:text-base">
                About
              </Link>
            </div>
          </div>
          <form className="flex items-center gap-2 md:gap-4" onSubmit={onSearch}>
            <Input
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search..."
              className="w-32 sm:w-48 md:w-64 bg-white text-dark placeholder:text-muted-foreground"
            />
            <Button variant="destructive" size="default" className="hidden sm:inline-flex" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
