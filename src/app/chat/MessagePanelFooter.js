"use client"

const MessagesPanelFooter = () => {
    return (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <input type="text" className="flex-1 p-2 border border-gray-300 rounded-lg" placeholder="Type a message..." />
            <button className="bg-blue-500 text-white p-2 rounded-lg">Send</button>
          </div>
        </div>
    )
}

export default MessagesPanelFooter;