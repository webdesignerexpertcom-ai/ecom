"use server";

import connectDB from "./mongodb";
import Product from "@/models/Product";
import Config from "@/models/Config";
import { revalidatePath } from "next/cache";

export async function addProduct(formData: FormData) {
  try {
    await connectDB();
    
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const weight = formData.get("weight") as string;
    const image = formData.get("image") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const isBestSeller = formData.get("isBestSeller") === "on";

    await Product.create({
      name,
      price,
      weight,
      image,
      description,
      category,
      isBestSeller,
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, error: "Failed to add product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await connectDB();
    await Product.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete product" };
  }
}

export async function updateProduct(formData: FormData) {
  try {
    await connectDB();
    
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const weight = formData.get("weight") as string;
    const image = formData.get("image") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const isBestSeller = formData.get("isBestSeller") === "on";

    await Product.findByIdAndUpdate(id, {
      name,
      price,
      weight,
      image,
      description,
      category,
      isBestSeller,
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath(`/products/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function updateConfig(formData: FormData) {
  try {
    await connectDB();
    const whatsappNumber = formData.get("whatsappNumber") as string;
    const heroTitle = formData.get("heroTitle") as string;
    const heroSubtitle = formData.get("heroSubtitle") as string;

    await Config.findOneAndUpdate({}, {
      whatsappNumber,
      heroTitle,
      heroSubtitle,
    }, { upsert: true });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update configuration" };
  }
}
