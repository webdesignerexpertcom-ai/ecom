import mongoose, { Schema, model, models } from "mongoose";

const ConfigSchema = new Schema({
  whatsappNumber: { type: String, default: "919876543210" },
  heroTitle: { type: String, default: "Authentic Homemade Pickles Delivered to Your Door" },
  heroSubtitle: { type: String, default: "Traditional recipes, no preservatives." },
}, { timestamps: true });

const Config = models.Config || model("Config", ConfigSchema);

export default Config;
