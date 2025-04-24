"use client"

import { Mic, Loader2, Activity, Heart } from "lucide-react"

interface HealthcareVoicePanelProps {
  state: "connecting" | "listening" | "processing" | "response"
  isListening: boolean
  isProcessing: boolean
  response: string
}

export default function HealthcareVoicePanel({ state, isListening, isProcessing, response }: HealthcareVoicePanelProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      {state === "connecting" && (
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
            <Loader2 size={80} className="text-yellow-600 animate-spin" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-4xl font-bold text-gray-800">Connecting...</h2>
            <p className="text-gray-600 text-lg">Establishing a secure connection to your healthcare assistant.</p>
          </div>
        </div>
      )}

      {state === "listening" && (
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
            <Mic size={80} className="text-blue-600 animate-pulse" />
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-ping opacity-20"></div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-4xl font-bold text-gray-800">Listening...</h2>
            <p className="text-gray-600 text-lg">Please describe your health concerns or questions clearly.</p>
          </div>
          
          {response && (
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 mt-4 max-w-md">
              <p className="text-lg leading-relaxed text-gray-700">{response}</p>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 bg-blue-600 rounded-full animate-sound-wave"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  height: `${Math.random() * 40 + 20}px`,
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {state === "processing" && (
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="relative">
              <Loader2 size={80} className="text-blue-600 animate-spin" />
              <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-red-500" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-4xl font-bold text-gray-800">Analyzing your query...</h2>
            <p className="text-gray-600 text-lg">Consulting medical knowledge base</p>
          </div>
          
          {response && (
            <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 mt-4 max-w-lg">
              <p className="text-xl leading-relaxed text-gray-700">{response}</p>
            </div>
          )}
        </div>
      )}

      {state === "response" && (
        <div className="flex flex-col items-center gap-6 max-w-3xl">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <Activity className="h-10 w-10 text-white" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-3xl font-bold text-gray-800">Healthcare Information</h2>
            <p className="text-gray-600 text-md mb-4">This information is for educational purposes and not a substitute for professional medical advice.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full">
            <p className="text-xl leading-relaxed text-gray-700">{response}</p>
          </div>
        </div>
      )}
    </div>
  )
} 