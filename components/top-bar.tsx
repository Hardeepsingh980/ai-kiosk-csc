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
              <p>Monday to Saturday: 9:00 am to 6:00 pm</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="h-6 w-6 text-blue-200" />
            <div className="text-base">
              <p className="font-semibold">Contact Us</p>
              <p>Toll Free: 1800-123-4567</p>
              <p>Mobile: +91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
