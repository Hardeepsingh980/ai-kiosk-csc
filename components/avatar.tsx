import Image from "next/image"

export default function Avatar() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative" style={{ width: '460px', height: '460px' }}>
        <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 blur-2xl"></div>
        <Image src="/avatar_2.png" alt="Virtual Assistant" fill priority className="object-contain" />
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl mt-4 shadow-md">
        <p className="text-lg font-medium">Hello! How can I help you today?</p>
      </div>
    </div>
  )
}

