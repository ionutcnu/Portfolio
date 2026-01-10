import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "@fontsource/jetbrains-mono";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

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
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body className="font-mono antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <div className="mx-auto flex min-h-screen max-w-[90%] flex-col md:max-w-[80%]">
            <Navigation />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
