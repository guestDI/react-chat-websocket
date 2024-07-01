import { createPortal } from 'react-dom';

const Notification = ({ type = 'info', children, onClose }) => {
  const color = {
    info: 'blue',
    success: 'green',
    warning: 'yellow',
    error: 'red',
  };

  return createPortal(
    <div
      className="z-50 overflow-hidden p-6"
      style={{ background: color[type] }}
    >
      {children}
      <button
        className="bg-transparent border-0 text-white float-right cursor-pointer"
        onClick={onClose}
      >
        <span className="text-white opacity-7 h-6 w-6 text-xl block ">x</span>
      </button>
    </div>,
    document.getElementById('notifyContainer'),
  );
};

export default Notification;
