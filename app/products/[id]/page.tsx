import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Config from "@/models/Config";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Star, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import ProductActions from "@/components/ProductActions";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  await connectDB();
  const productDoc = await Product.findById(id);
  const dbConfig = await Config.findOne({}) || { whatsappNumber: "919701121967" };

  if (!productDoc) {
    notFound();
  }

  const product = {
    id: productDoc._id.toString(),
    name: productDoc.name,
    price: productDoc.price,
    weight: productDoc.weight,
    image: productDoc.image,
    description: productDoc.description,
    category: productDoc.category,
    isBestSeller: productDoc.isBestSeller,
  };

  return (
    <main className="min-h-screen bg-cream/30 pb-20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-cream/50 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-dark-brown hover:text-primary transition-colors">
            <ArrowLeft size={18} />
            Back to Shop
          </Link>
          <div className="text-xl font-black tracking-tighter text-primary">
            HOMEMADE<span className="text-dark-brown">LOVE</span>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-sm border border-cream">
            {product.isBestSeller && (
              <span className="absolute top-6 left-6 z-10 rounded-full bg-secondary px-4 py-1.5 text-xs font-bold text-white shadow-md">
                BEST SELLER
              </span>
            )}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary capitalize">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-secondary">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <span className="ml-1 text-xs font-bold text-dark-brown/50">(48 Reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl font-black text-dark-brown md:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-4xl font-black text-primary">₹{product.price}</span>
              <span className="text-lg font-medium text-dark-brown/60 line-through">₹{Math.round(product.price * 1.2)}</span>
              <span className="text-sm font-bold text-accent">20% OFF</span>
            </div>

            <p className="mt-4 text-sm font-bold text-dark-brown/70">
              Weight: <span className="text-dark-brown">{product.weight}</span>
            </p>

            <p className="mt-8 text-lg leading-relaxed text-dark-brown/80">
              {product.description}
            </p>

            <ProductActions product={product} whatsappNumber={dbConfig.whatsappNumber} />

            {/* Benefits */}
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-cream pt-8">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-primary">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-xs font-bold text-dark-brown/70">Pure & Natural</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-primary">
                  <Truck size={24} />
                </div>
                <span className="text-xs font-bold text-dark-brown/70">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-primary">
                  <Star size={24} />
                </div>
                <span className="text-xs font-bold text-dark-brown/70">Top Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
