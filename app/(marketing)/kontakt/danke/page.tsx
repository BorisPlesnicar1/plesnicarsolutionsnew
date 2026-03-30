import type { Metadata } from "next";
import { KontaktDankePage } from "./kontakt-danke-page";

const SITE = "https://plesnicarsolutions.at";

export const metadata: Metadata = {
  title: "Danke",
  description: "Ihre Nachricht wurde gesendet. Plesnicar Solutions meldet sich bald.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/kontakt/danke" },
  openGraph: {
    title: "Danke | Plesnicar Solutions",
    url: `${SITE}/kontakt/danke`,
  },
};

export default function Page() {
  return <KontaktDankePage />;
}
