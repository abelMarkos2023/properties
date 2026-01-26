import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navabr from "@/components/Navabr";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import { GlobalContextProvider } from "@/contexts/GlobalContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Property Pulse",
  keywords:' property, real estate, home, house, apartment, rent, buy, sell, listing, next.js, tailwind css, geist ui, property pulse, property pulse app next.js, property pulse app tailwind css, property pulse app geist ui font',
  description: "FInd your dream property with Property Pulse app built using Next.js 15 and Tailwind CSS 3 with Geist UI font integration.",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <GlobalContextProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen `}
      >

        <Navabr />
        <main className="flex-1">
          {children}
        </main>
        <ToastContainer />
        <Footer />
      </body>
    </html>
    </GlobalContextProvider>
    </AuthProvider>
  );
}
