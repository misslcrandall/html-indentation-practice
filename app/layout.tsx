import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.scss";

const poppins = Poppins({ 
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
      className={poppins.className}
    >
      <body className="">
          <main className="">{children}</main>
      </body>
    </html>
  );
}
