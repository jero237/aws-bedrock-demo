import { auth } from "@/auth";
import Header from "@/components/header";
import routes from "@/lib/routes";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    return redirect(routes.login);
  }

  return (
    <>
      <Header session={session} />
      <main className="container min-h-full-header">{children}</main>
    </>
  );
}
