import type { Metadata } from "next";
import localFont from "next/font/local";
import { wedding } from "../config/wedding";
import "./globals.css";

const script = localFont({ src: "./fonts/pinyon-script.woff2", variable: "--font-script", display: "swap" });
const display = localFont({ src: "./fonts/cormorant-garamond.woff2", variable: "--font-display", display: "swap", weight: "400 700" });
const body = localFont({ src: "./fonts/dm-sans.woff2", variable: "--font-body", display: "swap", weight: "400 700" });

const title = wedding.names.join(" weds ");
const description = "An invitation to the wedding of " + wedding.names.join(" and ") + ".";
const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const previewImage = {
  url: "/art/harsha-weds-abhilash-preview.png",
  width: 954,
  height: 1649,
  type: "image/png",
  alt: "Illustrated wedding invitation cover with a floral border and a portrait of Harsha and Abhilash",
};

export const metadata: Metadata = {
  metadataBase: new URL(deploymentHost ? `https://${deploymentHost}` : "http://localhost:3000"),
  title,
  description,
  openGraph: { type: "website", url: "/", title, description, images: [previewImage] },
  twitter: { card: "summary_large_image", title, description, images: [previewImage] },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${script.variable} ${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
