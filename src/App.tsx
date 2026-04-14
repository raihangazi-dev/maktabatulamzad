import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import RequireAdmin from "@/components/RequireAdmin";
import RequireAuth from "@/components/RequireAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import { CartProvider } from "./context/CartContext";
import Index from "./pages/Index";
import BookDetails from "./pages/BookDetails";
import Authors from "./pages/Authors";
import AuthorDetails from "./pages/AuthorDetails";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Books from "./pages/catalog/Books";
import CategoryDetailsPage from "./pages/catalog/CategoryDetailsPage";
import CategoriesPage from "./pages/catalog/CategoriesPage";
import PublisherDetailsPage from "./pages/catalog/PublisherDetailsPage";
import PublishersPage from "./pages/catalog/PublishersPage";
import CartPage from "./pages/catalog/CartPage";
import CheckoutPage from "./pages/catalog/CheckoutPage";
import SignIn from "./pages-Auth/SignIn";
import ResetPassword from "./pages-Auth/ResetPassword";
import SignUp from "./pages-Auth/SignUp";
import UserProfile from "./pages/Users/UserProfile";
import UserOrders from "./pages/Users/UserOrders";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminCatalogCrud from "./pages/Admin/AdminCatalogCrud";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminProfile from "./pages/Admin/AdminProfile";
import AdminUsers from "./pages/Admin/AdminUsers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/books" element={<Books />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/writers" element={<Authors />} />
              <Route path="/writer/:id" element={<AuthorDetails />} />
              <Route path="/writers/:id" element={<AuthorDetails />} />
              <Route path="/publishers" element={<PublishersPage />} />
              <Route path="/publishers/:id" element={<PublisherDetailsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:id" element={<CategoryDetailsPage />} />
              <Route path="/category" element={<CategoriesPage />} />
              <Route path="/category/:id" element={<CategoryDetailsPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route
                path="/user/profile"
                element={
                  <RequireAuth>
                    <UserProfile />
                  </RequireAuth>
                }
              />
              <Route
                path="/user/orders"
                element={
                  <RequireAuth>
                    <UserOrders />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <RequireAdmin>
                    <AdminDashboard />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <RequireAdmin>
                    <AdminOrders />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/catalog"
                element={
                  <RequireAdmin>
                    <AdminCatalogCrud />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/profile"
                element={
                  <RequireAdmin>
                    <AdminProfile />
                  </RequireAdmin>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <RequireAdmin>
                    <AdminUsers />
                  </RequireAdmin>
                }
              />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
