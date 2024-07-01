const MessagesPanel = ({ messages, currentUser }) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4  border-b border-gray-200">
        <h1 className="text-xl font-semibold">
          Chat with {currentUser.displayName}
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message) =>
            message.userName === currentUser.userName ? (
              <div className="flex items-start" key={message.id}>
                <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                  {message.text}
                </div>
              </div>
            ) : (
              <div className="flex items-end justify-end" key={message.id}>
                <div className="bg-gray-200 p-3 rounded-lg max-w-xs">
                  {message.text}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPanel;
