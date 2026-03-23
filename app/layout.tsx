import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";
import connectDB from "@/lib/mongodb";
import Config from "@/models/Config";
import FloatingCart from "@/components/FloatingCart";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Homemade Love | Authentic Homemade Pickles & Masalas",
  description: "Traditional recipes, 100% natural ingredients, no preservatives. Delivered to your door.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let whatsappNumber = "919701121967";
  try {
    await connectDB();
    const config = await Config.findOne({});
    if (config) {
      whatsappNumber = config.whatsappNumber;
    }
  } catch (error) {
    console.error("Layout: Database connection failed");
  }

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-dark-brown`}>
        <CartProvider>
          {children}
          <CartDrawer whatsappNumber={whatsappNumber} />
          <FloatingCart />
        </CartProvider>
      </body>
    </html>
  );
}
