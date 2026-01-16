// src/app/(site)/layout.tsx
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ToastContainer } from "@/components/ui/toast-container";
import { StoreHydration } from "@/providers/store-hydration";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <StoreHydration />
      <Header />
      <main className="w-full max-w-6xl mx-auto p-6">{children}</main>
      <Footer />
      <ToastContainer />
    </div>
  );
}