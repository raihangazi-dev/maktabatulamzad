import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedBooks from "@/components/FeaturedBooks";
import Categories from "@/components/Categories";
import RecentlySold from "@/components/RecentlySold";
import BestSellers from "@/components/BestSellers";
import Publishers from "@/components/Publishers";
import Writers from "@/components/Writers";
import PopularAuthors from "@/components/PopularAuthors";
import Blogs from "@/components/Blogs";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedBooks />
      <RecentlySold />
      <BestSellers />
      <Categories />
      <Publishers />
      <Writers />
      <PopularAuthors />
      <Blogs />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
