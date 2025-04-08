import express from "express"
import { connectDB } from "./config/db.js"
import router from "./routes/productRoute.js"
import cors from "cors"
const app = express()
app.use(cors())
const PORT = 5000
connectDB()

app.use(express.json())
app.use("/products", router)

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/`)
})
