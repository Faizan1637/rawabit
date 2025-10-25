import type React from "react"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import BottomBar from "@/components/bottombar"
import "./globals.css"


export const metadata: Metadata = {
  title: "Rawabit – Find Your Perfect Life Partner",
  description:
    "Rawabit is a modern platform that helps individuals share details about themselves and their preferences to find a compatible life partner for marriage. Build meaningful connections based on compatibility, trust, and shared values.",
  generator: "Next.js",
  keywords: [
    "Rawabit",
    "marriage platform",
    "life partner search",
    "matchmaking",
    "find partner",
    "relationship compatibility",
    "Nikah app",
    "Muslim marriage app",
  ],
  authors: [{ name: "Rawabit Team" }],
  openGraph: {
    title: "Rawabit – Find Your Perfect Life Partner",
    description:
      "Join Rawabit to discover compatible matches based on personality, lifestyle, and marriage preferences.",
    url: "https://rawabit.com", // replace with your actual domain
    siteName: "Rawabit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rawabit – Find Your Perfect Life Partner",
    description:
      "A platform to connect individuals seeking marriage based on compatibility and shared values.",
    creator: "@rawabit", // optional, if you have a Twitter handle
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased pt-20`}>
        <Navbar />
        {children}
        <BottomBar/>
      </body>
    </html>
  )
}
