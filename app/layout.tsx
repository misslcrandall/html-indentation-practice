import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.scss";

const inter = Inter({ 
    subsets: ['latin'], 
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap' 
})

export const metadata: Metadata = {
  title: "Front-end Dev Practice Tools | Lisa Crandall",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={inter.className}
    >
      <body className="">
          <main className="">{children}</main>
      </body>
    </html>
  );
}
