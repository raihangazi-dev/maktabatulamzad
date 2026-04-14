import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <img src={logo} alt="Bookstore Logo" className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm opacity-80 mb-4">
              Your trusted source for authentic Islamic literature and classical texts. Building knowledge, one book at a time.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Home</a></li>
              <li><a href="/books" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Books</a></li>
              <li><a href="/writers" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Writers</a></li>
              <li><a href="/publishers" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Publishers</a></li>
              <li><a href="/about" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Returns</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm opacity-80">123 Islamic Center, Book District, City 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:+18801455474" className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  (880) 1455474744484
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:amjad@gmail.com" className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors">
                  amjad@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm opacity-70">
            © 2025 Maktabatul Amzad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
