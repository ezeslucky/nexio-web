import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexio — Your Knowledge. Your Canvas. Your Intelligence.",
  description:
    "Nexio unifies knowledge, creativity, presentations, and AI automation in one powerful workspace. Think freely, connect ideas, and turn complex workflows into intelligent systems.",
  keywords: [
    "Nexio",
    "infinite canvas",
    "knowledge operating system",
    "AI automation",
    "node-based workflows",
    "visual workspace",
    "local-first",
    "open source",
    "Notion alternative",
    "Miro alternative",
    "n8n alternative",
  ],
  openGraph: {
    title: "Nexio — Your Knowledge. Your Canvas. Your Intelligence.",
    description:
      "One infinite canvas. Your entire knowledge system. AI workflows that actually do the work.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5"
        />
      </head>
      <body className="min-h-screen bg-[#0c0a09] text-[#fafaf9] selection:bg-indigo-600/40 selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
