import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

const color = {
  info: 'blue',
  success: 'green',
  warning: 'yellow',
  error: 'red',
};

let timeToDelete = 2000;

const Notification = ({ type = 'info', children, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(onClose, timeToDelete);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="z-50 overflow-hidden p-6 flex items-center justify-center"
      style={{ background: color[type] }}
    >
      {children}
      <button
        className="bg-transparent border-0 text-white float-right cursor-pointer"
        onClick={onClose}
      >
        <span className="text-white opacity-7 h-6 w-6 text-xs block ml-3">
          x
        </span>
      </button>
    </div>,
    document.getElementById('notifyContainer'),
  );
};

export default Notification;
