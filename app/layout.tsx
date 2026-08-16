import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "@fontsource/jetbrains-mono";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://lonut.dev"),
  title: "Ionut Cioncu - QA Engineer",
  description: "Portfolio of Ionut Cioncu, a QA Engineer with 4+ years of experience across Maritime Logistics and Payments at Endava. Experienced in test automation, REST APIs, distributed systems, and AI-assisted engineering.",
  keywords: ["Ionut Cioncu", "QA Engineer", "Endava", "Maritime Logistics", "Payments", "Test Automation", "REST APIs", "PostgreSQL", "Microservices", "Kafka", "Cosmos DB", "Playwright", "Selenium", "Cypress", "LLM Testing", "MCP", "Romania"],
  authors: [{ name: "Ionut Cioncu" }],
  openGraph: {
    title: "Ionut Cioncu - QA Engineer",
    description: "QA Engineer with 4+ years of experience across Maritime Logistics and Payments, working with test automation, APIs, distributed systems, and AI-assisted engineering.",
    type: "website",
    url: "https://lonut.dev",
    siteName: "Ionut Cioncu Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1920,
        height: 1080,
        alt: "Ionut Cioncu - QA Engineer",
      },
    ],
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
