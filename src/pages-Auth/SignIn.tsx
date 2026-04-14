import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

import AuthShell from "@/components/AuthShell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/Authcontext";
import { getAuthErrorMessage } from "@/lib/auth";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean().default(false),
});

type SignInValues = z.infer<typeof signInSchema>;

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signInWithGoogle, user, loading, refreshProfile } = useAuth();
  const [submitError, setSubmitError] = useState("");
  const from = (location.state as { from?: { pathname?: string } } | undefined)?.from?.pathname || "/";

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [from, loading, navigate, user]);

  const onSubmit = async ({ email, password }: SignInValues) => {
    setSubmitError("");

    try {
      await signIn(email, password);
      await refreshProfile();

      toast({
        title: "Signed in successfully",
        description: "Welcome back to Maktabatul Amzad.",
      });

      navigate(from, { replace: true });
    } catch (error) {
      setSubmitError(getAuthErrorMessage(error));
    }
  };

  const onGoogleSignIn = async () => {
    setSubmitError("");

    try {
      await signInWithGoogle();
      await refreshProfile();
      toast({
        title: "Signed in successfully",
        description: "Welcome back to Maktabatul Amzad.",
      });
      navigate(from, { replace: true });
    } catch (error) {
      setSubmitError(getAuthErrorMessage(error));
    }
  };

  return (
    <AuthShell
      badge="Sign In"
      title="Sign in to your account"
      description="Access your saved reading journey, manage your account, and continue exploring the collection."
      helperText="New here?"
      helperLinkLabel="Create an account"
      helperLinkTo="/sign-up"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {submitError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          ) : null}

          <div className="grid gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" autoComplete="email" {...field} />
                  </FormControl>
                  <FormDescription>Use the email connected to your Maktabatul Amzad account.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-3">
                    <FormLabel>Password</FormLabel>
                    <div className="flex items-center gap-3 text-sm">
                      <Link to="/reset-password" className="font-medium text-primary hover:text-primary/80">
                        Forgot password?
                      </Link>
                      <Link to="/sign-up" className="font-medium text-primary hover:text-primary/80">
                        Need an account?
                      </Link>
                    </div>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl bg-muted/60 px-4 py-3">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1">
                    <FormLabel className="text-sm font-medium text-foreground">Remember this device</FormLabel>
                    <FormDescription className="text-xs">
                      Keep your account signed in on this browser.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <Button type="button" variant="outline" size="lg" className="w-full" onClick={onGoogleSignIn}>
            Continue with Google
          </Button>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">Account Help</span>
              <Separator className="flex-1" />
            </div>

            <p className="text-center text-sm leading-6 text-muted-foreground">
              Need to get started first?{" "}
              <Link to="/sign-up" className="font-semibold text-primary hover:text-primary/80">
                Create a new account
              </Link>{" "}
              and keep your book discovery organized.
            </p>
          </div>
        </form>
      </Form>
    </AuthShell>
  );
};

export default SignIn;
