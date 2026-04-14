import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/Authcontext";
import { useUserDetails } from "@/hooks/use-catalog";
import { updateUser as updateUserRecord } from "@/lib/catalog-service";
import { FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";

const AdminProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user, profile: authProfile, updateUser, refreshProfile } = useAuth();
  const { data: profile, isLoading } = useUserDetails(user?.email);

  const current = profile || authProfile;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const district = String(formData.get("district") || "").trim();
    const city = String(formData.get("city") || "").trim();
    const zip = String(formData.get("zip") || "").trim();
    const details = String(formData.get("address") || "").trim();

    if (!current?._id) {
      toast({
        title: "Profile not ready",
        description: "Please refresh and try again.",
        variant: "destructive",
      });
      return;
    }

    await updateUserRecord(current._id, {
      ...current,
      name,
      phone,
      address: {
        district,
        city,
        zip,
        details,
      },
    });

    if (user && name) {
      await updateUser(user, name);
    }

    await refreshProfile();
    await queryClient.invalidateQueries({ queryKey: ["user-details", user?.email] });

    toast({
      title: "Admin profile updated",
      description: "Your admin profile was saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-bold text-foreground">Admin Profile</h1>
          <Badge variant="default">Admin</Badge>
        </div>
        <p className="text-muted-foreground mb-8">Update your admin account information.</p>

        {isLoading ? (
          <div className="py-20 text-center text-muted-foreground">Loading profile...</div>
        ) : (
          <Card className="p-6 max-w-3xl">
            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" defaultValue={current?.name || user?.displayName || ""} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" defaultValue={current?.email || user?.email || ""} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" defaultValue={current?.phone || ""} />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input id="district" name="district" defaultValue={current?.address?.district || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" defaultValue={current?.address?.city || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP</Label>
                  <Input id="zip" name="zip" defaultValue={current?.address?.zip || ""} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address Details</Label>
                <Input id="address" name="address" defaultValue={current?.address?.details || ""} />
              </div>

              <Button type="submit">Save Admin Profile</Button>
            </form>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminProfile;
