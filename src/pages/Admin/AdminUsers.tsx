import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useUsers } from "@/hooks/use-catalog";
import { updateUser } from "@/lib/catalog-service";
import { useQueryClient } from "@tanstack/react-query";

const AdminUsers = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: users = [], isLoading } = useUsers();

  const onRoleChange = async (user: any, role: string) => {
    await updateUser(user._id, { ...user, role });
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["users"] }),
      queryClient.invalidateQueries({ queryKey: ["user-details", user.email] }),
      queryClient.invalidateQueries({ queryKey: ["collection-counts"] }),
    ]);
    toast({
      title: "User updated",
      description: `${user.email} is now ${role}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-foreground mb-2">Admin Users</h1>
        <p className="text-muted-foreground mb-8">Manage user roles and account access.</p>

        {isLoading ? (
          <div className="py-20 text-center text-muted-foreground">Loading users...</div>
        ) : users.length > 0 ? (
          <div className="space-y-4">
            {users.map((user) => (
              <Card key={user._id} className="p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="font-semibold">{user.name || "Unnamed User"}</h2>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">Current role: {user.role || "user"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={user.role === "user" ? "default" : "outline"}
                      onClick={() => onRoleChange(user, "user")}
                    >
                      User
                    </Button>
                    <Button
                      size="sm"
                      variant={user.role === "admin" ? "default" : "outline"}
                      onClick={() => onRoleChange(user, "admin")}
                    >
                      Admin
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-20 text-center text-muted-foreground">No users found.</Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminUsers;
