import type { Metadata } from "next";
import { Montserrat, Permanent_Marker } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const marker = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-marker" });

export const metadata: Metadata = {
  title: "MoFaya Campus Marketers",
  description:
    "Ignite your mind. Fuel your ambition. Explore the MoFaya flavour range and apply to become a MoFaya Campus Marketer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${marker.variable}`}>
      <body>{children}</body>
    </html>
  );
}
