"use client"
import { formatDistanceToNow } from "date-fns"

const ChatList = ({ conversations, selectedConversation, onSelectConversation, searchTerm }) => {
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage?.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatTime = (date) => {
    const now = new Date()
    const messageDate = new Date(date)
    const diffInHours = (now - messageDate) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
      })
    } else if (diffInHours < 168) {
      // 7 days
      return formatDistanceToNow(messageDate, { addSuffix: false })
    } else {
      return messageDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }
  }

  return (
    <div className="flex flex-col h-full">
      {filteredConversations.map((conversation) => (
        <div
          key={conversation._id}
          onClick={() => onSelectConversation(conversation)}
          className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
            selectedConversation?._id === conversation._id ? "bg-primary-50 border-primary-200" : ""
          }`}
        >
          <div className="relative">
            <img
              src={conversation.avatar || "/diverse-group-avatars.png"}
              alt={conversation.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {conversation.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>

          <div className="flex-1 ml-3 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 truncate">{conversation.name}</h3>
              <span className="text-xs text-gray-500 ml-2">
                {conversation.lastMessage && formatTime(conversation.lastMessage.createdAt)}
              </span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <p className="text-sm text-gray-600 truncate">{conversation.lastMessage?.content || "No messages yet"}</p>
              {conversation.unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 ml-2 min-w-[20px] text-center">
                  {conversation.unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}

      {filteredConversations.length === 0 && (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <p>No conversations found</p>
        </div>
      )}
    </div>
  )
}

export default ChatList
