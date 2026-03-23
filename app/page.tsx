import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { products as mockProducts, categories } from "@/lib/data";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Config from "@/models/Config";
import { Search } from "lucide-react";

import Link from "next/link";

export default async function Home({ searchParams }: { searchParams: { category?: string; q?: string } }) {
  const { category: selectedCategory, q: searchQuery } = await searchParams;

  let dbProducts = [];
  let config = {
    whatsappNumber: "919701121967",
    heroTitle: "Authentic Homemade Pickles Delivered to Your Door",
    heroSubtitle: "Traditional recipes, no preservatives.",
  };

  try {
    await connectDB();
    dbProducts = await Product.find({}).sort({ createdAt: -1 });
    const dbConfig = await Config.findOne({});
    if (dbConfig) {
      config = {
        whatsappNumber: dbConfig.whatsappNumber,
        heroTitle: dbConfig.heroTitle,
        heroSubtitle: dbConfig.heroSubtitle,
      };
    }
  } catch (error) {
    console.error("Database connection failed, using mock data");
  }

  let productsToFilter = dbProducts.length > 0 ? dbProducts.map(p => ({
    id: p._id.toString(),
    name: p.name,
    price: p.price,
    weight: p.weight,
    image: p.image,
    description: p.description,
    category: p.category,
    isBestSeller: p.isBestSeller,
  })) : mockProducts;

  let displayProducts = productsToFilter;

  if (selectedCategory) {
    displayProducts = displayProducts.filter(p => p.category === selectedCategory);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    displayProducts = displayProducts.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Header/Nav */}
      <nav className="sticky top-0 z-50 w-full border-b border-cream/50 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="text-2xl font-black tracking-tighter text-primary">
            HOMEMADE<span className="text-dark-brown">LOVE</span>
          </div>
          <div className="hidden gap-8 text-sm font-bold text-dark-brown/70 md:flex">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <a href="#products" className="hover:text-primary transition-colors">Shop</a>
            <a href="#about" className="hover:text-primary transition-colors">Our Story</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <a href="#products" className="rounded-full bg-primary/10 px-6 py-2 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white">
            Order Now
          </a>
        </div>
      </nav>

      <Hero title={config.heroTitle} subtitle={config.heroSubtitle} />

      {/* Search & Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-black text-dark-brown md:text-5xl">Our Collection</h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-secondary rounded-full" />
          </div>

          {/* Search Bar */}
          <div className="mx-auto mb-16 max-w-2xl">
            <form action="/" className="relative flex items-center">
              {selectedCategory && <input type="hidden" name="category" value={selectedCategory} />}
              <div className="absolute left-4 text-dark-brown/40">
                <Search size={20} />
              </div>
              <input
                type="text"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search for pickles, masalas, flavors..."
                className="w-full rounded-2xl border-2 border-cream bg-cream/5 py-4 pl-12 pr-4 text-lg font-medium text-dark-brown outline-none transition-all focus:border-primary focus:bg-white focus:shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-primary/90 active:scale-95"
              >
                Search
              </button>
            </form>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-8">
            <Link
              href="/"
              className={`group flex flex-col items-center justify-center rounded-2xl border-2 p-6 transition-all active:scale-95 ${
                !selectedCategory ? "border-primary bg-primary/5 shadow-sm" : "border-cream bg-cream/20 hover:border-primary/20 hover:bg-primary/5"
              }`}
            >
              <span className="mb-3 text-4xl group-hover:scale-110 transition-transform">🍱</span>
              <span className={`text-sm font-bold ${!selectedCategory ? "text-primary" : "text-dark-brown"}`}>All Products</span>
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/?category=${category.id}${searchQuery ? `&q=${searchQuery}` : ""}#products`}
                className={`group flex flex-col items-center justify-center rounded-2xl border-2 p-6 transition-all active:scale-95 ${
                  selectedCategory === category.id ? "border-primary bg-primary/5 shadow-sm" : "border-cream bg-cream/20 hover:border-primary/20 hover:bg-primary/5"
                }`}
              >
                <span className="mb-3 text-4xl group-hover:scale-110 transition-transform">{category.icon}</span>
                <span className={`text-sm font-bold ${selectedCategory === category.id ? "text-primary" : "text-dark-brown"}`}>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid Section */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-black text-dark-brown md:text-5xl">
                {searchQuery ? `Search Results: "${searchQuery}"` : selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : "Our Best Sellers"}
              </h2>
              <p className="mt-2 text-dark-brown/60">
                {searchQuery ? `Showing products matching your search.` : selectedCategory ? `Browsing our ${categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} collection.` : "The most loved flavors from our kitchen to yours."}
              </p>
            </div>
            {(selectedCategory || searchQuery) && (
              <Link href="/" className="font-bold text-primary hover:underline underline-offset-4 decoration-2 transition-all">
                Clear All Filters →
              </Link>
            )}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {displayProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-xl font-bold text-dark-brown/50">No products found matching your criteria.</p>
              <Link href="/" className="mt-4 inline-block font-bold text-primary hover:underline underline-offset-4">
                Back to all products
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl">🌿</div>
              <h3 className="mb-3 text-xl font-bold">100% Natural</h3>
              <p className="text-sm font-medium text-white/70">No hidden chemicals or artificial preservatives.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl">👵</div>
              <h3 className="mb-3 text-xl font-bold">Traditional Recipes</h3>
              <p className="text-sm font-medium text-white/70">Authentic flavors passed down generations.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl">✨</div>
              <h3 className="mb-3 text-xl font-bold">Fresh Ingredients</h3>
              <p className="text-sm font-medium text-white/70">Sourced directly from local farmers.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl">🚚</div>
              <h3 className="mb-3 text-xl font-bold">Fast Delivery</h3>
              <p className="text-sm font-medium text-white/70">Carefully packed and delivered within 3-5 days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cream bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 text-2xl font-black text-primary">
            HOMEMADE<span className="text-dark-brown">LOVE</span>
          </div>
          <p className="mb-8 text-sm text-dark-brown/60">
            © 2026 Homemade Love. All rights reserved. <br />
            Proudly made in India 🇮🇳
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-sm font-bold text-dark-brown/70 hover:text-primary">Instagram</a>
            <a href="#" className="text-sm font-bold text-dark-brown/70 hover:text-primary">Facebook</a>
            <a href="#" className="text-sm font-bold text-dark-brown/70 hover:text-primary">WhatsApp</a>
          </div>
        </div>
      </footer>

      <WhatsAppButton phoneNumber={config.whatsappNumber} />
    </main>
  );
}
