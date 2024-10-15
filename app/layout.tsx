import type { Metadata } from "next";
import { Yusei_Magic } from "next/font/google";
import "./globals.css";
import { Header } from "./components/layout/header";

const yusei = Yusei_Magic({ subsets: ["latin"] , weight:'400'});

export const metadata: Metadata = {
  title: "イラスト投稿アプリ",
  description: "practice building app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={yusei.className}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
