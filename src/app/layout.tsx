import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import { Providers } from "./providers";
import RootClient from "./RootClient";
import Footer from "./components/Footer/Footer";
import { ToastProvider } from "./ui/toast/ToastProvider";
import LayoutWrapper from "./components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "भारत भारती ट्रस्ट | राष्ट्रीय एकात्मता को समर्पित",
  description: "Bharat Bharati Trust",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootClient>
          <Providers>
            <ToastProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </ToastProvider>
          </Providers>
        </RootClient>
      </body>
    </html>
  );
}
