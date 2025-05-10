"use client"

import { useState, useEffect, useRef } from "react"
import Vapi from '@vapi-ai/web'
import { Mic, MicOff, Activity, Stethoscope, Calendar, Clock, Shield, Clipboard, FileCheck } from "lucide-react"
import HealthcareTopBar from "@/components/healthcare-top-bar"
import HealthcareVoicePanel from "@/components/healthcare-voice-panel"
import SatlujaAvatar from "@/components/satluja-avatar"

export default function SatlujaHealthcare() {
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
    vapi.start('047edd7b-23e1-41ff-8a26-7fb141aaa41a')
  }

  const stopListening = () => {
    console.log("Stopping to listen");
    vapi.stop()
  }

  return (
    <main className="flex flex-col h-screen w-screen bg-gradient-to-br from-blue-50 to-white overflow-hidden relative">
      {/* Subtle medical background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute top-10 left-10 w-16 h-16 border-2 border-blue-500 rounded-lg rotate-12" />
        <div className="absolute top-20 right-20 w-16 h-16 border-2 border-red-500 rounded-full" />
        <div className="absolute bottom-40 right-60 w-10 h-10 border-2 border-blue-500 rotate-45" />
        <div className="absolute bottom-20 left-40 w-14 h-14 border-2 border-purple-500 rounded-full" />
        <div className="absolute top-60 left-60 w-12 h-12 border-2 border-green-500 rounded-lg rotate-12" />
        <div className="absolute top-1/2 right-1/4 w-8 h-8 border-2 border-blue-500 rotate-45" />
        <div className="absolute bottom-1/3 left-1/3 w-10 h-10 border-2 border-red-500 rounded-full" />
      </div>

      <HealthcareTopBar />

      {/* Horizontal Layout Structure */}
      <div className="flex flex-1 overflow-hidden z-10">
        {/* Left Side - Avatar and Controls */}
        <div className="w-1/3 h-full flex flex-col items-center justify-center p-6 border-r border-gray-100">
          {/* Avatar Container */}
          <div className="mb-8">
            <SatlujaAvatar isListening={isListening} />
          </div>
          
          {/* Health Stats/Icons */}
          <div className="w-full grid grid-cols-3 gap-4 mb-10">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600 mt-2">Vitals</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600 mt-2">Checkup</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600 mt-2">Appointments</span>
            </div>
          </div>
          
          {/* Mic Button */}
          <button
            className={`rounded-full p-5 shadow-lg flex items-center justify-center transition-all mb-4 ${
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
          <p className="mt-2 text-center font-medium text-gray-700">
            {isConnecting ? "Connecting..." : isListening ? "Press to Stop" : "Press to Start"}
          </p>
        </div>

        {/* Right Side - Conversation Area */}
        <div className="w-2/3 h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Satluja Hospital Receptionist</h1>
                <p className="text-gray-600">Your virtual receptionist</p>
              </div>
              <div className="flex items-center text-gray-600 gap-3">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>24/7</span>
                </div>
                <div className="flex items-center text-green-600">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>Secure</span>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Info Bar - shows when in conversation */}
          {(currentState === "listening" || currentState === "processing" || currentState === "response") && (
            <div className="bg-blue-50 px-6 py-2 flex justify-between items-center border-b border-blue-100">
              <div className="flex items-center text-sm text-blue-700">
                <Clipboard className="w-4 h-4 mr-2" />
                <span>Conversation is private and not stored</span>
              </div>
              <div className="flex items-center text-sm text-blue-700">
                <FileCheck className="w-4 h-4 mr-2" />
                <span>Medical AI - {isListening ? "Listening" : "Processing"}</span>
              </div>
            </div>
          )}

          {/* Conversation Area */}
          <div className={`flex-1 p-6 overflow-y-auto ${(currentState === "default") ? "bg-white" : "bg-gradient-to-br from-white to-blue-50"}`}>
            {(currentState === "connecting" || currentState === "listening" || currentState === "processing" || currentState === "response") ? (
              <HealthcareVoicePanel
                state={currentState}
                isListening={isListening}
                isProcessing={isProcessing}
                response={response}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="max-w-lg text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Satluja</h2>
                  <p className="text-gray-500 text-sm">Click anywhere or on the microphone to start talking</p>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg text-left">
                      <h3 className="font-semibold text-blue-700">Check-in assistance</h3>
                      <p className="text-sm text-gray-600">"Where do I check in for my appointment?"</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg text-left">
                      <h3 className="font-semibold text-blue-700">Department locations</h3>
                      <p className="text-sm text-gray-600">"How do I get to the radiology department?"</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg text-left">
                      <h3 className="font-semibold text-blue-700">Appointment inquiries</h3>
                      <p className="text-sm text-gray-600">"I'm here for Dr. Sharma at 2:30pm"</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg text-left">
                      <h3 className="font-semibold text-blue-700">Visitor information</h3>
                      <p className="text-sm text-gray-600">"What are the visiting hours for ICU?"</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
} 