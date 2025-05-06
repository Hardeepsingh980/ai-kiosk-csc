"use client"

import { useEffect, useRef, useState } from "react"

const newsItems = [
  "Kotak Mahindra Bank announces 6.25% interest rate on savings accounts • ",
  "New Kotak credit card with 5% cashback on all transactions • ",
  "Visit our nearest branch for instant account opening • ",
  "Kotak mobile banking app now available with voice commands • ",
  "Special FD rates of 7.5% for senior citizens • ",
  "Zero balance digital savings account now available • "
]

export default function KotakNewsTicker() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [duplicatedNews, setDuplicatedNews] = useState<string[]>([])

  useEffect(() => {
    // Duplicate the news items to create a seamless loop
    setDuplicatedNews([...newsItems, ...newsItems, ...newsItems])
  }, [])

  return (
    <div className="bg-gradient-to-r from-[#003874] to-[#ED232A] text-white py-4 overflow-hidden">
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

