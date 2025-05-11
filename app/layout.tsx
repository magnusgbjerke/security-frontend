"use client";

import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <SessionProvider>
          <div className="relative w-full h-screen bg-black">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
