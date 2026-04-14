import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/Authcontext";
import { useOrders } from "@/hooks/use-catalog";
import { formatPrice, getDisplayText } from "@/lib/catalog-ui";

const UserOrders = () => {
  const { user } = useAuth();
  const { data: orders = [], isLoading } = useOrders(user?.email);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-foreground mb-2">My Orders</h1>
        <p className="text-muted-foreground mb-8">Track your orders and delivery status.</p>

        {isLoading ? (
          <div className="py-20 text-center text-muted-foreground">Loading orders...</div>
        ) : orders.length > 0 ? (
          <div className="space-y-5">
            {orders.map((order) => {
              const subtotal = (order.orders || []).reduce(
                (sum, item) => sum + Number(item.price || 0) * Number(item.items || 0),
                0,
              );
              const total = subtotal + Number(order.deliveryCharge || 0);

              return (
                <Card key={order._id} className="p-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <h2 className="font-semibold">Order #{order._id}</h2>
                    <p className="text-sm text-muted-foreground">Status: {order.status || "pending"}</p>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Date: {String(order.timestamp || "").slice(0, 10) || "-"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Delivery: {order.fullAddress?.district}, {order.fullAddress?.city}, {order.fullAddress?.zip}
                  </p>

                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left">
                          <th className="py-2 pr-3">Item</th>
                          <th className="py-2 pr-3">Price</th>
                          <th className="py-2 pr-3">Qty</th>
                          <th className="py-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(order.orders || []).map((item, index) => (
                          <tr key={`${item.bookId || index}`} className="border-b last:border-b-0">
                            <td className="py-2 pr-3">{getDisplayText(item.title)}</td>
                            <td className="py-2 pr-3">{formatPrice(item.price)}</td>
                            <td className="py-2 pr-3">{item.items}</td>
                            <td className="py-2">{formatPrice(Number(item.price || 0) * Number(item.items || 0))}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 text-sm">
                    <p>Subtotal: {formatPrice(subtotal)}</p>
                    <p>Delivery: {formatPrice(order.deliveryCharge || 0)}</p>
                    <p className="font-semibold">Grand Total: {formatPrice(total)}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="py-20 text-center text-muted-foreground">You have not placed any orders yet.</Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default UserOrders;
