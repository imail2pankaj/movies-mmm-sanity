import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "MMM : Movie - Magic - Mania",
  description: "MMM : Movie - Magic - Mania",
  template: '%s | MMM : Movie - Magic - Mania',
  default: 'MMM : Movie - Magic - Mania',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background font-sans ${fontSans.variable} antialiased`}
      >
        <div className="flex flex-col min-h-[100dvh]">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
