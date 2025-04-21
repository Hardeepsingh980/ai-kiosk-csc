"use client"

import { Mic, Loader2 } from "lucide-react"

interface VoicePanelProps {
  state: "connecting" | "listening" | "processing" | "response"
  isListening: boolean
  isProcessing: boolean
  response: string
}

export default function VoicePanel({ state, isListening, isProcessing, response }: VoicePanelProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white to-blue-50">
      {state === "connecting" && (
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
            <Loader2 size={80} className="text-yellow-600 animate-spin" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-4xl font-bold text-gray-800">Connecting...</h2>
            <p className="text-gray-600 text-lg">We are establishing a connection. Please wait for the greeting before speaking.</p>
            <p className="text-gray-600 text-lg">हम कनेक्शन स्थापित कर रहे हैं। कृपया अभिवादन के बाद ही बोलें।</p>
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
            <p className="text-gray-600 text-lg">You may speak now. Please speak clearly into the microphone.</p>
            <p className="text-gray-600 text-lg">अब आप बोल सकते हैं। कृपया स्पष्ट रूप से माइक्रोफोन में बोलें।</p>
          </div>
          
          {response && (
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 mt-4 max-w-md">
              <p className="text-lg leading-relaxed text-gray-700">{response}</p>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            {[...Array(7)].map((_, i) => (
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
            <Loader2 size={80} className="text-blue-600 animate-spin" />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-4xl font-bold text-gray-800">Processing your request...</h2>
            <p className="text-gray-600 text-lg">Please wait a moment</p>
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
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-3xl font-bold text-gray-800">Here's what I found</h2>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 w-full">
            <p className="text-xl leading-relaxed text-gray-700">{response}</p>
          </div>
        </div>
      )}
    </div>
  )
}
