import type { Metadata } from "next";
import { Bebas_Neue, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Momentum Corner — Mày Vẫn Đang Trở Thành",
  description: "Một góc riêng điện ảnh cho tâm trí. Nơi để phản chiếu, tập trung và giữ nhịp.",
  keywords: ["momentum", "cá nhân", "điện ảnh", "phản chiếu", "trưởng thành"],
  authors: [{ name: "Momentum Corner" }],
  openGraph: {
    title: "Momentum Corner",
    description: "Mày vẫn đang trở thành.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${bebas.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-full bg-bg-primary text-white film-grain vignette">
        {children}
      </body>
    </html>
  );
}
