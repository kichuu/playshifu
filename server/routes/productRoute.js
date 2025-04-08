import { Router } from "express"
import {
  createProduct,
  getProductBySlug,
} from "../controllers/productController.js"

const router = Router()

router.get("/:slug", getProductBySlug)
router.post("/add-product", createProduct)

export default router
