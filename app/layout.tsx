import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "@fontsource/jetbrains-mono";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://lonut.dev"),
  title: "Ionut Cioncu - QA Tester",
  description: "Portfolio of Ionut Cioncu - QA Tester with 4 years of experience in Naval Shipping and Payments domains at Endava PLC. Based in Pitesti, Romania.",
  keywords: ["Ionut Cioncu", "QA Tester", "Endava", "REST API Testing", "Postman", "PostgreSQL", "Kubernetes", "Azure", "Selenium", "Cypress", "Romania"],
  authors: [{ name: "Ionut Cioncu" }],
  openGraph: {
    title: "Ionut Cioncu - QA Tester",
    description: "Product-minded QA professional with 4 years of multi-domain experience in Naval Shipping and Payments domains.",
    type: "website",
    url: "https://lonut.dev",
    siteName: "Ionut Cioncu Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1920,
        height: 1080,
        alt: "Ionut Cioncu - QA Tester",
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
