import type { Metadata } from "next";
import "./globals.css";
import { NavigationBar } from "src/components/NavigationBar/NavigationBar";
import { Providers } from "@/providers";
import { SimpleConfirmationModal } from "@/components/SimpleConfirmationModal/SimpleConfirmationModal";
import { Montserrat } from "next/font/google";

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
          <SimpleConfirmationModal />
          <NavigationBar />
          <main className="max-w-[90vw] mx-auto">{children}</main>{" "}
        </Providers>
      </body>
    </html>
  );
}
