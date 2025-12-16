import { Header } from "@/components/layout/header";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className="w-full max-w-6xl mx-auto p-6">{children}</main>
    </div>
  );
}
