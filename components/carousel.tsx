"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const banners = [
  {
    id: 1,
    title: "Pradhan Mantri Jan Dhan Yojana",
    description: "Open a zero-balance bank account with no minimum balance requirement.",
    icon: "💰",
    color: "from-blue-500 to-blue-600",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Aadhaar Card Services",
    description: "Update your Aadhaar details or apply for a new Aadhaar card at your nearest CSC.",
    icon: "🪪",
    color: "from-emerald-500 to-emerald-600",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Digital Literacy Program",
    description: "Learn basic computer skills and internet usage through our free training sessions.",
    icon: "💻",
    color: "from-amber-500 to-amber-600",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Bill Payment Services",
    description: "Pay your electricity, water, and mobile bills at any CSC center.",
    icon: "📄",
    color: "from-purple-500 to-purple-600",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function Carousel() {
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const goToPrevious = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToNext = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  return (
    <div className="h-full relative flex flex-col">
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentBanner
                ? "opacity-100 translate-x-0"
                : index < currentBanner
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
            }`}
          >
            <div className="h-full flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{banner.icon}</span>
                  <h2 className="text-3xl font-bold">{banner.title}</h2>
                </div>
                <p className="text-xl text-gray-700 mb-6">{banner.description}</p>
                <button
                  className={`bg-gradient-to-r ${banner.color} text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all w-max`}
                >
                  Learn More
                </button>
              </div>
              <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
                <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                  <Image src={banner.image || "/placeholder.svg"} alt={banner.title} fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        ))}


      </div>

      <div className="flex justify-center gap-2 p-4">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentBanner ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentBanner(index)}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

