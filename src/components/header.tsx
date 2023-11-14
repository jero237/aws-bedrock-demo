import React from "react";
import { SWLogo } from "@/assets/logos";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import routes from "@/lib/routes";
import { Session } from "next-auth";
import UserAccountNav from "./user-account-nav";
import { ThemeToggle } from "./theme-toggle";

export default function Header({ session }: { session: Session | null }) {
  return (
    <header className="h-header border-b container flex justify-between items-center">
      <Link href={routes.home}>
        <SWLogo className="h-12 w-auto" />
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {session ? (
          <UserAccountNav user={session.user!} />
        ) : (
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={routes.login}
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
