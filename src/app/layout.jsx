import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "./context/CartContext";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/context/lagnguageContext";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "News Portal",
  description: "A Bangladeshi news portal",
  icons: {
    icon: "/newsportal.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster richColors />
            <CartProvider>{children}</CartProvider>
          </TooltipProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
