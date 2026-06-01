import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/app/providers/theme-provider";

import { cn } from "@/app/lib/utils";
import { Container } from "@/app/components/ui/container";
import { Header } from "@/app/components/ui/header";
import { Main } from "@/app/components/ui/main";
import { Footer } from "@/app/components/ui/footer";

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
    <html
      lang="pt-br"
      suppressHydrationWarning
      className={cn(jetBrainsMono.className, "antialiased")}
    >
      <body>
        <ThemeProvider>
          <Container>
            <Header />
            <Main>{children}</Main>
            <Footer />
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
