"use client";
import React from "react";
import ChatItem from "./chat-item";
import { Input, TextArea } from "./ui/input";
import { Button } from "./ui/button";
import { Session } from "next-auth";
import { Message, sendLamaPrompt } from "@/actions/chat";
import { nanoid } from "nanoid";
import { ArrowUpIcon, Loader2, Trash } from "lucide-react";
import CustomAlertDialog from "./alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

const MAX_INPUT_LENGTH = 250;

export default function Chat({ session }: { session: Session | null }) {
  const bottomRef = React.useRef<null | HTMLDivElement>(null);
  const inputRef = React.useRef<null | HTMLTextAreaElement>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState<string>("");
  const [loadingNewMessage, setLoadingNewMessage] =
    React.useState<boolean>(false);

  const handleInputChange = (e: any) => {
    if (e.target.value.length > MAX_INPUT_LENGTH) return;
    setInput(e.target.value);
    adjustInputSize();
  };

  const adjustInputSize = (reset?: boolean) => {
    const inputElement = inputRef.current;
    if (!inputElement) return;

    // Reset the element's height to auto before calculating the scroll height
    inputElement.style.height = "3.5rem";
    if (reset) return;
    inputElement.style.height = `${inputElement.scrollHeight}px`;
  };

  const saveMessages = async (messages: Message[]) => {
    localStorage.setItem("messages", JSON.stringify(messages));
  };

  React.useEffect(() => {
    const savedMessages = localStorage.getItem("messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendUserMessage = async (e: any, message: string) => {
    e.preventDefault();
    if(!message) return;
    setInput("");
    adjustInputSize(true);
    setLoadingNewMessage(true);
    const newMessage: Message = {
      issuer: "user",
      text: message,
      key: nanoid(),
      time: format(new Date(), "p"),
    };

    setMessages([...messages, newMessage]);
    saveMessages([...messages, newMessage]);
    const response = await sendLamaPrompt([...messages, newMessage]);
    const responseMessage: Message = {
      issuer: "bedrock",
      text: response.generation,
      key: nanoid(),
      time: format(new Date(), "p"),
    };

    setMessages([...messages, newMessage, responseMessage]);
    saveMessages([...messages, newMessage, responseMessage]);
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
        {messages.map((message) => (
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
      <form onSubmit={(e) => sendUserMessage(e, input)} className="relative">
        <div className="relative flex-1">
          <TextArea
            ref={inputRef}
            placeholder="Type a message..."
            value={input}
            autoFocus
            onChange={handleInputChange}
            className="py-4 h-14 pl-14 pr-24 overflow-hidden resize-none"
          />
          <p className="absolute bottom-5 right-14 text-xs">
            {input.length}/{MAX_INPUT_LENGTH}
          </p>
        </div>
        <Button
          className="absolute bottom-2 right-2"
          disabled={loadingNewMessage}
          type="submit"
          size="icon"
        >
          <ArrowUpIcon className="h-4 w-auto" />
        </Button>
        <CustomAlertDialog
          action={clearChat}
          description="This will permanently delete your chat history."
          title="Are you absolutely sure?"
          trigger={
            <Button
              size={"icon"}
              variant={"secondary"}
              disabled={loadingNewMessage}
              className="absolute bottom-2 left-2"
            >
              <Trash className="h-4 w-auto" />
            </Button>
          }
        />
      </form>
    </div>
  );
}
