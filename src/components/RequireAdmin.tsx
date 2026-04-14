import { useAuth } from "@/context/Authcontext";
import { LoaderCircle } from "lucide-react";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-2 text-muted-foreground">
        <LoaderCircle className="h-5 w-5 animate-spin" />
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
