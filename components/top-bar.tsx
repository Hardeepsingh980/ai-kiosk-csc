import Image from "next/image"
import { Clock, Phone } from "lucide-react"

export default function TopBar() {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-20 flex items-center justify-center rounded-xl bg-white shadow-md overflow-hidden">
            <Image 
              src="https://www.freelogovectors.net/wp-content/uploads/2023/09/csc-logo-01-freelogovectors.net_.png" 
              alt="CSC Logo" 
              width={70} 
              height={55} 
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">CSC KIOSK</h1>
            <p className="text-blue-200 text-sm font-medium">Digital Services</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-blue-800/50 px-4 py-2 rounded-xl">
            <Clock className="h-6 w-6 text-blue-100" />
            <div>
              <p className="font-semibold text-blue-100">Open Hours</p>
              <p className="text-lg font-medium">9AM - 7PM</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-blue-800/50 px-4 py-2 rounded-xl">
            <div className="flex flex-col items-center">
              <Image
                src="https://static-00.iconduck.com/assets.00/whatsapp-icon-2040x2048-8b5th74o.png"
                alt="WhatsApp"
                width={24}
                height={24}
                className="object-contain mt-1"
              />
            </div>
            <div>
              <p className="font-semibold text-blue-100">Contact</p>
              <p className="text-lg font-medium">99156-57570</p>
              <p className="text-lg font-medium">78375-31988</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
