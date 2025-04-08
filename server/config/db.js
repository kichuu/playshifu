import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://krishnadevr07:kichu123@cluster0.wc88p.mongodb.net/playshifu"
    )
    console.log("db connected")
  } catch (error) {
    console.error(error.message)
  }
}
