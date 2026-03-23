"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ phoneNumber = "91XXXXXXXXXX" }: { phoneNumber?: string }) {
  const handleClick = () => {
    const message = "Hello, I have a question about your products!";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={32} />
    </button>
  );
}
