"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const banners = [
  {
    id: 1,
    title: "New Service: Third Party Motor Insurance, On Govt. Fees",
    description: "नई सेवा: थर्ड पार्टी मोटर बीमा, सरकारी शुल्क पर",
    punjabi: "ਨਵੀਂ ਸੇਵਾ: ਥਰਡ ਪਾਰਟੀ ਮੋਟਰ ਬੀਮਾ, ਸਰਕਾਰੀ ਫੀਸ 'ਤੇ",
    icon: "⭐",
    color: "from-blue-500 to-blue-600",
    image: "https://finoplus.in/wp-content/uploads/2022/06/Motor-Insurance.png",
  },
  {
    id: 2,
    title: "Air Ticket/Train Ticket Booking",
    description: "हवाई टिकट/ट्रेन टिकट बुकिंग",
    punjabi: "ਹਵਾਈ ਟਿਕਟ/ਟਰੇਨ ਟਿਕਟ ਬੁਕਿੰਗ",
    icon: "🎫", 
    color: "from-emerald-500 to-emerald-600",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc5QCz0kLIyajEW_93GUmQ68qzWUao3_46Rg&s",
  },
  {
    id: 3,
    title: "Ayushman Card, Only Adhaar Card Needed (Age 70+), 5 Lakh Free Insurance",
    description: "आयुष्मान कार्ड, केवल आधार कार्ड चाहिए (70+ उम्र), 5 लाख मुफ्त बीमा",
    punjabi: "ਆਯੂਸ਼ਮਾਨ ਕਾਰਡ, ਸਿਰਫ਼ ਆਧਾਰ ਕਾਰਡ ਦੀ ਲੋੜ ਹੈ (70+ ਉਮਰ), 5 ਲੱਖ ਮੁਫ਼ਤ ਬੀਮਾ",
    icon: "💳",
    color: "from-amber-500 to-amber-600",
    image: "https://static.langimg.com/photo/imgsize-35120,msid-119966529/navbharat-times.jpg",
  },
  {
    id: 4,
    title: "Driving License, Learning License",
    description: "ड्राइविंग लाइसेंस, लर्निंग लाइसेंस",
    punjabi: "ਡਰਾਈਵਿੰਗ ਲਾਇਸੈਂਸ, ਲਰਨਿੰਗ ਲਾਇਸੈਂਸ",
    icon: "📄",
    color: "from-purple-500 to-purple-600",
    image: "https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/panjab-driving-licence.jpg",
  },
  {
    id: 5,
    title: "Caste Certificate, Residence Certificate, Income Certificate, EWS Certificate",
    description: "जाति प्रमाणपत्र, निवास प्रमाणपत्र, आय प्रमाणपत्र, ईडब्ल्यूएस प्रमाणपत्र",
    punjabi: "ਜਾਤੀ ਸਰਟੀਫਿਕੇਟ, ਰਿਹਾਇਸ਼ੀ ਸਰਟੀਫਿਕੇਟ, ਆਮਦਨ ਸਰਟੀਫਿਕੇਟ, ਈਡਬਲਯੂਐਸ ਸਰਟੀਫਿਕੇਟ",
    icon: "🖼️",
    color: "from-red-500 to-red-600",
    image: "https://imagesvs.oneindia.com/img/2018/06/caste-certificate-1529312936.jpg",
  },
  {
    id: 6,
    title: "Old Age Pension, Widow Pension, Disability Pension",
    description: "पुरानी आयु पेंशन, विधान पेंशन, विकलांगता पेंशन",
    punjabi: "ਬੁਢਾਪਾ ਪੈਨਸ਼ਨ, ਵਿਧਵਾ ਪੈਨਸ਼ਨ, ਅਪਾਹਜ ਪੈਨਸ਼ਨ",
    icon: "👵",
    color: "from-blue-500 to-blue-600",
    image: "https://english.mathrubhumi.com/image/contentid/policy:1.9863341:1725165104/pension.jpg?$p=47f4407&f=16x10&w=852&q=0.8",
  },
  {
    id: 7,
    title: "Bank Account Opening - Kotak Mahindra Bank/Axis Bank",
    description: "कोटक महिंद्रा बैंक में खाता खोलें/अक्सिस बैंक में खाता खोलें",
    punjabi: "ਕੋਟਕ ਮਹਿੰਦਰਾ ਬੈਂਕ ਵਿੱਚ ਖਾਤਾ ਖੋਲ੍ਹੋ/ਅਕਸਿਸ ਬੈਂਕ ਵਿੱਚ ਖਾਤਾ ਖੋਲ੍ਹੋ",
    icon: "🏦",
    color: "from-red-500 to-red-600",
    image: "https://img.etimg.com/thumb/width-1200,height-1200,imgsize-102101,resizemode-75,msid-90394731/industry/banking/finance/banking/kotak-axis-acquire-nearly-8-stake-each-in-ondc.jpg",
  },
  {
    id: 8,
    title: "Passport Size Photos - Instant Print",
    description: "पासपोर्ट साइज फोटो - तुरंत प्रिंट",
    punjabi: "ਪਾਸਪੋਰਟ ਸਾਈਜ਼ ਫੋਟੋ - ਤੁਰੰਤ ਪ੍ਰਿੰਟ",
    icon: "📸",
    color: "from-purple-500 to-purple-600", 
    image: "https://www.photoland.in/wp-content/uploads/2022/03/1-Passport-photo-900x900.jpg",
  },
  {
    id: 9,
    title: "CCTV Camera Installation & Services",
    description: "सीसीटीवी कैमरा इंस्टालेशन और सर्विसेज",
    punjabi: "ਸੀਸੀਟੀਵੀ ਕੈਮਰਾ ਇੰਸਟਾਲੇਸ਼ਨ ਅਤੇ ਸੇਵਾਵਾਂ",
    icon: "📹",
    color: "from-emerald-500 to-emerald-600",
    image: "https://www.clearway.co.uk/wp-content/uploads/2020/09/temp-and-fixed.jpg",
  },
  {
    id: 10,
    title: "Custom Printing - Cups, T-shirts, Photo Frames",
    description: "कस्टम प्रिंटिंग - कप, टी-शर्ट, फोटो फ्रेम",
    punjabi: "ਕਸਟਮ ਪ੍ਰਿੰਟਿੰਗ - ਕੱਪ, ਟੀ-ਸ਼ਰਟ, ਫੋਟੋ ਫਰੇਮ",
    icon: "🖨️",
    color: "from-amber-500 to-amber-600",
    image: "https://5.imimg.com/data5/ANDROID/Default/2023/8/334548887/GW/RU/FZ/98698794/product-jpeg-500x500.jpg",
  },
  {
    id: 11,
    title: "Police Clearance Certificate (PCC) for Foreign Countries/Private Job",
    description: "विदेशी देशों/ नौकरी के लिए पुलिस क्लीयरेंस सर्टिफिकेट",
    punjabi: "ਵਿਦੇਸ਼ੀ ਦੇਸ਼ਾਂ/ ਨੌਕਰੀ ਲਈ ਪੁਲਿਸ ਕਲੀਅਰੈਂਸ ਸਰਟੀਫਿਕੇਟ",
    icon: "🌏",
    color: "from-sky-500 to-sky-600",
    image: "https://www.vidhikarya.com/images/blog_images/significance-of-a-police-clearance-certificate-pcc-in-a-pending-accident-case.jpg"
  },
  {
    id: 12,
    title: "SIM Report / Document Report / Passport FIR / License FIR",
    description: "सिम रिपोर्ट / दस्तावेज़ रिपोर्ट / पासपोर्ट एफआईआर / लाइसेंस एफआईआर",
    punjabi: "ਸਿਮ ਰਿਪੋਰਟ / ਦਸਤਾਵੇਜ਼ ਰਿਪੋਰਟ / ਪਾਸਪੋਰਟ ਐਫਆਈਆਰ / ਲਾਇਸ਼ਨ ਐਫਆਈਆਰ",
    icon: "📄",
    color: "from-indigo-500 to-indigo-600",
    image: "https://www.morungexpress.com/uploads/2020/10/11399898_1603821464_FIR%20sample.jpg"
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
            <div className="h-full flex flex-col md:flex-row items-center bg-gradient-to-br from-white to-gray-50">
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <div className="inline-flex gap-2 mb-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-lg font-medium shadow-md">
                    🎉 New Service
                  </span>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">{banner.title}</h2>
                  <p className="text-2xl font-bold text-gray-800">{banner.description}</p>
                  <p className="text-2xl font-bold text-gray-800">{banner.punjabi}</p>
                </div>
             
              </div>
              <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
                <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                  <Image 
                    src={banner.image || "/placeholder.svg"} 
                    alt={banner.title} 
                    fill 
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 p-6">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`h-3 rounded-full transition-all ${
              index === currentBanner 
                ? "w-8 bg-gradient-to-r from-blue-600 to-blue-700" 
                : "w-3 bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentBanner(index)}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
