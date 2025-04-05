"use client"

import { useState, useEffect } from "react"
import Vapi from '@vapi-ai/web'
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
  const [vapi] = useState(() => new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!))

  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call started");
      setIsListening(true)
      setCurrentState("listening")
    }

    const handleCallEnd = () => {
      console.log("Call ended");
      setIsListening(false)
      setIsProcessing(false)
      setCurrentState("default")
    }

    const handleSpeechStart = () => {
      console.log("Speech started");
      setIsProcessing(false)
    }
    const handleSpeechEnd = () => {
      console.log("Speech ended");
      setIsProcessing(true)
    }
    
    const handleMessage = (message: any) => {
      console.log(`Message received: ${message.content}`);
      if (message.role === 'assistant' && message.type === 'conversation-update') {
        setResponse(message.content)
        setCurrentState("response")
      }
    }

    const handleError = (error: any) => {
      console.error(`Error received: ${error.message}`);
      if (error.message === "Meeting has ended") {
        setIsListening(false)
        setIsProcessing(false)
        setCurrentState("default")
      }
    }

    vapi.on('call-start', handleCallStart)
    vapi.on('call-end', handleCallEnd)
    vapi.on('speech-start', handleSpeechStart)
    vapi.on('speech-end', handleSpeechEnd)
    vapi.on('message', handleMessage)
    vapi.on('error', handleError)

    return () => {
      vapi.off('call-start', handleCallStart)
      vapi.off('call-end', handleCallEnd)
      vapi.off('speech-start', handleSpeechStart)
      vapi.off('speech-end', handleSpeechEnd)
      vapi.off('message', handleMessage)
      vapi.off('error', handleError)
    }
  }, [vapi])

  const startListening = () => {
    console.log("Starting to listen");
    vapi.start('3c7f64b9-b77b-4fa5-9c1a-69bc51070119')
  }

  const stopListening = () => {
    console.log("Stopping to listen");
    vapi.stop()
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
              onClick={isListening ? stopListening : startListening}
            >
              {isListening ? <Mic className="h-8 w-8 text-white" /> : <MicOff className="h-8 w-8 text-white" />}
            </button>
            <p className="absolute -bottom-8 text-center font-medium">
              {isListening ? "Press to Stop" : "Press to Start"}
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
