import MessagesPanelFooter from './MessagePanelFooter';

const MessagesPanel = () => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4  border-b border-gray-200">
        <h1 className="text-xl font-semibold">Chat with User</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start">
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
              Hello! How are you?
            </div>
          </div>
          <div className="flex items-end justify-end">
            <div className="bg-gray-200 p-3 rounded-lg max-w-xs">
              Im good, thanks! How about you?
            </div>
          </div>
          {/* Add more messages as needed */}
        </div>
      </div>
    </div>
  );
};

export default MessagesPanel;
