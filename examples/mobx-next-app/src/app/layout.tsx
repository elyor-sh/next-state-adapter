import type { Metadata } from "next";
import "./globals.css";
import {StoreProvider} from "@/store/config";


export const metadata: Metadata = {
    title: "Mobx Next app with next-state-adapter",
    description: "Mobx Next app with next-state-adapter",
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
