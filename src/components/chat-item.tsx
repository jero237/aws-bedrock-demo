import { cn } from "@/lib/utils";
import { AvatarFallback, Avatar, AvatarImage } from "./ui/avatar";
import { Loader2, LoaderIcon } from "lucide-react";

export default function ChatItem({
  issuer,
  text,
  userImage,
}: {
  issuer: "user" | "bedrock";
  text: string;
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
        selectBg(issuer),
        "min-h-[4rem] border-b flex flex-col justify-center p-4"
      )}
    >
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          <AvatarImage alt="Picture" src={selectImg(issuer)} />
          <AvatarFallback>
            <Loader2 className="h-6 w-6 animate-spin stroke-slate-300" />
          </AvatarFallback>
        </Avatar>
        <h3 className="scroll-m-20 text-sm font-semibold tracking-tight">{issuer === "user" ? "You" : "AWS Bedrock"}</h3>
      </div>
        <p className="text-sm">{text}</p>
    </div>
  );
}
