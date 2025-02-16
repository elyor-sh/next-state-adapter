import type { Metadata } from "next";
import "./globals.css";
import {StoreProvider} from "@/store/config";


export const metadata: Metadata = {
    title: "Zustand Next app with next-state-adapter",
    description: "Zustand Next app with next-state-adapter",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <StoreProvider>
            {children}
        </StoreProvider>
        </body>
        </html>
    );
}
