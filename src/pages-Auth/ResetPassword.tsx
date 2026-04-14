import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import AuthShell from "@/components/AuthShell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/Authcontext";
import { getAuthErrorMessage } from "@/lib/auth";

const resetSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Enter a valid email address."),
});

type ResetValues = z.infer<typeof resetSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { resetPassword } = useAuth();

  const form = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({ email }: ResetValues) => {
    try {
      await resetPassword(email);
      toast({
        title: "Reset email sent",
        description: "Please check your email inbox for password reset instructions.",
      });
      navigate("/sign-in", { replace: true });
    } catch (error) {
      form.setError("root", {
        message: getAuthErrorMessage(error),
      });
    }
  };

  return (
    <AuthShell
      badge="Reset"
      title="Reset your password"
      description="Enter your account email and we will send you password reset instructions."
      helperText="Remembered your password?"
      helperLinkLabel="Sign in"
      helperLinkTo="/sign-in"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {form.formState.errors.root?.message ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
            </Alert>
          ) : null}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" autoComplete="email" {...field} />
                </FormControl>
                <FormDescription>This must be the email used with your account.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Back to{" "}
            <Link to="/sign-in" className="font-semibold text-primary hover:text-primary/80">
              Sign In
            </Link>
          </p>
        </form>
      </Form>
    </AuthShell>
  );
};

export default ResetPassword;
