import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

export interface AppCardProps {
  page: string;
  text: string;
  Icon: LucideIcon;
  target?: HTMLAttributeAnchorTarget;
}

export default function AppCard({ page, text, Icon, target }: AppCardProps) {
  return (
    <Link href={page} target={target ?? "_self"}>
      <div className="group bg-card p-6 border rounded flex flex-col items-center justify-center w-60 h-60 hover:shadow transition-all">
        <Icon strokeWidth={2} className="stroke-card-foreground h-12 w-auto group-hover:h-16 transition-all" />
        <p className="text-lg font-semibold text-center">{text}</p>
      </div>
    </Link>
  );
}
