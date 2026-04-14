import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  BookOpen,
  User,
  Calendar,
  FileText,
  Globe,
  Minus,
  Plus,
  Award,
  Quote,
  CheckCircle,
  Package,
  Clock,
  MessageCircle,
  ThumbsUp,
  Users,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import BookCard from "@/components/BookCard";

// Sample book data - in a real app, this would come from an API
const bookData = {
  id: "1",
  title: "Sahih Al-Bukhari",
  author: "Imam Bukhari",
  authorId: 1,
  price: 2500,
  originalPrice: 3000,
  discount: 17,
  image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600",
  images: [
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
  ],
  rating: 4.8,
  reviews: 156,
  inStock: true,
  stockCount: 24,
  category: "Hadith",
  publisher: "Darussalam Publications",
  publishDate: "2023",
  pages: 1200,
  language: "Arabic/English",
  isbn: "978-3-16-148410-0",
  weight: "2.5 kg",
  dimensions: "25 x 18 x 5 cm",
  binding: "Hardcover",
  edition: "3rd Edition",
  description: "Sahih al-Bukhari is a collection of hadith compiled by Imam Muhammad al-Bukhari (d. 256 AH/870 AD) (rahimahullah). His collection is recognized by the overwhelming majority of the Muslim world to be the most authentic collection of reports of the Sunnah of the Prophet Muhammad (ﷺ). It contains over 7,500 hadith (with repetitions) in 97 books.",
  longDescription: "This comprehensive collection represents the pinnacle of hadith scholarship. Imam Bukhari traveled extensively throughout the Islamic world, collecting hadith from over 1,000 scholars. His rigorous methodology for verifying the authenticity of each hadith set the standard for all subsequent hadith scholars. The collection covers all aspects of Islamic life, from theology and jurisprudence to ethics and etiquette.",
  features: [
    "Complete authentic collection of 7,500+ hadith",
    "Arabic text with English translation",
    "Detailed commentary and footnotes by renowned scholars",
    "High-quality print on acid-free paper",
    "Comprehensive index for easy reference",
    "Gold-embossed hardcover binding"
  ],
  tableOfContents: [
    { chapter: "Book of Revelation", hadith: 7 },
    { chapter: "Book of Belief (Faith)", hadith: 52 },
    { chapter: "Book of Knowledge", hadith: 134 },
    { chapter: "Book of Ablution", hadith: 113 },
    { chapter: "Book of Prayer", hadith: 172 },
    { chapter: "Book of Fasting", hadith: 118 },
    { chapter: "Book of Hajj", hadith: 156 }
  ],
  sampleReviews: [
    {
      id: 1,
      name: "Ahmad Hassan",
      rating: 5,
      date: "December 2024",
      comment: "Excellent translation and commentary. The quality of printing is outstanding. A must-have for every Muslim household.",
      helpful: 45,
      verified: true
    },
    {
      id: 2,
      name: "Fatima Khan",
      rating: 5,
      date: "November 2024",
      comment: "Beautiful binding and clear Arabic text. The footnotes are very helpful for understanding the context of each hadith.",
      helpful: 32,
      verified: true
    },
    {
      id: 3,
      name: "Yusuf Ali",
      rating: 4,
      date: "October 2024",
      comment: "Great book overall. The translation is accurate and easy to understand. Shipping was fast.",
      helpful: 28,
      verified: true
    }
  ],
  ratingBreakdown: {
    5: 120,
    4: 25,
    3: 8,
    2: 2,
    1: 1
  }
};

const relatedBooks = [
  {
    title: "Sahih Muslim",
    author: "Imam Muslim",
    price: "৳2,200",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400"
  },
  {
    title: "Riyad as-Salihin",
    author: "Imam Nawawi",
    price: "৳1,800",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"
  },
  {
    title: "Sunan Abu Dawud",
    author: "Abu Dawud",
    price: "৳2,000",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400"
  },
  {
    title: "Jami at-Tirmidhi",
    author: "Imam Tirmidhi",
    price: "৳2,100",
    image: "https://images.unsplash.com/photo-1509266272358-7701da638078?w=400"
  }
];

const alsoViewedBooks = [
  {
    title: "Tafsir Ibn Kathir",
    author: "Ibn Kathir",
    price: "৳3,500",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400"
  },
  {
    title: "Fiqh As-Sunnah",
    author: "Sayyid Sabiq",
    price: "৳1,600",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400"
  },
  {
    title: "The Sealed Nectar",
    author: "Safiur Rahman",
    price: "৳800",
    image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400"
  },
  {
    title: "Stories of Prophets",
    author: "Ibn Kathir",
    price: "৳950",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400"
  }
];

const BookDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const totalReviews = Object.values(bookData.ratingBreakdown).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Decorative Islamic Pattern */}
      <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/" className="hover:text-primary transition-colors">Books</Link>
          <span>/</span>
          <Link to="/" className="hover:text-primary transition-colors">{bookData.category}</Link>
          <span>/</span>
          <span className="text-foreground">{bookData.title}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-border bg-muted">
              {/* Islamic corner decorations */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-primary/30 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-primary/30 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-primary/30 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-primary/30 rounded-br-xl" />
              
              <img
                src={bookData.images[selectedImage]}
                alt={bookData.title}
                className="w-full h-full object-cover"
              />
              
              {bookData.discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-lg px-4 py-2">
                  -{bookData.discount}% OFF
                </Badge>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-3 justify-center">
              {bookData.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-28 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx 
                      ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary" className="text-sm">{bookData.category}</Badge>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Bestseller
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-heading">
                {bookData.title}
              </h1>
              <Link to={`/writer/${bookData.authorId}`} className="text-lg text-primary hover:underline font-medium">
                by {bookData.author}
              </Link>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(bookData.rating)
                        ? 'text-gold fill-gold'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-lg">{bookData.rating}</span>
              <span className="text-muted-foreground">({bookData.reviews} reviews)</span>
              <span className="text-primary">|</span>
              <span className="text-muted-foreground">{bookData.stockCount} in stock</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4 bg-muted/50 p-4 rounded-xl">
              <span className="text-4xl font-bold text-primary">৳{bookData.price.toLocaleString()}</span>
              {bookData.originalPrice > bookData.price && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ৳{bookData.originalPrice.toLocaleString()}
                  </span>
                  <Badge className="bg-accent text-accent-foreground">
                    Save ৳{(bookData.originalPrice - bookData.price).toLocaleString()}
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${bookData.inStock ? 'bg-primary animate-pulse' : 'bg-accent'}`} />
                <span className={`font-medium ${bookData.inStock ? 'text-primary' : 'text-accent'}`}>
                  {bookData.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>{bookData.stockCount} units available</span>
              </div>
            </div>

            {/* Quick Description */}
            <p className="text-muted-foreground leading-relaxed">{bookData.description}</p>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="px-6 py-3 font-semibold min-w-[60px] text-center text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-muted transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              
              <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 text-lg py-6">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 ${isWishlisted ? 'text-accent border-accent bg-accent/10' : ''}`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-accent' : ''}`} />
              </Button>
              
              <Button size="lg" variant="outline" className="px-6">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Buy Now Button */}
            <Button size="lg" variant="secondary" className="w-full text-lg py-6 bg-dark hover:bg-dark/90 text-white">
              Buy Now
            </Button>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="h-7 w-7 text-primary" />
                </div>
                <span className="text-sm font-medium">Free Delivery</span>
                <span className="text-xs text-muted-foreground">Orders over ৳500</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <span className="text-sm font-medium">Secure Payment</span>
                <span className="text-xs text-muted-foreground">100% Protected</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <RotateCcw className="h-7 w-7 text-primary" />
                </div>
                <span className="text-sm font-medium">Easy Returns</span>
                <span className="text-xs text-muted-foreground">7 Day Policy</span>
              </div>
            </div>

            {/* Quick Info Card */}
            <Card className="p-6 bg-muted/50">
              <h3 className="font-semibold mb-4 text-foreground">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <span className="text-muted-foreground">Pages:</span>
                    <p className="font-medium">{bookData.pages}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <span className="text-muted-foreground">Publisher:</span>
                    <p className="font-medium truncate">{bookData.publisher}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <span className="text-muted-foreground">Year:</span>
                    <p className="font-medium">{bookData.publishDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  <div>
                    <span className="text-muted-foreground">Language:</span>
                    <p className="font-medium">{bookData.language}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-primary" />
                  <div>
                    <span className="text-muted-foreground">Binding:</span>
                    <p className="font-medium">{bookData.binding}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <span className="text-muted-foreground">Edition:</span>
                    <p className="font-medium">{bookData.edition}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto flex-wrap">
            <TabsTrigger 
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 text-base"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="details"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 text-base"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger 
              value="contents"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 text-base"
            >
              Table of Contents
            </TabsTrigger>
            <TabsTrigger 
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4 text-base"
            >
              Reviews ({bookData.reviews})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="pt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold mb-4 text-foreground">About This Book</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{bookData.description}</p>
                <p className="text-muted-foreground leading-relaxed">{bookData.longDescription}</p>
                
                <h4 className="text-xl font-semibold mt-8 mb-4 text-foreground flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Key Features
                </h4>
                <ul className="space-y-3">
                  {bookData.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <Card className="p-6 bg-primary/5 border-primary/20">
                  <h4 className="font-semibold mb-4 flex items-center gap-2 text-foreground">
                    <Quote className="h-5 w-5 text-primary" />
                    Why Choose This Edition?
                  </h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Authenticated by renowned Islamic scholars</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Clear Arabic typography with diacritics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Comprehensive indexing system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>Premium quality paper and binding</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="pt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "ISBN", value: bookData.isbn, icon: FileText },
                { label: "Publisher", value: bookData.publisher, icon: User },
                { label: "Publication Year", value: bookData.publishDate, icon: Calendar },
                { label: "Language", value: bookData.language, icon: Globe },
                { label: "Pages", value: bookData.pages, icon: BookOpen },
                { label: "Category", value: bookData.category, icon: FileText },
                { label: "Weight", value: bookData.weight, icon: Package },
                { label: "Dimensions", value: bookData.dimensions, icon: Package },
                { label: "Binding", value: bookData.binding, icon: BookOpen },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 bg-muted/50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contents" className="pt-8">
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold mb-6 text-foreground">Sample Chapters</h3>
              <div className="space-y-3">
                {bookData.tableOfContents.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                        {idx + 1}
                      </span>
                      <span className="font-medium">{item.chapter}</span>
                    </div>
                    <Badge variant="secondary">{item.hadith} Hadith</Badge>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-muted-foreground text-sm">
                * This is a sample of the table of contents. The complete book contains 97 chapters with over 7,500 hadith.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="pt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Rating Summary */}
              <div className="lg:col-span-1">
                <Card className="p-6 text-center">
                  <div className="text-5xl font-bold text-foreground mb-2">{bookData.rating}</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(bookData.rating)
                            ? 'text-gold fill-gold'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">Based on {totalReviews} reviews</p>
                  
                  {/* Rating Breakdown */}
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm w-6">{star}★</span>
                        <Progress 
                          value={(bookData.ratingBreakdown[star as keyof typeof bookData.ratingBreakdown] / totalReviews) * 100} 
                          className="flex-1 h-2"
                        />
                        <span className="text-sm text-muted-foreground w-10">
                          {bookData.ratingBreakdown[star as keyof typeof bookData.ratingBreakdown]}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-6">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Write a Review
                  </Button>
                </Card>
              </div>
              
              {/* Reviews List */}
              <div className="lg:col-span-2 space-y-6">
                {bookData.sampleReviews.map((review) => (
                  <Card key={review.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{review.name}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {review.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'text-gold fill-gold'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{review.comment}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({review.helpful})
                      </Button>
                    </div>
                  </Card>
                ))}
                
                <Button variant="outline" className="w-full">
                  Load More Reviews
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Author Section */}
        <section className="mb-16 bg-muted/50 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1 bg-primary rounded" />
            <h2 className="text-2xl md:text-3xl font-bold font-heading">About the Author</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users className="h-12 w-12 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">{bookData.author}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Imam Muhammad ibn Ismail al-Bukhari (810–870 CE) was a Persian Islamic scholar who authored the hadith collection known as Sahih al-Bukhari, regarded by Sunni Muslims as one of the most authentic hadith collections. He spent 16 years compiling this collection, traveling extensively to gather hadith from over 1,000 scholars.
              </p>
              <Link to={`/writer/${bookData.authorId}`}>
                <Button variant="outline">
                  View Author Profile
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Books */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-1 bg-primary rounded" />
            <h2 className="text-2xl md:text-3xl font-bold font-heading">Related Books</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedBooks.map((book, idx) => (
              <Link to={`/book/${idx + 2}`} key={idx}>
                <BookCard {...book} />
              </Link>
            ))}
          </div>
        </section>

        {/* Customers Also Viewed */}
        <section className="mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-1 bg-primary rounded" />
            <h2 className="text-2xl md:text-3xl font-bold font-heading">Customers Also Viewed</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {alsoViewedBooks.map((book, idx) => (
              <Link to={`/book/${idx + 10}`} key={idx}>
                <BookCard {...book} />
              </Link>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookDetails;