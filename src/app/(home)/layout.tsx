import { auth } from "@/auth";
import Header from "@/components/header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <Header session={session} />
      <main className="min-h-full-header">{children}</main>
    </>
  );
}
