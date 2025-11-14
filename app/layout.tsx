import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Ionut - Full Stack Developer Portfolio",
  description: "Portfolio of Ionut - Full Stack Developer from Romania. Specializing in TypeScript, React, Next.js, Python, and AI automation.",
  keywords: ["Ionut", "Full Stack Developer", "TypeScript", "React", "Next.js", "Python", "AI", "Portfolio"],
  authors: [{ name: "Ionut" }],
  openGraph: {
    title: "Ionut - Full Stack Developer Portfolio",
    description: "Portfolio showcasing projects in web development, AI automation, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
