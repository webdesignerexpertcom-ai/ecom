import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Config from "@/models/Config";
import { addProduct, deleteProduct, updateConfig, updateProduct } from "@/lib/actions";
import Link from "next/link";
import { categories } from "@/lib/data";

export default async function AdminPage({ searchParams }: { searchParams: { edit?: string } }) {
  const editId = (await searchParams).edit;

  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 });
  const dbConfig = await Config.findOne({}) || {
    whatsappNumber: "919701121967",
    heroTitle: "Authentic Homemade Pickles Delivered to Your Door",
    heroSubtitle: "Traditional recipes, no preservatives.",
  };

  const editProduct = editId ? await Product.findById(editId) : null;

  return (
    <div className="min-h-screen bg-cream/30 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-4xl font-black text-primary">Admin Dashboard</h1>
          <Link href="/" className="text-sm font-bold text-dark-brown hover:text-primary transition-colors">View Site →</Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Site Settings & Add/Edit Product */}
          <div className="lg:col-span-1 space-y-8">
            {/* Add/Edit Product Form */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-cream">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-dark-brown">
                  {editProduct ? "Edit Product" : "Add New Product"}
                </h2>
                {editProduct && (
                  <Link href="/admin" className="text-xs font-bold text-primary hover:underline">
                    Cancel
                  </Link>
                )}
              </div>
              <form action={editProduct ? updateProduct : addProduct} className="flex flex-col gap-4">
                {editProduct && <input type="hidden" name="id" value={editProduct._id.toString()} />}
                <div>
                  <label className="text-sm font-bold text-dark-brown/70">Product Name</label>
                  <input name="name" defaultValue={editProduct?.name} required className="mt-1 w-full rounded-lg border border-cream bg-cream/10 p-2 text-sm focus:border-primary focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-dark-brown/70">Price (₹)</label>
                    <input name="price" type="number" defaultValue={editProduct?.price} required className="mt-1 w-full rounded-lg border border-cream bg-cream/10 p-2 text-sm focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-dark-brown/70">Weight</label>
                    <input name="weight" defaultValue={editProduct?.weight} required placeholder="e.g. 500g" className="mt-1 w-full rounded-lg border border-cream bg-cream/10 p-2 text-sm focus:border-primary focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bold text-dark-brown/70">Category</label>
                  <select name="category" defaultValue={editProduct?.category || "mango"} className="mt-1 w-full rounded-lg border border-cream bg-cream/10 p-2 text-sm focus:border-primary focus:outline-none">
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold text-dark-brown/70">Image URL</label>
                  <input name="image" defaultValue={editProduct?.image} required className="mt-1 w-full rounded-lg border border-cream bg-cream/10 p-2 text-sm focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm font-bold text-dark-brown/70">Description</label>
                  <textarea name="description" defaultValue={editProduct?.description} rows={3} required className="mt-1 w-full rounded-lg border border-cream bg-cream/10 p-2 text-sm focus:border-primary focus:outline-none" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="isBestSeller" id="isBestSeller" defaultChecked={editProduct?.isBestSeller} className="accent-primary" />
                  <label htmlFor="isBestSeller" className="text-sm font-bold text-dark-brown/70">Mark as Best Seller</label>
                </div>
                <button type="submit" className="mt-4 rounded-lg bg-primary py-3 text-sm font-bold text-white transition-all hover:bg-primary/90">
                  {editProduct ? "Update Product" : "Add Product"}
                </button>
              </form>
            </div>

            {/* Site Configuration */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-cream">
              <h2 className="mb-6 text-xl font-bold text-dark-brown">Site Settings</h2>
              <form action={updateConfig} className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-bold text-dark-brown/70">WhatsApp Number</label>
                  <input name="whatsappNumber" defaultValue={dbConfig.whatsappNumber} required className="mt-1 w-full rounded-lg border border-cream bg-cream/10 p-2 text-sm focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm font-bold text-dark-brown/70">Hero Title</label>
                  <input name="heroTitle" defaultValue={dbConfig.heroTitle} required className="mt-1 w-full rounded-lg border border-cream bg-cream/10 p-2 text-sm focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm font-bold text-dark-brown/70">Hero Subtitle</label>
                  <textarea name="heroSubtitle" defaultValue={dbConfig.heroSubtitle} rows={2} required className="mt-1 w-full rounded-lg border border-cream bg-cream/10 p-2 text-sm focus:border-primary focus:outline-none" />
                </div>
                <button type="submit" className="mt-2 rounded-lg bg-dark-brown py-2.5 text-sm font-bold text-white transition-all hover:bg-dark-brown/90">
                  Update Settings
                </button>
              </form>
            </div>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-cream">
              <h2 className="mb-6 text-xl font-bold text-dark-brown">Existing Products</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-cream text-sm font-bold text-dark-brown/50">
                      <th className="pb-4">Product</th>
                      <th className="pb-4">Category</th>
                      <th className="pb-4">Price</th>
                      <th className="pb-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream">
                    {products.map((product) => (
                      <tr key={product._id.toString()}>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded bg-cream/30">
                              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                            </div>
                            <span className="font-bold text-dark-brown">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-dark-brown/70 capitalize">{product.category}</td>
                        <td className="py-4 font-bold text-primary">₹{product.price}</td>
                        <td className="py-4">
                          <div className="flex gap-4">
                            <Link href={`/admin?edit=${product._id.toString()}`} className="text-sm font-bold text-primary hover:underline">
                              Edit
                            </Link>
                            <form action={async () => { "use server"; await deleteProduct(product._id.toString()); }}>
                              <button type="submit" className="text-sm font-bold text-red-500 hover:text-red-700">Delete</button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
