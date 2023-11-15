import { cn } from "@/lib/utils";
import { AvatarFallback, Avatar, AvatarImage } from "./ui/avatar";
import { Loader2, LoaderIcon } from "lucide-react";
import { Message } from "@/actions/chat";
import { format } from "date-fns";

export default function ChatItem({
  message,
  userImage,
}: {
  message: Message;
  userImage?: string | null;
}) {
  const selectBg = (issuer: "user" | "bedrock") => {
    if (issuer === "user") {
      return "bg-background";
    }
    return "bg-muted";
  };

  const selectImg = (issuer: "user" | "bedrock") => {
    if (issuer === "user") {
      return userImage || undefined;
    }
    return "https://a.b.cdn.console.awsstatic.com/a/v1/Q76H4JHCIPTI32AHW4THJ2XKJCDJ7VBSHF4JPOONLGRCGQCHRBTA/images/playground/chat-model.svg";
  };

  return (
    <div
      className={cn(
        selectBg(message.issuer),
        "min-h-[4rem] border-b flex flex-col justify-center p-4"
      )}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage alt="Picture" src={selectImg(message.issuer)} />
            <AvatarFallback>
              <Loader2 className="h-6 w-6 animate-spin stroke-slate-300" />
            </AvatarFallback>
          </Avatar>
          <h3 className="scroll-m-20 text-sm font-semibold tracking-tight">
            {message.issuer === "user" ? "You" : "AWS Bedrock"}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">{message.time}</p>
      </div>
      <p className="text-sm whitespace-pre-line">{message.text}</p>
    </div>
  );
}
