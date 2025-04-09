import Image from "next/image"
import { Clock, Phone } from "lucide-react"

export default function TopBar() {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-20 flex items-center justify-center rounded-lg bg-white shadow-md">
            <Image 
              src="https://www.freelogovectors.net/wp-content/uploads/2023/09/csc-logo-01-freelogovectors.net_.png" 
              alt="CSC Logo" 
              width={80} 
              height={60} 
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">CSC AI Support</h1>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <Clock className="h-6 w-6 text-blue-200" />
            <div className="text-base">
              <p className="font-semibold">Working Hours</p>
              <p>Monday to Saturday: 9:00 am to 7:00 pm</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 pt-4">
              <Phone className="h-6 w-6 text-blue-200" />
              <Image
                src="https://static-00.iconduck.com/assets.00/whatsapp-icon-2040x2048-8b5th74o.png"
                alt="WhatsApp"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <div className="text-base">
              <p className="font-semibold">Contact Us</p>
              <p>+91 99156-57570</p>
              <p>+91 78375-31988</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
