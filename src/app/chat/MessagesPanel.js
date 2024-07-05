import { useRef, useEffect } from 'react';

const MessagesPanel = ({ messages, currentUser, typingStatus }) => {
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col">
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
                <div className="bg-gray-400 p-3 rounded-lg max-w-xs">
                  {message.text}
                </div>
              </div>
            ),
          )}
        </div>
        {!!typingStatus ? (
          <div className="text-xs italic">
            <p>{typingStatus}...</p>
          </div>
        ) : null}
        <div ref={lastMessageRef} />
      </div>
    </div>
  );
};

export default MessagesPanel;
