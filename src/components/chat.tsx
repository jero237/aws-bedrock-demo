"use client";
import React, { useEffect } from "react";
import ChatItem from "./chat-item";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Session } from "next-auth";
import { Message, sendLamaPrompt } from "@/actions/chat";
import { nanoid } from "nanoid";
import { Loader2, Trash } from "lucide-react";
import CustomAlertDialog from "./alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";



const MAX_INPUT_LENGTH = 100;

export default function Chat({ session }: { session: Session | null }) {
  const bottomRef = React.useRef<null | HTMLDivElement>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState<string>("");
  const [loadingNewMessage, setLoadingNewMessage] =
    React.useState<boolean>(false);

  const handleInputChange = (e: any) => {
    if (e.target.value.length > MAX_INPUT_LENGTH) return;
    setInput(e.target.value);
  }

  const loadMessages = async (message: string) => {
    const savedMessages = localStorage.getItem("messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  };

  const saveMessages = async (messages: Message[]) => {
    localStorage.setItem("messages", JSON.stringify(messages));
  };

  React.useEffect(() => {
    loadMessages("");
  }, []);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendUserMessage = async (e: any, message: string) => {
    e.preventDefault();
    setLoadingNewMessage(true);
    setInput("");
    const newMessage: Message = {
      issuer: "user",
      text: message,
      key: nanoid(),
      time: format(new Date(), 'p') 
    };

    setMessages([...messages, newMessage]);
    saveMessages([...messages, newMessage]);
    const response = await sendLamaPrompt([...messages, newMessage]);
    const newMessage2: Message = {
      issuer: "bedrock",
      text: response.generation,
      key: nanoid(),
      time: format(new Date(), 'p') 
    };

    setMessages([...messages, newMessage, newMessage2]);
    saveMessages([...messages, newMessage, newMessage2]);
    setLoadingNewMessage(false);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("messages");
  };

  return (
    <div className="overflow flex flex-col gap-4 h-full-header pt-4 pb-8">
      <div className="flex justify-between items-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Chat
        </h3>
        <Select defaultValue="llama2">
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="llama2">meta.llama2-13b-chat-v1</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="border rounded flex-1 overflow-y-scroll">
        {messages.map((message, index) => (
          <ChatItem
            key={message.key}
            message={message}
            userImage={session?.user?.image}
          />
        ))}
        <div ref={bottomRef}></div>
        {loadingNewMessage && (
          <div className="flex justify-center items-center h-12">
            <Loader2 className="h-8 w-8 animate-spin stroke-primary" />
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => sendUserMessage(e, input)}
        className="flex items-center gap-1"
      >
        <div className="relative flex-1">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={handleInputChange}
          />
          <p className="absolute top-2 right-3">{input.length}/{MAX_INPUT_LENGTH}</p>
        </div>
        <Button className="flex" type="submit">
          Send
        </Button>
        <CustomAlertDialog
          action={clearChat}
          description="This will permanently delete your chat history."
          title="Are you absolutely sure?"
          trigger={
            <Button size={"icon"} variant={"secondary"}>
              <Trash className="h-4 w-4" />
            </Button>
          }
        />
      </form>
    </div>
  );
}
