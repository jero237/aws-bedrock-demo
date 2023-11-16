import AppCard, { AppCardProps } from "@/components/app-card";
import { ConstructionIcon, LayoutGridIcon, MessageCircleIcon } from "lucide-react";
import React from "react";
import routes from "@/lib/routes";

const apps: AppCardProps[] = [
  {
    page: routes.chat,
    text: "Chat",
    Icon: MessageCircleIcon,
  },
  {
    page: routes.rickroll,
    text: "More apps coming soon",
    Icon: ConstructionIcon,
    target: "_blank",
  },
];

export default function DashboardPage() {
  return (
    <section className="py-4">
      <h1 className="flex gap-2 items-center scroll-m-20 text-2xl font-semibold tracking-tight">
        <LayoutGridIcon />
        Apps
      </h1>
      <div className="flex justify-center sm:justify-normal flex-wrap gap-4 p-6">
        {apps.map((app, i) => (
          <AppCard key={i} {...app} />
        ))}
      </div>
    </section>
  );
}
