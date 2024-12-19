import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";


interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
    <body>
        <CartProvider>
            {children}
        </CartProvider>
    </body>
  </html>
);
}