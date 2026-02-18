const ChatHeader = ({ channelName, onLeaveChannel, onJoinChannel, isUserInChannel }) => {
  const disabledStyles =
    'bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50';

  return (
    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
      <h1 className="text-xl font-semibold">
        {channelName ?? 'Select channel'}{' '}
      </h1>
      {!isUserInChannel ? <button
        className={`text-white bg-blue-500 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
        type="button"
        onClick={onJoinChannel}
      >
        Join
      </button> :
      <button
        className={`text-white bg-red-500 active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
        type="button"
        onClick={onLeaveChannel}
        disabled={!channelName}
      >
        Leave channel
      </button>}
    </div>
  );
};

export default ChatHeader;
