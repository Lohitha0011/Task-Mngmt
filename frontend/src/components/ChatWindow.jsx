"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Phone, Video, MoreHorizontal, Paperclip, Smile } from "lucide-react"

const ChatWindow = ({ conversation, messages, onSendMessage, currentUser }) => {
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      onSendMessage({
        content: newMessage.trim(),
        type: "text",
      })
      setNewMessage("")
      inputRef.current?.focus()
    }
  }

  const formatMessageTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    })
  }

  const isConsecutiveMessage = (currentMsg, prevMsg) => {
    if (!prevMsg) return false
    const timeDiff = new Date(currentMsg.createdAt) - new Date(prevMsg.createdAt)
    return currentMsg.sender._id === prevMsg.sender._id && timeDiff < 5 * 60 * 1000 // 5 minutes
  }

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
          <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={conversation.avatar || "/diverse-group-avatars.png"}
              alt={conversation.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {conversation.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{conversation.name}</h3>
            <p className="text-sm text-gray-500">{conversation.isOnline ? "Online" : "Last seen recently"}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isOwnMessage = message.sender._id === currentUser?.id
            const prevMessage = index > 0 ? messages[index - 1] : null
            const isConsecutive = isConsecutiveMessage(message, prevMessage)

            return (
              <div key={message._id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isOwnMessage ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  {!isOwnMessage && !isConsecutive && (
                    <img
                      src={message.sender.avatar || "/diverse-group-avatars.png"}
                      alt={message.sender.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  {!isOwnMessage && isConsecutive && <div className="w-8" />}

                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      isOwnMessage ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-900"
                    } ${isConsecutive ? "mt-1" : "mt-2"}`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${isOwnMessage ? "text-primary-100" : "text-gray-500"}`}>
                      {formatMessageTime(message.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <button type="button" className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Send your message..."
              className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>

          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-2 rounded-lg ${
              newMessage.trim()
                ? "bg-primary-600 text-white hover:bg-primary-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatWindow
