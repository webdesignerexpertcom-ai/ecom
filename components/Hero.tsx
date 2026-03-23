import Image from "next/image";

export default function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden bg-cream">
      {/* Background Pattern/Overlay */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#B91C1C_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl">
          <span className="mb-4 inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-bold tracking-wider text-secondary border border-secondary/20">
            HOMEMADE WITH LOVE
          </span>
          <h1 className="mb-6 text-5xl font-black leading-tight text-primary md:text-7xl lg:text-8xl">
            {title.split(" ").slice(0, -3).join(" ")} <br />
            <span className="text-dark-brown italic">{title.split(" ").slice(-3).join(" ")}</span>
          </h1>
          <p className="mb-10 text-lg font-medium text-dark-brown/70 md:text-xl lg:px-20 leading-loose">
            {subtitle}
          </p>
// ...

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#products"
              className="w-full rounded-full bg-primary px-10 py-4 text-lg font-bold text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-2xl sm:w-auto active:scale-95"
            >
              Shop Now
            </a>
            <button
              className="w-full rounded-full border-2 border-primary px-10 py-4 text-lg font-bold text-primary transition-all hover:bg-primary/5 sm:w-auto active:scale-95"
            >
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="absolute bottom-10 left-0 right-0 z-10 flex flex-wrap justify-center gap-8 px-4 text-sm font-bold text-dark-brown/60">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          NO PRESERVATIVES
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          TRADITIONAL RECIPES
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          FRESH INGREDIENTS
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          TRUSTED BY 10,000+ CUSTOMERS
        </div>
      </div>
    </section>
  );
}
