"use client";

import { useCart } from "./CartContext";
import { ShoppingCart, MessageCircle } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/utils";

export default function ProductActions({ product, whatsappNumber }: { product: any, whatsappNumber: string }) {
  const { addToCart } = useCart();

  const handleWhatsAppClick = () => {
    window.open(generateWhatsAppLink(product, whatsappNumber), "_blank");
  };

  return (
    <div className="mt-12 flex flex-col gap-4 sm:flex-row">
      <button
        onClick={() => addToCart(product)}
        className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-primary py-4 text-lg font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95"
      >
        <ShoppingCart size={22} />
        Add to Cart
      </button>
      <button
        onClick={handleWhatsAppClick}
        className="flex flex-1 items-center justify-center gap-3 rounded-2xl border-2 border-[#25D366] py-4 text-lg font-bold text-[#25D366] transition-all hover:bg-[#25D366]/5 hover:scale-[1.02] active:scale-95"
      >
        <MessageCircle size={22} />
        Order on WhatsApp
      </button>
    </div>
  );
}
