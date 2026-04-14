import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/Authcontext";
import { useCart } from "@/context/CartContext";
import { useUserDetails } from "@/hooks/use-catalog";
import { addOrder, createUser, getText, updateUser } from "@/lib/catalog-service";
import { formatPrice } from "@/lib/catalog-ui";
import { AlertCircle } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { cart, subtotal, clearCart } = useCart();
  const { data: profile } = useUserDetails(user?.email);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(profile?.address?.district || "");

  useEffect(() => {
    setSelectedDistrict(profile?.address?.district || "");
  }, [profile?.address?.district]);

  const deliveryCharge = selectedDistrict.trim().toLowerCase() === "dhaka" ? 60 : 120;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const mail = String(formData.get("mail") || "");
    const phone = String(formData.get("phone") || "");
    const district = String(formData.get("district") || "").trim();
    const city = String(formData.get("city") || "");
    const zip = String(formData.get("zip") || "");
    const address = String(formData.get("address") || "");

    if (!name || !mail || !phone || !district || !city || !zip || !address) {
      setError("Please fill all fields before confirming order.");
      return;
    }

    setLoading(true);

    const orders = cart.map((item) => ({
      bookId: item._id,
      title: item.title,
      items: item.quantity,
      price: item.price,
    }));

    const orderPayload = {
      name,
      mail,
      fullAddress: {
        district,
        city,
        zip,
        moreDetails: address,
      },
      phone,
      orders,
      deliveryCharge: district.toLowerCase() === "dhaka" ? 60 : 120,
      status: "pending",
    };

    try {
      await addOrder(orderPayload);

      if (profile?._id) {
        await updateUser(profile._id, {
          ...profile,
          name,
          phone,
          address: {
            district,
            city,
            zip,
            details: address,
          },
        });
      } else {
        await createUser({
          name,
          email: mail,
          role: "user",
          address: {
            district,
            city,
            zip,
            details: address,
          },
          phone,
        });
      }

      clearCart();
      toast({
        title: "Order confirmed",
        description: "Your order has been saved successfully.",
      });

      navigate("/");
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to place order right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-10">
        <h1 className="mb-3 text-4xl font-bold text-foreground">Confirm Order</h1>
        <p className="mb-8 text-muted-foreground">Order data follows your previous project schema and collection shape.</p>

        {cart.length === 0 ? (
          <Card className="py-20 text-center">
            <p className="mb-4 text-muted-foreground">Your cart has no items to checkout.</p>
            <Link to="/books">
              <Button>Go to Books</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <Card className="h-fit p-6">
              <h2 className="mb-5 text-xl font-semibold">Order Summary</h2>
              <div className="max-h-80 space-y-4 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-start gap-3">
                    <img src={item.thumb} alt={getText(item.title, 1)} className="h-20 w-16 rounded-md object-cover" />
                    <div className="flex-1">
                      <p className="line-clamp-2 text-sm font-medium">{getText(item.title, 1)}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-2 border-t pt-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{formatPrice(deliveryCharge)}</span>
                </div>
                <div className="flex items-center justify-between border-t pt-2 text-base font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(subtotal + deliveryCharge)}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="mb-5 text-xl font-semibold">Billing Address</h2>
              <form className="space-y-4" onSubmit={onSubmit}>
                {error ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : null}

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" defaultValue={profile?.name || user?.displayName || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mail">Email</Label>
                    <Input id="mail" name="mail" defaultValue={profile?.email || user?.email || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" defaultValue={profile?.phone || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      name="district"
                      value={selectedDistrict}
                      onChange={(event) => setSelectedDistrict(event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" defaultValue={profile?.address?.city || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" name="zip" defaultValue={profile?.address?.zip || ""} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address Details</Label>
                    <Input id="address" name="address" defaultValue={profile?.address?.details || ""} />
                  </div>
                </div>

                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? "Confirming..." : "Confirm Order"}
                </Button>
              </form>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
