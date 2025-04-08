"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CarouselContext = React.createContext<{
  orientation: "horizontal" | "vertical"
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: "horizontal" | "vertical"
    opts?: any
  }
>(({ orientation = "horizontal", className, children, ...props }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const scrollPrev = React.useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current
      const scrollAmount = orientation === "horizontal" ? container.clientWidth : container.clientHeight

      if (orientation === "horizontal") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        container.scrollBy({ top: -scrollAmount, behavior: "smooth" })
      }
    }
  }, [orientation])

  const scrollNext = React.useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current
      const scrollAmount = orientation === "horizontal" ? container.clientWidth : container.clientHeight

      if (orientation === "horizontal") {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      } else {
        container.scrollBy({ top: scrollAmount, behavior: "smooth" })
      }
    }
  }, [orientation])

  const handleScroll = React.useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current

      const scrollPosition = orientation === "horizontal" ? container.scrollLeft : container.scrollTop

      const maxScroll =
        orientation === "horizontal"
          ? container.scrollWidth - container.clientWidth
          : container.scrollHeight - container.clientHeight

      setCanScrollPrev(scrollPosition > 0)
      setCanScrollNext(scrollPosition < maxScroll)
    }
  }, [orientation])

  React.useEffect(() => {
    const container = containerRef.current
    if (container) {
      handleScroll()
      container.addEventListener("scroll", handleScroll)

      return () => {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [handleScroll])

  return (
    <CarouselContext.Provider
      value={{
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div
          ref={containerRef}
          className={cn("flex overflow-auto scrollbar-hide", orientation === "horizontal" ? "flex-row" : "flex-col")}
        >
          {children}
        </div>
      </div>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel()

    return (
      <div
        ref={ref}
        className={cn("flex", orientation === "horizontal" ? "flex-row" : "flex-col", className)}
        {...props}
      />
    )
  },
)
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex-shrink-0 flex-grow-0", className)} {...props} />
  },
)
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel()

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute rounded-full",
          orientation === "horizontal"
            ? "left-2 top-1/2 -translate-y-1/2"
            : "top-2 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    )
  },
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel()

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute rounded-full",
          orientation === "horizontal"
            ? "right-2 top-1/2 -translate-y-1/2"
            : "bottom-2 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    )
  },
)
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
