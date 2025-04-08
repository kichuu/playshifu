import Image from "next/image"

export default function ProductDetails({ product }: { product: any }) {
  return (
    <section className="px-4 py-6 md:px-8 lg:px-12 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-white border">
            <Image
              src={product.imageGallery[0]}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold md:text-3xl">{product.title}</h1>
          <p className="text-sm text-gray-600">{product.description}</p>
          <div className="flex items-center">
            <div className="flex">
              {[...Array(Math.round(product.rating))].map((_, i) => (
                <span
                  key={i}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                >
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.rating} ({product.reviewsCount} reviews)
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">
                ₹{product.discountPrice}
              </span>
              <span className="ml-2 text-lg text-gray-500 line-through">
                ₹{product.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
