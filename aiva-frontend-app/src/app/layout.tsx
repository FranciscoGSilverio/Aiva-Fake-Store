import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Fake Store",
  description: "Fake Store - A simple e-commerce application",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          <Toaster />
          <main className="bg-gradient-to-br">{children}</main>{" "}
        </Providers>
      </body>
    </html>
  );
}
