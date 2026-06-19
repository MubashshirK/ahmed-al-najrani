import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { LazyMotion, domAnimation } from "framer-motion"
import Navbar from "@/components/ui/Navbar"
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
  title: "Ahmed S. Al-Najrani | Public Health Researcher & Biostatistician",
  description:
    "Personal portfolio of Ahmed S. Al-Najrani — Public Health Researcher & Biostatistician at King Faisal University. KAP Studies, Data Analysis, Health Intervention Design.",
  keywords: [
    "Public Health",
    "Biostatistics",
    "KAP Studies",
    "King Faisal University",
    "Research",
    "Data Analysis",
  ],
  openGraph: {
    title: "Ahmed S. Al-Najrani | Public Health Researcher",
    description:
      "Public Health Researcher & Biostatistician at King Faisal University.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/images/ahmed.jpg" sizes="any" />
      </head>
      <body className="min-h-full bg-bg text-text-primary antialiased">
        <ThemeProvider>
          <LazyMotion features={domAnimation}>
            <Navbar />
            {children}
          </LazyMotion>
        </ThemeProvider>
      </body>
    </html>
  )
}
