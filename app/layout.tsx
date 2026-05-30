import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { cn } from "@/app/lib/utils";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arison's Portfolio",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={cn(jetBrainsMono.className, "antialiased")}>
      <body>{children}</body>
    </html>
  );
}
