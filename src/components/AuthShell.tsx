import type { ReactNode } from "react";

import logo from "@/assets/logo.png";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

type AuthShellProps = {
  badge: string;
  title: string;
  description: string;
  helperText: string;
  helperLinkLabel: string;
  helperLinkTo: string;
  children: ReactNode;
};

const benefits = [
  "Track your favorite books and authors in one place",
  "Get faster checkout and saved account details",
  "Receive updates about featured collections and new arrivals",
];

const AuthShell = ({
  badge,
  title,
  description,
  helperText,
  helperLinkLabel,
  helperLinkTo,
  children,
}: AuthShellProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_hsl(var(--primary)/0.18),_transparent_45%),radial-gradient(circle_at_top_right,_hsl(var(--gold)/0.16),_transparent_35%)]" />

        <section className="container relative py-14 md:py-20">
          <div className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_minmax(0,520px)]">
            <div className="relative overflow-hidden rounded-[32px] bg-dark p-8 text-white shadow-2xl md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.28),_transparent_35%)]" />

              <div className="relative flex h-full flex-col justify-between gap-10">
                <div className="space-y-6">
                  <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium uppercase tracking-[0.2em] text-gold">
                    {badge}
                  </div>

                  <img src={logo} alt="Maktabatul Amzad" className="h-16 w-auto brightness-0 invert" />

                  <div className="space-y-4">
                    <h1 className="max-w-xl text-4xl font-bold leading-tight md:text-5xl">
                      Welcome to a calmer, richer reading journey.
                    </h1>
                    <p className="max-w-2xl text-base leading-7 text-white/80 md:text-lg">
                      Join Maktabatul Amzad to browse treasured Islamic literature, follow trusted writers, and keep
                      your reading experience connected across the store.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {benefits.map((benefit, index) => (
                    <div
                      key={benefit}
                      className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
                    >
                      <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gold/90">
                        0{index + 1}
                      </div>
                      <p className="text-sm leading-6 text-white/80">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Card className="border-primary/10 bg-white/95 shadow-xl backdrop-blur-sm">
              <CardHeader className="space-y-3">
                <div className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {badge}
                </div>
                <CardTitle className="text-3xl text-dark">{title}</CardTitle>
                <CardDescription className="text-base leading-7">{description}</CardDescription>
                <p className="text-sm text-muted-foreground">
                  {helperText}{" "}
                  <Link to={helperLinkTo} className="font-semibold text-primary transition-colors hover:text-primary/80">
                    {helperLinkLabel}
                  </Link>
                </p>
              </CardHeader>
              <CardContent>{children}</CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AuthShell;
