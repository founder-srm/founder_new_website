'use client'
import { Analytics } from '@vercel/analytics/react';
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {/* <Navbar /> */}
          {children}
          <Analytics />
        <Toaster className=" bg-[#090909]  text-white" />
      </body>
    </html>
  )
}
