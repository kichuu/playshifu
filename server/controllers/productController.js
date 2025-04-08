import Product from "../models/Product.js"

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const product = await Product.findOne({ slug })

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.status(200).json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      slug,
      variants,
      rating,
      tags,
      price,
      description,
      imageUrl,
      deal,
    } = req.body

    const existing = await Product.findOne({ slug })
    if (existing) {
      return res
        .status(400)
        .json({ message: "Product with this slug already exists" })
    }

    const product = new Product({
      name,
      slug,
      variants,
      rating,
      tags,
      price,
      description,
      imageUrl,
      deal,
    })

    await product.save()
    res.status(201).json(product)
  } catch (error) {
    console.error("Error creating product:", error)
    res.status(500).json({ message: "Server error" })
  }
}
