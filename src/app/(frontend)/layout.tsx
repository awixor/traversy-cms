import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Traversy Indexed",
    template: "%s | Traversy Indexed",
  },
  description:
    "Browse and search Traversy Media tutorials by topic, difficulty, and duration.",
  openGraph: {
    siteName: "Traversy Indexed",
    type: "website",
    images: [{ url: "/og.webp", width: 1280, height: 720, alt: "Traversy Indexed" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
