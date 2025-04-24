import { Heart, HelpCircle, Menu, Search, User } from "lucide-react"
import Link from "next/link"

export default function HealthcareTopBar() {
  return (
    <div className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            <Heart className="h-6 w-6 text-red-500" />
            <span className="text-2xl font-bold text-blue-700 ml-2">Satluja</span>
          </div>
          <span className="text-sm text-gray-500 hidden sm:inline-block ml-2 bg-blue-50 px-2 py-0.5 rounded-full">
            Healthcare Assistant
          </span>
        </div>

        {/* Center Section - Hospital Name */}
        <div className="hidden md:flex items-center">
          <span className="text-lg font-semibold text-gray-800">Satluja Hospital & Research</span>
        </div>

        {/* Right Section - Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50">
            <Search className="h-5 w-5" />
          </button>
          <button className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50">
            <HelpCircle className="h-5 w-5" />
          </button>
          <button className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50">
            <User className="h-5 w-5" />
          </button>
          <Link href="/" className="ml-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
            Exit
          </Link>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-1 text-xs font-medium flex items-center justify-between">
        <span>Secure Medical Assistant</span>
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-1"></span>
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-1"></span>
            <span>Medically Verified</span>
          </div>
        </div>
      </div>
    </div>
  )
} 