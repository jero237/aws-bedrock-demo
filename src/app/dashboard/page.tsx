import { auth } from "@/auth";
import Chat from "@/components/chat";
import ChatItem from "@/components/chat-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <section>
      <Chat session={session} />
    </section>
  );
}
