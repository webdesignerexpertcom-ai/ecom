"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "./CartContext";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  weight: string;
  image: string;
  description: string;
  isBestSeller?: boolean;
}

export default function ProductCard({ product }: { product: ProductProps }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 border border-cream/50">
      {product.isBestSeller && (
        <span className="absolute top-4 left-4 z-10 rounded-full bg-secondary px-4 py-1.5 text-[10px] font-black tracking-widest text-white shadow-md">
          BEST SELLER
        </span>
      )}

      <Link href={`/products/${product.id}`} className="aspect-square overflow-hidden bg-cream/20">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-xl font-black text-dark-brown group-hover:text-primary transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-xs font-bold text-dark-brown/40 uppercase tracking-wider">{product.weight}</p>
        </div>
        
        <p className="mb-6 text-sm text-dark-brown/60 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-black text-primary">₹{product.price}</span>
          <button
            onClick={handleAddToCart}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-110 active:scale-95"
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
