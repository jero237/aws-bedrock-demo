import Link from "next/link";
import React from "react";
import { ChevronLeft } from "lucide-react";
import AuthForm from "@/components/auth-form";
import routes from "@/lib/routes";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function SignInPage() {
  return (
    <main>
      <Link
        href={routes.home}
        className="absolute left-4 top-4 flex items-center z-10"
      >
        <ChevronLeft className="h-4 w-auto" />
        Back
      </Link>
      <section className="flex min-h-screen flex-col items-center justify-center gap-8 -translate-y-12">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Sign In
        </h1>
        <AuthForm />
      </section>
    </main>
  );
}
