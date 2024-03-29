'use client'
import { Analytics } from '@vercel/analytics/react';
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { useEffect } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import { SpeedInsights } from '@vercel/speed-insights/next';

import Favicon from '@/public/favicon.ico';
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() =>{
    const checkLocalStorage = () => {
      const value = localStorage.getItem("no_notifications_foundathon");
    
      if (!value) {
        console.log("No value found in local storage for key: ", value);
        // alert("We are hosting a hackathon! Click here to know more");

      }
    };
    setTimeout(() => {
      checkLocalStorage();
    }, 5000);
  },[]);

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
      <body className={inter.className}>
          {/* <Navbar /> */}
          {children}
          <Analytics />
          <SpeedInsights />
        <Toaster className=" bg-[#090909]  text-white" />
      </body>
    </html>
  )
}
