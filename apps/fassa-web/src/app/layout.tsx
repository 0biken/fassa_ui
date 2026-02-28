import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "FASSA Web - Starter Template",
    description: "Faculty of Science Student Association - Starter Template",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
