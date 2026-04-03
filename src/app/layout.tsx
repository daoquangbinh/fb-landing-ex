import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({ 
  subsets: ["vietnamese"], 
  variable: "--font-noto-serif",
  weight: ["400", "700"]
});

const manrope = Manrope({ 
  subsets: ["vietnamese"], 
  variable: "--font-manrope",
  weight: ["300", "400", "500", "700"]
});

export const metadata: Metadata = {
  title: "Chuyên Gia F&B - 35 Năm Kinh Nghiệm",
  description: "Tư vấn vận hành, phát triển concept và đào tạo nhân sự F&B cao cấp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${notoSerif.variable} ${manrope.variable} font-sans bg-[#FCF9F8] text-[#0A1D37]`}>
        {children}
      </body>
    </html>
  );
}
