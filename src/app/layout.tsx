import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Marquee from "./components/Marquee";
import ToastProvider from "./components/ToastProvider";

const notoSerifMono = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifMono.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="bg-gray-100">
          <Marquee />
          {children}
          <ToastProvider />
        </main>
        <Footer />
      </body>
    </html>
  );
}
