"use client"

import { useEffect, useRef } from "react"
import { io } from "socket.io-client"

const useSocket = (serverPath = "http://localhost:5000") => {
  const socketRef = useRef(null)

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(serverPath, {
      transports: ["websocket", "polling"],
    })

    // Connection event handlers
    socketRef.current.on("connect", () => {
      console.log("Connected to server")
    })

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from server")
    })

    socketRef.current.on("connect_error", (error) => {
      console.error("Connection error:", error)
    })

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [serverPath])

  return socketRef.current
}

export default useSocket
