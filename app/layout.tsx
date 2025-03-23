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
      <SessionProvider>
        <body className={`${roboto.className} antialiased`}>{children}</body>
      </SessionProvider>
    </html>
  );
}
