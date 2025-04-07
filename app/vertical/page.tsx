"use client"

import { useState, useEffect, useRef } from "react"
import Vapi from '@vapi-ai/web'
import { Mic, MicOff, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate, formatTime } from "@/lib/utils"

export default function AIHelpdeskKiosk() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isAgentConnected, setIsAgentConnected] = useState(false)
  const [messages, setMessages] = useState<string[]>(["How I can help you"])
  const inactivityTimeout = useRef<NodeJS.Timeout>()
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()))
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()))
  const [vapi] = useState(() => new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || ''))
  const gifRef = useRef<HTMLImageElement>(null)

  // Vapi event handlers
  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call started")
      setIsListening(true)
      setIsAgentConnected(true)
      setMessages(prev => ["I'm listening...", ...prev.slice(0, 2)])
    }

    const handleCallEnd = () => {
      console.log("Call ended")
      setIsListening(false)
      setIsProcessing(false)
      setIsAgentConnected(false)
      setMessages(["How I can help you"])
      clearTimeout(inactivityTimeout.current)
    }

    const handleSpeechStart = () => {
      console.log("Speech started")
      setIsListening(true)
      setIsProcessing(false)
    }

    const handleSpeechEnd = () => {
      console.log("Speech ended") 
      setIsListening(false)
      setIsProcessing(true)
    }
    
    const handleMessage = (message: any) => {
      console.log("Message received", message);
      
      if (message.role === 'assistant' && message.type === 'transcript') {
        // Reset inactivity timeout on any message
        clearTimeout(inactivityTimeout.current)
        inactivityTimeout.current = setTimeout(() => {
          if (isAgentConnected) {
            vapi.stop()
            setIsListening(false)
            setIsProcessing(false)
            setIsAgentConnected(false)
            setIsConnecting(false)
            setMessages(["How I can help you"])
          }
        }, 5000)

        // Only process final transcripts for display
        if (message.transcriptType === 'final') {
          setMessages(prev => [message.transcript, ...prev.slice(0, 2)])
          
          // Schedule a reset after 3 seconds of inactivity
          setTimeout(() => {
            setMessages(prev => prev[0] === message.transcript 
              ? ["How I can help you", ...prev.slice(1)] 
              : prev)
          }, 3000)
        }
      }
    }

    const handleError = (error: any) => {
      console.error(`Error received: ${error.message}`)
      if (error.message === "Meeting has ended") {
        setIsListening(false)
        setIsProcessing(false)
        setMessages(["How I can help you"])
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

  // Update time and date every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(formatTime(now))
      setCurrentDate(formatDate(now))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Control GIF animation (pause/play)
  useEffect(() => {
    if (gifRef.current) {
      if (isListening) {
        // Play the GIF by reloading it
        gifRef.current.src = "/assistant.gif?t=" + new Date().getTime()
      } else {
        // Pause by replacing with a static image
        // In a real implementation, you would capture the first frame of the GIF
        // Here we're just reusing the same GIF but it would be paused in production
        gifRef.current.src = "/assistant.png"
      }
    }
  }, [isListening])

  const startListening = async () => {
    console.log("Starting connection")
    setIsConnecting(true)
    try {
      await vapi.start('3c7f64b9-b77b-4fa5-9c1a-69bc51070119')
    } catch (error) {
      console.error("Connection failed:", error)
      setIsConnecting(false)
    }
  }

  const stopListening = () => {
    console.log("Stopping to listen")
    vapi.stop()
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header with time, date and contact */}
      <header className="p-4 flex justify-between items-center">
        <div className="text-gray-600">
          <div className="text-lg font-medium">{currentTime}</div>
          <div className="text-sm">{currentDate}</div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center text-gray-600 mb-2">
            <Phone size={16} className="mr-2" />
            <span className="text-sm">+91 6283747626</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone size={16} className="mr-2" />
            <span className="text-sm">+91 6283747627</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-between p-6">
        {/* Welcome message */}
        <div className="text-center mb-8 mt-8">
          <h2 className="text-gray-400 text-xl font-light">Hello,</h2>
          <div className="space-y-2">
            {messages.map((msg, i) => (
              <h1 
                key={i}
                className={`text-2xl font-bold ${
                  i > 0 ? "text-lg opacity-75" : ""
                }`}
              >
                {msg}
              </h1>
            ))}
          </div>
        </div>

        {/* Microphone button */}
        <div className="my-8">
          <Button
            onClick={isListening ? stopListening : startListening}
            className={`rounded-full w-16 h-16 flex items-center justify-center relative ${
              isListening ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {isProcessing ? (
              <div className="animate-spin">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            ) : isListening ? (
              <MicOff size={24} />
            ) : (
              <Mic size={24} />
            )}
          </Button>
        </div>

        {/* Assistant image at the bottom */}
        <div className="mt-auto w-full flex justify-center">
          <img ref={gifRef} src="/assistant.gif" alt="AI Assistant" className="max-h-[60vh] object-contain" />
        </div>
      </main>
    </div>
  )
}
