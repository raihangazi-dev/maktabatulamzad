import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCollectionCounts } from "@/hooks/use-catalog";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { data: counts, isLoading } = useCollectionCounts();

  const cards = [
    { label: "Books", value: counts?.books || 0 },
    { label: "Writers", value: counts?.writers || 0 },
    { label: "Publishers", value: counts?.publishers || 0 },
    { label: "Categories", value: counts?.categories || 0 },
    { label: "Orders", value: counts?.orders || 0 },
    { label: "Users", value: counts?.users || 0 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
        </div>
        <p className="text-muted-foreground mb-8">Monitor collections and manage admin operations.</p>

        <div className="flex flex-wrap gap-3 mb-8">
          <Link to="/admin/orders">
            <Button>Manage Orders</Button>
          </Link>
          <Link to="/admin/catalog">
            <Button variant="outline">Catalog CRUD</Button>
          </Link>
          <Link to="/admin/users">
            <Button variant="outline">Manage Users</Button>
          </Link>
          <Link to="/admin/profile">
            <Button variant="outline">Admin Profile</Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-muted-foreground">Loading dashboard...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <Card key={card.label} className="p-6">
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="mt-2 text-4xl font-bold text-foreground">{card.value}</p>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
