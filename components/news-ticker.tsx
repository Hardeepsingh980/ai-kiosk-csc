"use client"

import { useEffect, useRef, useState } from "react"

const newsItems = [
  "Contact us: +91 99156-57570, +91 78375-31988 • ",
  "WhatsApp available for quick support • ",
  "Email us at cscjassian@gmail.com • ",
  "Professional CCTV installation and services available • ",
  "Custom printing services - Cups, T-shirts, Photo frames • "
]

export default function NewsTicker() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [duplicatedNews, setDuplicatedNews] = useState<string[]>([])

  useEffect(() => {
    // Duplicate the news items to create a seamless loop
    setDuplicatedNews([...newsItems, ...newsItems, ...newsItems])
  }, [])

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-4 overflow-hidden">
      <div className="relative flex">
        <div ref={scrollRef} className="whitespace-nowrap animate-ticker flex items-center">
          {duplicatedNews.map((item, index) => (
            <span key={index} className="text-lg font-medium px-2">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

