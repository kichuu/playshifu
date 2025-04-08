import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
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
          </ul>
        </div>
      </div>
      <div className="border-t border-red-400 p-6 text-center text-sm">
        <p className="mb-4">© 2025 PlayShifu. All rights reserved.</p>
      </div>
    </footer>
  )
}
