import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import routes from "@/lib/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import Balancer from "react-wrap-balancer";

export default async function HomePage() {
  const session = await auth();
  return (
    <section className="gap-2 flex flex-col items-center pt-56 min-h-full-header">
      <img
        src="https://community.aws/_next/image?url=https%3A%2F%2Fcommunity.aws%2Fraw-post-images%2Fposts%2Famazon-bedrock-developing-java-applications%2Fimages%2FArch_Amazon-Bedrock_64-5x.png&w=3840&q=75"
        alt="Logo"
        className="h-20 w-20 rounded shadow"
      />
      <div className="text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          <Balancer>AWS Bedrock Chat</Balancer>
        </h1>
        <p className="text-xl text-muted-foreground">
          <Balancer>A ChatGPT like application built with AWS Bedrock</Balancer>
        </p>
      </div>
      <Link
        href={session ? routes.dashboard : routes.login}
        className={cn(buttonVariants(), "w-48")}
      >
        {session ? "Start Chatting" : "Start"}
      </Link>
    </section>
  );
}
