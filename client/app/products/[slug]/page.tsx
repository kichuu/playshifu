"use client"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Search, Heart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"
import Header from "@/components/Header"

export default function ProductPage() {
  const { slug } = useParams()
  const [productData, setProductData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!slug) return

    fetch(`http://localhost:5000/products/${slug}`)
      .then(async (response) => {
        if (!response.ok) {
          setError(true)
          return null
        }
        const data = await response.json()
        if (!data || Object.keys(data).length === 0) {
          setError(true)
          return null
        }
        setProductData(data)
        setError(false)
      })
      .catch((err) => {
        console.error("Error fetching product data:", err)
        setError(true)
      })
  }, [slug])
  if (error) {
    return (
      <div className="text-center py-10 text-red-600 font-semibold text-xl">
        Product not available
      </div>
    )
  }

  if (!productData) {
    return <div>Loading...</div> // Show a loading state while data is being fetched
  }

  const { price, description, deal, name, rating, imageUrl, variants, tags } =
    productData
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top navigation bar */}
      <Header />

      <main className="flex-1">
        {/* Product Details Section */}
        <section className="px-4 py-6 md:px-8 lg:px-12 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden bg-white border">
                <Image
                  src={imageUrl}
                  alt={name}
                  width={500}
                  height={500}
                  className="w-full h-auto"
                />
                <button className="absolute top-4 right-4 bg-white rounded-full p-1.5 shadow-md">
                  <Heart className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold md:text-3xl">{name}</h1>
                <p className="text-sm text-gray-600">{deal.label}</p>
              </div>

              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {rating} (120 reviews)
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">
                    ₹{price.discounted}
                  </span>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ₹{price.original}
                  </span>
                  <span className="ml-2 text-sm text-green-600">
                    {deal.flatOff} off
                  </span>
                </div>
                <p className="text-sm text-gray-600">Inclusive of all taxes</p>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6">
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 py-6"
                >
                  Buy Now
                </Button>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-4 w-4 rounded-full bg-purple-600"></div>
                  </div>
                  <p className="ml-3">{description.plugoCount}</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-4 w-4 rounded-full bg-purple-600"></div>
                  </div>
                  <p className="ml-3">{description.plugoLetters}</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-4 w-4 rounded-full bg-purple-600"></div>
                  </div>
                  <p className="ml-3">{description.plugoLink}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 py-4">
                {variants.map((variant, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="h-12 w-12 rounded-full bg-yellow-400 flex items-center justify-center mb-2">
                      <Image
                        src="/placeholder.svg?height=24&width=24"
                        alt={variant}
                        width={24}
                        height={24}
                      />
                    </div>
                    <span className="text-xs">{variant}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product Guide Section */}
        <section className="bg-purple-600 text-white py-8 px-4 md:px-8 lg:px-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Product Guide</h2>
            <p className="text-sm max-w-2xl mx-auto">
              Discover how to set up and use your Junior Genius Pack
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
              Watch Video Guide
            </Button>
          </div>

          <Carousel className="w-full">
            <CarouselContent>
              {[...Array(4)].map((_, i) => (
                <CarouselItem
                  key={i}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-1">
                    <div className="bg-white rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt={`Guide image ${i + 1}`}
                        width={300}
                        height={300}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white text-purple-600 hover:bg-white hover:text-purple-700" />
            <CarouselNext className="bg-white text-purple-600 hover:bg-white hover:text-purple-700" />
          </Carousel>
        </section>

        {/* About Section */}
        <section className="py-12 px-4 md:px-8 lg:px-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            About
            <br />
            Junior Genius Pack
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=250&width=400"
                  alt={`Product image ${i + 1}`}
                  width={400}
                  height={250}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">
                How to Use Junior Genius Pack
              </h3>
              <p className="text-gray-600 mb-4">
                Download and install our interactive, child-friendly app from
                Play Store or App Store, and connect the Junior Genius Pack to
                start learning and playing.
              </p>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=250&width=400"
                  alt="How to use"
                  width={400}
                  height={250}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Learn the Fundamentals</h3>
              <p className="text-gray-600 mb-4">
                Master numbers, letters, identification, spelling, coding, and
                more!
              </p>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=250&width=400"
                  alt="Learn fundamentals"
                  width={400}
                  height={250}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Story-Based Learning</h3>
              <p className="text-gray-600 mb-4">
                Play 14 exciting story-driven games with over 250 levels using
                the interactive tools.
              </p>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=250&width=400"
                  alt="Story-based learning"
                  width={400}
                  height={250}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Age-Adaptive Games</h3>
              <p className="text-gray-600 mb-4">
                The age-adaptive learning system makes these games perfect for
                kids ages 4-10, with progressive difficulty levels.
              </p>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=250&width=400"
                  alt="Age-adaptive games"
                  width={400}
                  height={250}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">
                Holistic STEM Learning Pack
              </h3>
              <p className="text-gray-600 mb-4">
                This junior genius pack is the ultimate educational companion
                for children, combining math, language, and coding skills.
              </p>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=250&width=400"
                  alt="STEM learning"
                  width={400}
                  height={250}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Skill Building</h3>
              <p className="text-gray-600 mb-4">
                Our educational learning toys help children develop critical
                thinking, problem-solving, and creativity skills.
              </p>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=250&width=400"
                  alt="Skill building"
                  width={400}
                  height={250}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* In The Box Section */}
        <section className="py-12 px-4 md:px-8 lg:px-12 bg-gray-50">
          <h2 className="text-2xl font-bold text-center mb-8">In The Box</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm mb-3 w-full">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    alt={`Box item ${i + 1}`}
                    width={120}
                    height={120}
                    className="w-full h-auto mx-auto"
                  />
                </div>
                <span className="text-sm font-medium">Item {i + 1}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Free In-App Games */}
        <section className="py-12 px-4 md:px-8 lg:px-12">
          <h2 className="text-2xl font-bold text-center mb-2">
            Free In-App Games
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Try these educational games included with your Junior Genius Pack
          </p>

          <Carousel className="w-full">
            <CarouselContent>
              {[...Array(4)].map((_, i) => (
                <CarouselItem
                  key={i}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-1">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <Image
                        src="/placeholder.svg?height=300&width=300"
                        alt={`Game ${i + 1}`}
                        width={300}
                        height={300}
                        className="w-full h-auto"
                      />
                      <div className="p-4">
                        <h3 className="font-medium">Game {i + 1}</h3>
                        <p className="text-sm text-gray-600">
                          Description of the game
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white text-purple-600 hover:bg-white hover:text-purple-700" />
            <CarouselNext className="bg-white text-purple-600 hover:bg-white hover:text-purple-700" />
          </Carousel>
        </section>

        {/* Device Compatibility */}
        <section className="py-12 px-4 md:px-8 lg:px-12 bg-purple-600 text-white">
          <h2 className="text-2xl font-bold text-center mb-8">
            Device Compatibility
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-bold mb-2 flex items-center">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Android"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Android
              </h3>
              <p className="text-sm">
                Android 6.0 and above
                <br />
                2GB RAM or more
                <br />
                Tablet or phone with 8" screen or larger recommended
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-bold mb-2 flex items-center">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="iOS"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                iOS
              </h3>
              <p className="text-sm">
                iOS 12.0 and above
                <br />
                iPhone 6s and above
                <br />
                iPad 5th generation and above
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-bold mb-2 flex items-center">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Amazon Fire"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                Amazon Fire
              </h3>
              <p className="text-sm">
                Fire OS 7 and above
                <br />
                Fire HD 8 (2018) and above
                <br />
                Fire HD 10 (2019) and above
              </p>
            </div>
          </div>
        </section>

        {/* Parents Also Bought */}
        <section className="py-12 px-4 md:px-8 lg:px-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Parents Also Bought
          </h2>

          <Carousel className="w-full">
            <CarouselContent>
              {[...Array(4)].map((_, i) => (
                <CarouselItem
                  key={i}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-1">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
                      <Image
                        src="/placeholder.svg?height=250&width=250"
                        alt={`Related product ${i + 1}`}
                        width={250}
                        height={250}
                        className="w-full h-auto"
                      />
                      <div className="p-4">
                        <div className="flex mb-1">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="h-3 w-3 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <h3 className="font-medium mb-1">
                          Related Product {i + 1}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Brief description
                        </p>
                        <div className="flex items-baseline">
                          <span className="font-bold">₹1,999</span>
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ₹2,499
                          </span>
                        </div>
                        <Button className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white text-sm py-1">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white text-purple-600 hover:bg-white hover:text-purple-700" />
            <CarouselNext className="bg-white text-purple-600 hover:bg-white hover:text-purple-700" />
          </Carousel>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-red-500 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8 md:p-12">
          <div>
            <h3 className="font-bold mb-4">About PlayShifu</h3>
            <p className="text-sm mb-4">
              Award-winning educational toys that combine physical play with
              digital interactions for immersive, engaging, and educational
              experiences.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-yellow-300">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </Link>
              <Link href="#" className="text-white hover:text-yellow-300">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </Link>
              <Link href="#" className="text-white hover:text-yellow-300">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Twitter"
                  width={24}
                  height={24}
                />
              </Link>
              <Link href="#" className="text-white hover:text-yellow-300">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="YouTube"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Free Shipping
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  30 Days Return
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Secure Checkout
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Device Compatibility
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-400 p-6 text-center text-sm">
          <p className="mb-4">© 2025 PlayShifu. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <Image
              src="/placeholder.svg?height=30&width=40"
              alt="Visa"
              width={40}
              height={30}
            />
            <Image
              src="/placeholder.svg?height=30&width=40"
              alt="Mastercard"
              width={40}
              height={30}
            />
            <Image
              src="/placeholder.svg?height=30&width=40"
              alt="PayPal"
              width={40}
              height={30}
            />
            <Image
              src="/placeholder.svg?height=30&width=40"
              alt="American Express"
              width={40}
              height={30}
            />
          </div>
        </div>
      </footer>
    </div>
  )
}
