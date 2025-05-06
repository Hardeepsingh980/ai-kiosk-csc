"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const bankingServices = [
  {
    id: 1,
    title: "Savings Account",
    description: "Open a Kotak Savings Account with zero balance requirements",
    hindi: "शून्य बैलेंस आवश्यकताओं के साथ कोटक बचत खाता खोलें",
    icon: "💰",
    color: "from-red-500 to-red-600",
    image: "https://bankofindia.co.in/documents/20121/135663/SAVINGS-ACCOUNT.webp/b937dd3b-82f7-0026-b81b-e37aeec09271?t=1723190719629",
  },
  {
    id: 2,
    title: "Fixed Deposits",
    description: "Earn high interest rates on Kotak Fixed Deposits",
    hindi: "कोटक फिक्स्ड डिपॉजिट पर उच्च ब्याज दरें अर्जित करें",
    icon: "📈",
    color: "from-blue-500 to-blue-600",
    image: "https://wpblogassets.paytm.com/paytmblog/uploads/2024/03/Blog_Generic_Income-Tax-Exemptions-on-Fixed-Deposits-2025.jpg",
  },
  {
    id: 3,
    title: "Home Loans",
    description: "Apply for Kotak Home Loans with attractive interest rates",
    hindi: "आकर्षक ब्याज दरों के साथ कोटक होम लोन के लिए आवेदन करें",
    icon: "🏠",
    color: "from-green-500 to-green-600",
    image: "https://etimg.etb2bimg.com/photo/101436166.cms",
  },
  {
    id: 4,
    title: "Credit Cards",
    description: "Exclusive benefits with Kotak Credit Cards",
    hindi: "कोटक क्रेडिट कार्ड के साथ विशेष लाभ",
    icon: "💳",
    color: "from-purple-500 to-purple-600",
    image: "https://www.inspiringmeme.com/wp-content/uploads/2022/10/kotak-credit-card-types-and-benefits.jpeg",
  },
  {
    id: 5,
    title: "Personal Loans",
    description: "Quick personal loans with minimal documentation",
    hindi: "न्यूनतम दस्तावेजीकरण के साथ त्वरित व्यक्तिगत ऋण",
    icon: "📝",
    color: "from-amber-500 to-amber-600",
    image: "https://www.livemint.com/lm-img/img/2024/07/15/1600x900/Mint_Personal_loan_1719203724089_1721040217452.png",
  }
]

export default function KotakCarousel() {
  const [currentService, setCurrentService] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % bankingServices.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full relative flex flex-col">
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-blue-50 to-white">
        {bankingServices.map((service, index) => (
          <div
            key={service.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentService
                ? "opacity-100 translate-x-0"
                : index < currentService
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
            }`}
          >
            <div className="h-full flex items-center p-6">
              {/* Content on left side */}
              <div className="w-3/5 pr-6 space-y-4">
                <div className="inline-flex gap-2 mb-2">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#ED232A] to-[#B21E23] text-white rounded-full text-sm font-medium shadow-md flex items-center">
                    <span className="mr-1">{service.icon}</span> Kotak Services
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-[#003874] leading-tight">{service.title}</h2>
                
                <div className="space-y-2 mt-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm border-l-4 border-[#ED232A]">
                    <p className="text-lg font-medium text-gray-800">{service.description}</p>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg shadow-sm border-l-4 border-[#003874]">
                    <p className="text-lg font-medium text-gray-800">{service.hindi}</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <div className="h-1.5 w-16 bg-gradient-to-r from-[#ED232A] to-[#B21E23] rounded-full"></div>
                </div>
              </div>
              
              {/* Image on right side */}
              <div className="w-2/5 flex justify-center items-center">
                <div className="relative w-[240px] h-[240px] rounded-xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-white/20 z-10"></div>
                  <Image 
                    src={service.image || "/placeholder.svg"} 
                    alt={service.title} 
                    fill 
                    className="object-cover z-0"
                    sizes="240px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicators */}
      <div className="py-4 bg-white border-t border-gray-100">
        <div className="flex justify-center gap-2 px-4">
          {bankingServices.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentService 
                  ? "w-8 bg-gradient-to-r from-[#ED232A] to-[#B21E23]" 
                  : "w-2 bg-gray-200"
              }`}
              aria-label={`Service ${index + 1} of ${bankingServices.length}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 