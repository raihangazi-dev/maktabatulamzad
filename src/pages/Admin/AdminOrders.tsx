import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useOrders } from "@/hooks/use-catalog";
import { deleteOrder, editOrderStatus } from "@/lib/catalog-service";
import { formatPrice, getDisplayText } from "@/lib/catalog-ui";
import { useQueryClient } from "@tanstack/react-query";

const statuses = ["pending", "processing", "shipped", "delivered", "canceled"];

const AdminOrders = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: orders = [], isLoading } = useOrders();

  const onStatusChange = async (orderId: string, editedStatus: string) => {
    const result = await editOrderStatus(orderId, editedStatus);
    if (result.modifiedCount > 0) {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "Order updated",
        description: `Status changed to ${editedStatus}.`,
      });
    }
  };

  const onDeleteOrder = async (orderId: string) => {
    await deleteOrder(orderId);
    await queryClient.invalidateQueries({ queryKey: ["orders"] });
    toast({
      title: "Order deleted",
      description: "The order has been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-foreground mb-2">Admin Orders</h1>
        <p className="text-muted-foreground mb-8">Manage all customer orders and their statuses.</p>

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
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h2 className="font-semibold">Order #{order._id}</h2>
                      <p className="text-sm text-muted-foreground">
                        {order.name} | {order.mail} | {order.phone}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.fullAddress?.district}, {order.fullAddress?.city}, {order.fullAddress?.zip}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {statuses.map((status) => (
                        <Button
                          key={status}
                          size="sm"
                          variant={order.status === status ? "default" : "outline"}
                          onClick={() => onStatusChange(order._id, status)}
                        >
                          {status}
                        </Button>
                      ))}
                      <Button size="sm" variant="destructive" onClick={() => onDeleteOrder(order._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>

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
          <Card className="py-20 text-center text-muted-foreground">No orders found.</Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminOrders;
