import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RealityProvider } from "./components/RealityProvider";
import { SettingsProvider } from "./components/SettingsContext";
import dynamic from "next/dynamic";
const UIcareToolbar = dynamic(
  () => import("./components/UIcareToolbar").then(mod => mod.UIcareToolbar),
  { ssr: false }
);

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "UICare - Enhancing User Interfaces with Wellness in Mind",
  description: "A project dedicated to integrating neurodivergent-friendly features into web applications.",
  icons: {
    icon: '/app-icon.svg',
    apple: '/app-icon.svg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-gradient-to-br from-background to-background/95 text-foreground min-h-screen">
        <SettingsProvider>
          <RealityProvider>
            <div className="relative">
              {children}
              <UIcareToolbar />
            </div>
          </RealityProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
