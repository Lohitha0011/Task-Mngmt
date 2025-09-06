"use client"

import { useState, useEffect } from "react"
import SearchBar from "../components/SearchBar"
import ChatList from "../components/ChatList"
import ChatWindow from "../components/ChatWindow"
import useSocket from "../hooks/useSocket"

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const socket = useSocket()

  // Mock current user - in real app, this would come from auth context
  const [currentUser] = useState({
    id: "current-user-id",
    name: "Current User",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  })

  // Mock conversations data - in real app, this would come from API
  const [conversations] = useState([
    {
      _id: "1",
      name: "Angelle Crison",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      isOnline: true,
      unreadCount: 1,
      lastMessage: {
        content: "Thank you very much. I'm glad...",
        createdAt: "2024-01-15T10:30:00Z",
      },
    },
    {
      _id: "2",
      name: "Jakob Saris",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      isOnline: false,
      unreadCount: 0,
      lastMessage: {
        content: "You should learning tell you about it.",
        createdAt: "2024-01-15T09:15:00Z",
      },
    },
    {
      _id: "3",
      name: "Emery Korsgaard",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      isOnline: false,
      unreadCount: 1,
      lastMessage: {
        content: "There is. You are very helpful.",
        createdAt: "2024-01-15T08:45:00Z",
      },
    },
    {
      _id: "4",
      name: "Jeremy Zucker",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      isOnline: true,
      unreadCount: 0,
      lastMessage: {
        content: "You. So let me teach you about...",
        createdAt: "2024-01-15T07:20:00Z",
      },
    },
    {
      _id: "5",
      name: "Nadia Lauren",
      avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
      isOnline: false,
      unreadCount: 1,
      lastMessage: {
        content: "Is there anything I can help? Just...",
        createdAt: "2024-01-15T06:10:00Z",
      },
    },
    {
      _id: "6",
      name: "Jason Statham",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
      isOnline: false,
      unreadCount: 0,
      lastMessage: {
        content: "You. So let me share about...",
        createdAt: "2024-01-15T05:30:00Z",
      },
    },
    {
      _id: "7",
      name: "Angel Kimberly",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      isOnline: false,
      unreadCount: 1,
      lastMessage: {
        content: "Okay. I know very well about it.",
        createdAt: "2024-01-15T04:45:00Z",
      },
    },
    {
      _id: "8",
      name: "Jason Momoa",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      isOnline: false,
      unreadCount: 0,
      lastMessage: {
        content: "You. So let me tell you about...",
        createdAt: "2024-01-15T03:20:00Z",
      },
    },
  ])

  // Mock messages for selected conversation
  const [conversationMessages] = useState({
    1: [
      {
        _id: "msg1",
        content: "Morning Angelle, I have question about My task",
        sender: { _id: "current-user-id", name: "Current User", avatar: "/Photo 1-2.png" },
        createdAt: "2024-01-15T09:45:00Z",
      },
      {
        _id: "msg2",
        content: "Yes sure. Any problem with your assignment?",
        sender: { _id: "1", name: "Angelle Crison", avatar: "/Photo 1-3.png" },
        createdAt: "2024-01-15T09:47:00Z",
      },
      {
        _id: "msg3",
        content: "How to make a responsive display from the dashboard?",
        sender: { _id: "current-user-id", name: "Current User", avatar: "/Photo 1-2.png" },
        createdAt: "2024-01-15T09:50:00Z",
      },
      {
        _id: "msg4",
        content: "No plugins. You just have to make it smaller according to the size of the phone.",
        sender: { _id: "1", name: "Angelle Crison", avatar: "/Photo 1-3.png" },
        createdAt: "2024-01-15T09:52:00Z",
      },
      {
        _id: "msg5",
        content: "Is there a plugin to do this task?",
        sender: { _id: "current-user-id", name: "Current User", avatar: "/Photo 1-2.png" },
        createdAt: "2024-01-15T09:55:00Z",
      },
      {
        _id: "msg6",
        content: "Thank you very much. I'm glad you asked about the assignment",
        sender: { _id: "1", name: "Angelle Crison", avatar: "/Photo 1-3.png" },
        createdAt: "2024-01-15T10:30:00Z",
      },
    ],
    2: [
      {
        _id: "msg7",
        content: "Hey Jakob, how are you?",
        sender: { _id: "current-user-id", name: "Current User", avatar: "/Photo 1-2.png" },
        createdAt: "2024-01-15T09:10:00Z",
      },
      {
        _id: "msg8",
        content: "You should learning tell you about it.",
        sender: { _id: "2", name: "Jakob Saris", avatar: "/Photo 1-4.png" },
        createdAt: "2024-01-15T09:15:00Z",
      },
    ],
  })

  useEffect(() => {
    if (selectedConversation) {
      setMessages(conversationMessages[selectedConversation._id] || [])
    }
  }, [selectedConversation, conversationMessages])

  useEffect(() => {
    if (socket) {
      // Listen for new messages
      socket.on("new_message", (message) => {
        if (selectedConversation && message.conversation === selectedConversation._id) {
          setMessages((prev) => [...prev, message])
        }
      })

      // Join conversation room when selected
      if (selectedConversation) {
        socket.emit("join_conversation", selectedConversation._id)
      }

      return () => {
        socket.off("new_message")
      }
    }
  }, [socket, selectedConversation])

  const handleSendMessage = (messageData) => {
    if (!selectedConversation || !socket) return

    const newMessage = {
      _id: `temp-${Date.now()}`,
      content: messageData.content,
      type: messageData.type,
      sender: currentUser,
      conversation: selectedConversation._id,
      createdAt: new Date().toISOString(),
    }

    // Optimistically add message to UI
    setMessages((prev) => [...prev, newMessage])

    // Send message via socket
    socket.emit("send_message", {
      conversationId: selectedConversation._id,
      content: messageData.content,
      type: messageData.type,
    })
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Message</h1>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Chat List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search Name" />
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            <ChatList
              conversations={conversations}
              selectedConversation={selectedConversation}
              onSelectConversation={setSelectedConversation}
              searchTerm={searchTerm}
            />
          </div>
        </div>

        {/* Right Panel - Chat Window */}
        <ChatWindow
          conversation={selectedConversation}
          messages={messages}
          onSendMessage={handleSendMessage}
          currentUser={currentUser}
        />
      </div>
    </div>
  )
}

export default Messages
