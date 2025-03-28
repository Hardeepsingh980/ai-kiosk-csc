"use client"

import { useEffect, useRef, useState } from "react"

const newsItems = [
  "New Aadhaar enrollment center opened in Sector 15 • ",
  "Digital literacy workshops starting next week • ",
  "Government launches new healthcare scheme for senior citizens • ",
  "CSC centers to offer passport services from next month • ",
  "Free computer training for women entrepreneurs • ",
  "Last date for PAN-Aadhaar linking extended • ",
  "New mobile app launched for CSC services • ",
]

export default function NewsTicker() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [duplicatedNews, setDuplicatedNews] = useState<string[]>([])

  useEffect(() => {
    // Duplicate the news items to create a seamless loop
    setDuplicatedNews([...newsItems, ...newsItems, ...newsItems])
  }, [])

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2 overflow-hidden">
      <div className="relative flex">
        <div ref={scrollRef} className="whitespace-nowrap animate-ticker flex items-center">
          {duplicatedNews.map((item, index) => (
            <span key={index} className="text-sm font-medium px-2">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

