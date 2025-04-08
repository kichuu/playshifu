import mongoose from "mongoose"
const productSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  variants: [String],
  rating: Number,
  tags: [String],
  price: {
    original: Number,
    discounted: Number,
  },
  description: {
    plugoCount: String,
    plugoLetters: String,
    plugoLink: String,
  },
  imageUrl: String,
  deal: {
    flatOff: String,
    label: String,
  },
})

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema)
export default Product
