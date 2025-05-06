import Image from "next/image"

export default function Avatar({ className }: { className?: string }) {
  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: '460px', height: '460px' }}>
        <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 blur-2xl"></div>
        <Image src="/avatar_2.png" alt="Virtual Assistant" fill priority className="object-contain" />
      </div>
    </div>
  )
}

