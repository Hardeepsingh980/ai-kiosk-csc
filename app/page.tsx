"use client"

import { useState } from "react"
import { Mic, MicOff } from "lucide-react"
import Avatar from "@/components/avatar"
import TopBar from "@/components/top-bar"
import Carousel from "@/components/carousel"
import VoicePanel from "@/components/voice-panel"
import NewsTicker from "@/components/news-ticker"

export default function CSCKiosk() {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [response, setResponse] = useState("")
  const [currentState, setCurrentState] = useState<"default" | "listening" | "processing" | "response">("default")

  const startListening = () => {
    setIsListening(true)
    setCurrentState("listening")

    // Simulate processing after 3 seconds
    setTimeout(() => {
      setIsListening(false)
      setIsProcessing(true)
      setCurrentState("processing")

      // Simulate response after 2 more seconds
      setTimeout(() => {
        setIsProcessing(false)
        setResponse(
          `सरकारी योजनाओं के बारे में आपके अनुरोधित जानकारी:
प्रधानमंत्री जन धन योजना (PMJDY) सभी परिवारों को बैंकिंग सेवाएं प्रदान करती है।
आप केवल अपने आधार कार्ड के साथ किसी भी बैंक शाखा या सीएससी केंद्र पर शून्य शेष वाला खाता खोल सकते हैं।`
        )
        setCurrentState("response")

        // Return to default state after 10 seconds
        setTimeout(() => {
          setCurrentState("default")
          setResponse("")
        }, 10000)
      }, 2000)
    }, 3000)
  }

  const stopListening = () => {
    if (isListening) {
      setIsListening(false)
      setIsProcessing(true)
      setCurrentState("processing")
    }
  }

  return (
    <main className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      <TopBar />

      <div className="flex flex-1 overflow-hidden mb-12">
        {/* Left Panel - Avatar */}
        <div className="w-2/5 flex flex-col items-center justify-center relative bg-gradient-to-br from-white to-blue-50 p-4 shadow-sm">
          <Avatar />

          <div className="absolute bottom-8 w-full flex justify-center">
            <button
              className={`rounded-full p-6 shadow-lg flex items-center justify-center transition-all ${
                isListening
                  ? "bg-red-500 hover:bg-red-600 animate-pulse"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              }`}
              onMouseDown={startListening}
              onMouseUp={stopListening}
              onTouchStart={startListening}
              onTouchEnd={stopListening}
            >
              {isListening ? <Mic className="h-8 w-8 text-white" /> : <MicOff className="h-8 w-8 text-white" />}
            </button>
            <p className="absolute -bottom-8 text-center font-medium">
              {isListening ? "Release to stop" : "Press to speak"}
            </p>
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className="w-3/5 bg-white">
          {currentState === "default" && <Carousel />}
          {(currentState === "listening" || currentState === "processing" || currentState === "response") && (
            <VoicePanel
              state={currentState}
              isListening={isListening}
              isProcessing={isProcessing}
              response={response}
            />
          )}
        </div>
      </div>

      {/* News Ticker */}
      <NewsTicker />
    </main>
  )
}
