"use client"

import { useState, useEffect, useRef } from "react"
import Vapi from '@vapi-ai/web'
import { Mic, MicOff } from "lucide-react"
import Avatar from "@/components/avatar"
import TopBar from "@/components/top-bar"
import Carousel from "@/components/carousel"
import VoicePanel from "@/components/voice-panel"
import NewsTicker from "@/components/news-ticker"
import KotakKiosk from "./kotak/page"
import SatlujaHealthcare from "./hospital"

export default function CSCKiosk() {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [response, setResponse] = useState("")
  const [currentState, setCurrentState] = useState<"default" | "connecting" | "listening" | "processing" | "response">("default")
  const [vapi] = useState(() => new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!))
  const inactivityTimeout = useRef<NodeJS.Timeout | undefined>(undefined)


  return (
    <KotakKiosk />
  )

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
    vapi.start('3c7f64b9-b77b-4fa5-9c1a-69bc51070119')
  }

  const stopListening = () => {
    console.log("Stopping to listen");
    vapi.stop()
  }

  return (
    <main className="flex flex-col h-screen max-h-[1280px] w-full max-w-[720px] mx-auto bg-gray-50 overflow-hidden">
      <TopBar />

      {/* Portrait Layout Structure */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Only show Carousel in default state */}
        {currentState === "default" && (
          <div className="w-full h-[420px] bg-white shadow-sm">
            <Carousel />
          </div>
        )}

        {/* Middle Section - Content Area & Assistant */}
        <div className={`w-full ${currentState === "default" ? "flex-1" : "h-full"} bg-white overflow-hidden flex flex-col items-center justify-center`}>
          {(currentState === "connecting" || currentState === "listening" || currentState === "processing" || currentState === "response") && (
            <VoicePanel
              state={currentState}
              isListening={isListening}
              isProcessing={isProcessing}
              response={response}
            />
          )}

          {currentState === "default" && (
            <div className="h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-blue-50 w-full">
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome to CSC Kiosk</h2>
                <p className="text-xl text-gray-600 mt-2">Click the button below to start your interaction</p>
                <p className="text-xl text-gray-600 mt-2">अपनी बातचीत शुरू करने के लिए नीचे दिए गए बटन पर क्लिक करें</p>
              </div>
              
              {/* Enhanced AI Assistant Container - Optimized for 720x1280 */}
              <div className="relative w-[700px] h-[700px] flex flex-col items-center justify-center mb-4">
                {/* Avatar wrapper with fixed size for 720x1280 */}
                <div className="relative w-[500px] h-[500px] z-10">
                  <Avatar />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Section - Helpdesk/Interaction */}
        {/* <div className="w-full h-[120px] bg-gradient-to-b from-blue-50 to-white py-4 shadow-inner flex items-center justify-center">
          <div className="flex flex-col items-center">
            <button
              className={`rounded-full p-5 shadow-lg flex items-center justify-center transition-all ${
                isConnecting
                  ? "bg-yellow-500 hover:bg-yellow-600 animate-pulse"
                  : isListening
                    ? "bg-red-500 hover:bg-red-600 animate-pulse"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              }`}
              onClick={isListening ? stopListening : startListening}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <div className="h-8 w-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : isListening ? (
                <Mic className="h-8 w-8 text-white" />
              ) : (
                <MicOff className="h-8 w-8 text-white" />
              )}
            </button>
            <p className="mt-2 text-center font-medium text-sm text-gray-700">
              {isConnecting ? "Connecting..." : isListening ? "Press to Stop" : "Press to Start"}
            </p>
          </div>
        </div> */}
      </div>

      {/* News Ticker at bottom */}
      <NewsTicker />
    </main>
  )
}
