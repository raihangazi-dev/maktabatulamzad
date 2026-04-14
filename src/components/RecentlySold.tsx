import BookCard from "./BookCard";

const RecentlySold = () => {
  const books = [
    {
      title: "Sahih Al-Bukhari",
      author: "Imam Al-Bukhari",
      price: "$45.99",
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400&h=600&fit=crop",
    },
    {
      title: "Riyadh As-Salihin",
      author: "Imam An-Nawawi",
      price: "$29.99",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    },
    {
      title: "The Sealed Nectar",
      author: "Safi-ur-Rahman",
      price: "$34.99",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    },
    {
      title: "Fiqh Us-Sunnah",
      author: "Sayyid Sabiq",
      price: "$39.99",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-3">Recently Sold</h2>
          <p className="text-muted-foreground">Books that have found their way to new readers</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlySold;
