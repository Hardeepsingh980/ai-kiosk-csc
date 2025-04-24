import Image from "next/image"
import { Activity } from "lucide-react"

export default function SatlujaAvatar({ isListening }: { isListening?: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative" style={{ width: '300px', height: '300px' }}>
        <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 blur-2xl"></div>
        <Image src="/avatar_2.png" alt="Virtual Assistant" fill priority className="object-contain" />
        
        {/* Heartbeat animation when listening */}
        {isListening && (
          <div className="absolute -bottom-3 right-0 bg-white rounded-full p-2 shadow-md">
            <Activity className="h-5 w-5 text-red-500 animate-pulse" />
          </div>
        )}
        
        {/* Pulsing Effect when listening */}
        {isListening && (
          <div className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-20"></div>
        )}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl mt-4 shadow-md">
        <p className="text-lg font-medium">How can I assist with your health today?</p>
      </div>
    </div>
  )
} 