import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { formatPrice, getDisplayText } from "@/lib/catalog-ui";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, itemCount, subtotal, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-10">
        <h1 className="mb-3 text-4xl font-bold text-foreground">Cart Details</h1>
        <p className="mb-8 text-muted-foreground">{itemCount} item(s) in cart</p>

        {cart.length === 0 ? (
          <Card className="py-20 text-center">
            <p className="mb-4 text-muted-foreground">Your cart is empty.</p>
            <Link to="/books">
              <Button>Browse Books</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              {cart.map((item) => (
                <Card key={item._id} className="p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <img src={item.thumb} alt={getDisplayText(item.title)} className="h-28 w-24 rounded-md object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{getDisplayText(item.title)}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{formatPrice(item.price)} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        className="w-16 text-center"
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item._id, Number(event.target.value) || 1)}
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item._id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="h-fit p-6">
              <h2 className="mb-5 text-xl font-semibold">Order Summary</h2>
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated Delivery</span>
                <span className="font-medium">{formatPrice(subtotal > 0 ? 120 : 0)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-lg font-bold text-primary">{formatPrice(subtotal + (subtotal > 0 ? 120 : 0))}</span>
                </div>
              </div>
              <Link to="/checkout" className="mt-5 block">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
