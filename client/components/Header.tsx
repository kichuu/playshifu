"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, Search, User, Heart, ShoppingCart } from "lucide-react"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Offer Bar */}
      <div className="bg-purple-800 text-white text-xs py-2 px-4 text-center font-medium">
        Super Saver Days! | Flat 15% off on all products | Use code: SUPER15
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-4 md:px-10">
        {/* Left: Logo */}
        <div className="flex items-center space-x-4">
          <button className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://www.playshifu.com/_next/image?url=https%3A%2F%2Fd3no6xaq2ua3a6.cloudfront.net%2Fimages%2Fbrand%2Fplayshifu-logo.webp&w=1080&q=75"
              alt="PlayShifu Logo"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-800 uppercase tracking-wide">
          <Link href="#" className="hover:text-purple-600">
            Shop By Category
          </Link>
          <Link href="#" className="hover:text-purple-600">
            Shop By Age
          </Link>
          <Link href="#" className="hover:text-purple-600">
            Deals
          </Link>
          <Link href="#" className="hover:text-purple-600">
            Bundles
          </Link>
          <Link href="#" className="hover:text-purple-600">
            Learning
          </Link>
          <Link href="#" className="hover:text-purple-600">
            All Products
          </Link>
          <Link href="#" className="hover:text-purple-600">
            Blog
          </Link>
        </nav>

        {/* Right: Search & Icons */}
        <div className="flex items-center space-x-4">
          {/* Search bar (visible on md+) */}
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="ml-2 bg-transparent outline-none w-40 text-sm placeholder:text-gray-500"
            />
          </div>
          <button className="md:hidden">
            <Search className="h-6 w-6 text-gray-700" />
          </button>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6 text-gray-700 text-sm">
            <Link
              href="#"
              className="flex flex-col items-center hover:text-purple-600"
            >
              <User className="h-5 w-5" />
              <span className="text-xs mt-0.5">Account</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center hover:text-purple-600"
            >
              <Heart className="h-5 w-5" />
              <span className="text-xs mt-0.5">Wishlist</span>
            </Link>
            <Link
              href="#"
              className="relative flex flex-col items-center hover:text-purple-600"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs mt-0.5">Cart</span>
              <span className="absolute -top-1.5 -right-2.5 bg-purple-600 text-white rounded-full text-[10px] h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
