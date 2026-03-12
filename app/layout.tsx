import type { Metadata } from "next";
import { Montserrat, Syne } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LoadingScreen } from "./LoadingScreen";

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

const SITE_URL = "https://plesnicarsolutions.at";

export const metadata: Metadata = {
  title: {
    default: "Plesnicar Solutions – IT & Bau aus Österreich",
    template: "%s | Plesnicar Solutions",
  },
  description:
    "Plesnicar Solutions – IT-Beratung, Grafikdesign, Bau, Hausbetreuung & Handel aus Österreich. Moderne IT trifft 40+ Jahre Bauwesen-Erfahrung. Jetzt anfragen.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_AT",
    url: SITE_URL,
    siteName: "Plesnicar Solutions",
    title: "Plesnicar Solutions – IT & Bau aus Österreich",
    description:
      "IT-Beratung, Grafikdesign, Bau, Hausbetreuung & Handel aus Österreich. Moderne IT trifft 40+ Jahre Bauwesen-Erfahrung.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plesnicar Solutions – IT & Bau aus Österreich",
    description:
      "IT-Beratung, Grafikdesign, Bau, Hausbetreuung & Handel aus Österreich. Moderne IT trifft 40+ Jahre Bauwesen-Erfahrung.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Plesnicar Solutions",
      alternateName: "Boris Plesnicar e.U.",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logos/LogoTEXTB.png`,
        width: 200,
        height: 60,
      },
      email: "plesnicaroffice@gmail.com",
      telephone: "+436644678382",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Hartriegelstraße 12",
        addressLocality: "Langenlois",
        postalCode: "3550",
        addressRegion: "Niederösterreich",
        addressCountry: "AT",
      },
      areaServed: { "@type": "Country", name: "Österreich" },
      sameAs: ["https://www.instagram.com/plesnicarsolutions/"],
      founder: { "@type": "Person", name: "Boris Plesnicar" },
      employee: [
        {
          "@type": "Person",
          name: "Boris Plesnicar",
          jobTitle: "Inhaber – IT-Beratung, Grafikdesign & Bau",
        },
        {
          "@type": "Person",
          name: "Ing. Dietmar Plesnicar",
          jobTitle: "Bau-Beratung, Hausbetreuung & Handel",
          description:
            "Bauingenieur mit über 40 Jahren Erfahrung im Bauwesen",
        },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "Plesnicar Solutions",
      url: SITE_URL,
      image: `${SITE_URL}/logos/LogoTEXTB.png`,
      description:
        "IT-Beratung, Grafikdesign, Bau, Hausbetreuung & Handel aus Langenlois, Österreich. Moderne IT-Lösungen und über 40 Jahre Bauwesen-Erfahrung aus einer Hand.",
      priceRange: "€€",
      telephone: "+436644678382",
      email: "plesnicaroffice@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Hartriegelstraße 12",
        addressLocality: "Langenlois",
        postalCode: "3550",
        addressRegion: "Niederösterreich",
        addressCountry: "AT",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 48.4732,
        longitude: 15.6653,
      },
      areaServed: "AT",
      knowsLanguage: ["de", "en"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Dienstleistungen",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "IT-Beratung & digitale Lösungen",
              description:
                "PC-Bau, Systemeinrichtung, IT-Support und Automatisierungen",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Webdesign & Grafikdesign",
              description:
                "Branding, Corporate Design, Social Media Content und professionelle Webauftritte",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Bau & Hausbetreuung",
              description:
                "Reinigungstätigkeiten, objektbezogene Tätigkeiten und zuverlässige Hausbetreuung",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Handel",
              description:
                "Verkauf von Baustoffen, Zubehör und individuellen Produktlösungen mit kompetenter Beratung",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Plesnicar Solutions",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "de-AT",
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LoadingScreen>{children}</LoadingScreen>
      </body>
    </html>
  );
}
