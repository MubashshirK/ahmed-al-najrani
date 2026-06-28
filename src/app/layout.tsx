import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { LazyMotion, domAnimation } from "framer-motion"
import Navbar from "@/components/ui/Navbar"
import ScrollToTop from "@/components/ui/ScrollToTop"
import ThemeProvider from "@/components/ui/ThemeProvider"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Dr. Mohammed Khursheed Akhtar | Enterprise AI Solutions Architect",
  description:
    "Personal portfolio of Dr. Mohammed Khursheed Akhtar — Enterprise AI Solutions Architect & AI Transformation Executive with 35+ years of experience in Generative AI, LLMs, Agentic AI, and Enterprise AI Strategy.",
  keywords: [
    "Enterprise AI",
    "AI Solutions Architect",
    "Generative AI",
    "LLMs",
    "Agentic AI",
    "AI Transformation",
    "AI Strategy",
    "Platform Architecture",
  ],
  openGraph: {
    title: "Dr. Mohammed Khursheed Akhtar | Enterprise AI Solutions Architect",
    description:
      "Enterprise AI Solutions Architect & AI Transformation Executive with 35+ years of international experience.",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: "resizes-visual",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/images/dr-mohammed.png" sizes="any" />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}else{document.documentElement.setAttribute('data-theme','dark')}}catch(e){document.documentElement.setAttribute('data-theme','dark')}})()`,
          }}
        />
      </head>
      <body className="bg-bg text-text-primary antialiased">
        <Analytics />
        <ThemeProvider>
          <Navbar />
          <LazyMotion features={domAnimation}>
            {children}
            <ScrollToTop />
          </LazyMotion>
        </ThemeProvider>
      </body>
    </html>
  )
}
