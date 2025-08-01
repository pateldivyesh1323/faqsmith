import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--font-noto_sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: "FAQSmith - Generate FAQs from your support tickets",
    description: "Generate FAQs from your support tickets",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={notoSans.variable}>{children}</body>
        </html>
    );
}
