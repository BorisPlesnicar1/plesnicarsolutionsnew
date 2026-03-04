import type { Metadata } from "next";
import { Montserrat, Syne } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
});

const whiteDream = localFont({
  src: "../public/WhiteDreamPERSONALUSEONLY-Regular.otf",
  variable: "--font-whitedream",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Plesnicar Solutions - IT & Bau",
  description:
    "Österreichisches Kleinunternehmen für IT-Beratung, digitale Lösungen, Grafikdesign, Bau/Hausbetreuung und Handel. Schnell, zuverlässig, modern.",
  keywords:
    "IT Beratung, Grafikdesign, Hausbetreuung, digitale Lösungen, Österreich, Boris Plesnicar",
  metadataBase: new URL("https://plesnicarsolutions.at"),
  openGraph: {
    type: "website",
    locale: "de_AT",
    url: "https://plesnicarsolutions.at",
    siteName: "Plesnicar Solutions",
    title: "Plesnicar Solutions - IT & Bau",
    description:
      "IT-Beratung, PC-Bau, Grafikdesign sowie Bau- und Hausbetreuung aus einer Hand in Österreich.",
    images: [
      {
        url: "/logos/LogoTEXTB.png",
        width: 1200,
        height: 630,
        alt: "Plesnicar Solutions - IT & Bau",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plesnicar Solutions - IT & Bau",
    description:
      "IT-Beratung, PC-Bau, Grafikdesign sowie Bau- und Hausbetreuung aus einer Hand in Österreich.",
    images: ["/logos/LogoTEXTB.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "48x48", type: "image/png" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body
        className={`${montserrat.variable} ${whiteDream.variable} ${syne.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
