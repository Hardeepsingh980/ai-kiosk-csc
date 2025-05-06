"use client"

import { useState, useEffect, useRef } from "react"
import Vapi from '@vapi-ai/web'
import { Mic, MicOff } from "lucide-react"
import Avatar from "@/components/avatar"
import KotakTopBar from "@/components/kotak-top-bar"
import KotakCarousel from "@/components/kotak-carousel"
import KotakVoicePanel from "@/components/kotak-voice-panel"
import NewsTicker from "@/components/news-ticker"
import Image from "next/image"
import KotakNewsTicker from "@/components/kotak-news-ticker"

export default function KotakKiosk() {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [response, setResponse] = useState("")
  const [currentState, setCurrentState] = useState<"default" | "connecting" | "listening" | "processing" | "response">("default")
  const [vapi] = useState(() => new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!))
  const inactivityTimeout = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call started");
      setIsListening(true)
      setIsConnecting(false)
      setCurrentState("listening")
    }

    const handleCallEnd = () => {
      console.log("Call ended");
      setIsListening(false)
      setIsProcessing(false)
      setIsConnecting(false)
      setCurrentState("default")
      setResponse("")
      clearTimeout(inactivityTimeout.current)
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
      console.log(`Message received:`, message);
      
      // Reset inactivity timeout on any message
      clearTimeout(inactivityTimeout.current)
      inactivityTimeout.current = setTimeout(() => {
        if (isListening) {
          vapi.stop()
        }
      }, 5000)

      if (message.role === 'assistant') {
        if (message.type === 'transcript') {
          // Show live transcription
          setResponse(message.transcript)
          setCurrentState("listening")
        } else if (message.type === 'conversation-update') {
          // Show final response
          setResponse(message.content)
          setCurrentState("response")
        }
      }
    }

    const handleError = (error: any) => {
      console.error(`Error received: ${error.message}`);
      if (error.message === "Meeting has ended") {
        setIsListening(false)
        setIsProcessing(false)
        setIsConnecting(false)
        setCurrentState("default")
        setResponse("")
        clearTimeout(inactivityTimeout.current)
      }
    }

    vapi.on('call-start', handleCallStart)
    vapi.on('call-end', handleCallEnd)
    vapi.on('speech-start', handleSpeechStart)
    vapi.on('speech-end', handleSpeechEnd)
    vapi.on('message', handleMessage)
    vapi.on('error', handleError)

    // Add global click handler to start listening
    const handleGlobalClick = (e: MouseEvent) => {
      if (e.button === 0 && !isListening && !isConnecting) {
        startListening();
      } else if (e.button === 0 && isListening) {
        stopListening();
      }
    };
    
    document.addEventListener('click', handleGlobalClick);

    return () => {
      vapi.off('call-start', handleCallStart)
      vapi.off('call-end', handleCallEnd)
      vapi.off('speech-start', handleSpeechStart)
      vapi.off('speech-end', handleSpeechEnd)
      vapi.off('message', handleMessage)
      vapi.off('error', handleError)
      clearTimeout(inactivityTimeout.current)
      document.removeEventListener('click', handleGlobalClick);
    }
  }, [vapi, isListening, isConnecting])

  const startListening = () => {
    console.log("Starting to listen");
    setIsConnecting(true)
    setCurrentState("connecting")
    vapi.start('be6e5b89-0124-4f6c-a911-202f123a19b7') // Note: You may want to use a different assistant ID
  }

  const stopListening = () => {
    console.log("Stopping to listen");
    vapi.stop()
  }

  return (
    <main className="flex flex-col h-screen max-h-[1280px] w-full max-w-[720px] mx-auto bg-gray-50 overflow-hidden">
      <KotakTopBar />

      {/* Portrait Layout Structure */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Only show Carousel in default state */}
        {currentState === "default" && (
          <div className="w-full h-[420px] bg-white shadow-sm">
            <KotakCarousel />
          </div>
        )}

        {/* Middle Section - Content Area & Assistant */}
        <div className={`w-full ${currentState === "default" ? "flex-1" : "h-full"} bg-white overflow-hidden flex flex-col items-center justify-center`}>
          {(currentState === "connecting" || currentState === "listening" || currentState === "processing" || currentState === "response") && (
            <KotakVoicePanel
              state={currentState}
              isListening={isListening}
              isProcessing={isProcessing}
              response={response}
            />
          )}

          {currentState === "default" && (
            <div className="h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-blue-50 w-full">
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-[#ED232A] mb-2">Welcome to Kotak Mahindra Bank</h2>
                <p className="text-xl text-gray-600 mt-2">Click anywhere to start your interaction with our virtual assistant</p>
                <p className="text-xl text-gray-600 mt-2">अपनी बातचीत शुरू करने के लिए कहीं भी क्लिक करें</p>
              </div>
              
              {/* Enhanced AI Assistant Container */}
              <div className="relative w-[700px] h-[700px] flex flex-col items-center justify-center mb-4">
                {/* Avatar wrapper with fixed size */}
                <div className="relative w-[500px] h-[500px] z-10">
                  <Avatar />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* News Ticker - Bank specific news and updates */}
      <div className="w-full text-white">
        <KotakNewsTicker />
      </div>
    </main>
  )
}
