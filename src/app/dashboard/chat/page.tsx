import { auth } from "@/auth";
import Chat from "@/components/chat";
import React from "react";

export default async function ChatPage() {
  const session = await auth();

  return (
    <section>
      <Chat session={session} />
    </section>
  );
}
