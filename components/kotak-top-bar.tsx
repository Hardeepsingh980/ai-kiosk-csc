import Image from "next/image"
import { Clock, Phone } from "lucide-react"

export default function KotakTopBar() {
  return (
    <header className="bg-gradient-to-r from-[#003874] to-[#ED232A] text-white shadow-lg py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-32 flex items-center justify-center rounded-xl bg-white shadow-md overflow-hidden">
            <Image 
              src="/kotak.png" 
              alt="Kotak Mahindra Bank Logo" 
              width={90} 
              height={40} 
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">KOTAK BANK</h1>
            <p className="text-blue-200 text-sm font-medium">Digital Banking Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#002A55] px-3 py-1.5 rounded-lg">
            <Clock className="h-5 w-5 text-blue-100" />
            <div>
              <p className="font-semibold text-blue-100 text-xs">Branch Hours</p>
              <p className="text-sm font-medium">9:30AM - 4:30PM</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#002A55] px-3 py-1.5 rounded-lg">
            <Phone className="h-5 w-5 text-blue-100" />
            <div>
              <p className="font-semibold text-blue-100 text-xs">Customer Care</p>
              <p className="text-sm font-medium">1800 209 8800</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 