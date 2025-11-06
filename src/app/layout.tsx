import type { Metadata } from "next";
import { Noto_Sans_Myanmar } from "next/font/google";
import "./globals.css";

const noto_sans_myanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Ko Nawin",
  description: "Ko Nawin Prayer Beads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto_sans_myanmar.className}>{children}</body>
    </html>
  );
}
