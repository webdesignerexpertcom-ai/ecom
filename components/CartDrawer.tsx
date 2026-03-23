"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { X, ShoppingBag, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import Image from "next/image";
import { generateWhatsAppLinkMulti } from "@/lib/utils";

export default function CartDrawer({ whatsappNumber }: { whatsappNumber: string }) {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, subtotal, discount, appliedCoupon, applyCoupon, itemCount } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; message?: string }>({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const result = applyCoupon(couponCode);
    setCouponFeedback(result);
    if (result.success) {
      setCouponCode("");
    }
  };

  const handleCheckout = () => {
    const link = generateWhatsAppLinkMulti(cart, totalPrice, whatsappNumber, appliedCoupon || undefined, discount);
    window.open(link, "_blank");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cream/50 px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-primary" size={20} />
              <h2 className="text-xl font-black text-dark-brown">Your Bag ({itemCount})</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-full p-2 text-dark-brown/50 hover:bg-cream/30 hover:text-primary transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-cream/30 p-8 text-6xl opacity-40">🛒</div>
                <h3 className="text-lg font-bold text-dark-brown">Your bag is empty</h3>
                <p className="mt-2 text-sm text-dark-brown/50">Looks like you haven't added anything yet.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-8 rounded-full bg-primary px-8 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-cream/30 pb-6">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-cream bg-cream/20">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h4 className="font-bold text-dark-brown">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="mt-1 text-xs font-medium text-dark-brown/50">{item.weight}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-cream bg-cream/10">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 text-dark-brown/60 hover:text-primary"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-dark-brown">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 text-dark-brown/60 hover:text-primary"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-black text-primary">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coupon Code Section */}
                <div className="mt-8 rounded-2xl bg-cream/20 p-4 border border-cream/50">
                  <h4 className="mb-3 text-sm font-bold text-dark-brown">Have a coupon code?</h4>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code (e.g. WELCOME10)"
                      className="flex-1 rounded-lg border border-cream bg-white px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-dark-brown px-4 py-2 text-xs font-bold text-white transition-all hover:bg-dark-brown/90"
                    >
                      Apply
                    </button>
                  </form>
                  {couponFeedback.message && (
                    <p className={`mt-2 text-[10px] font-bold ${couponFeedback.success ? "text-green-600" : "text-red-500"}`}>
                      {couponFeedback.message}
                    </p>
                  )}
                  {appliedCoupon && (
                    <div className="mt-3 flex items-center justify-between rounded-md bg-green-50 px-2 py-1 text-[10px] font-black text-green-700 ring-1 ring-green-100">
                      <span>COUPON APPLIED: {appliedCoupon}</span>
                      <button onClick={() => applyCoupon("")} className="hover:text-red-500">REMOVE</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer / Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-cream/50 bg-cream/5 px-6 py-8">
              <div className="mb-6 space-y-2">
                <div className="flex justify-between text-sm font-medium text-dark-brown/60">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm font-bold text-green-600">
                    <span>Discount ({appliedCoupon})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-medium text-dark-brown/60">
                  <span>Shipping</span>
                  <span className="text-green-600">Calculated on WhatsApp</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-xl font-black text-dark-brown">Total Amount</span>
                  <span className="text-xl font-black text-primary">₹{totalPrice}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-4 text-lg font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95"
              >
                <MessageCircle size={22} />
                Checkout on WhatsApp
              </button>
              <p className="mt-4 text-center text-xs font-medium text-dark-brown/40">
                You'll be redirected to WhatsApp to confirm your order details.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
