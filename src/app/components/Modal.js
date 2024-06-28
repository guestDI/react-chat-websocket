'use client';

import React, { useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';

const FIELD_EMPTY = 'Field is empty';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const displayNameRef = useRef('');
  const userNameRef = useRef('');
  const [error, setError] = useState(null);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const { handleAuth, registerUser } = useAuth(onClose);

  const onSubmit = (e) => {
    e.preventDefault();

    const displayName = displayNameRef?.current?.value;
    const userName = userNameRef.current.value;

    if (userName) {
      handleAuth(userName);
    } else {
      setError(FIELD_EMPTY);
    }

    setIsLoginForm(false);
    if (displayName && userName) {
      registerUser({
        displayName,
        userName,
      });
    } else {
      setError(FIELD_EMPTY);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-transparent">
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/3 my-6 mx-auto ">
          <div className="rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none border border-solid border-gray-300 ">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-2xl font=semibold">User Info</h3>
              <button
                className="bg-transparent border-0 text-black float-right cursor-pointer"
                onClick={onClose}
              >
                <span className="text-white opacity-7 h-6 w-6 text-xl block ">
                  x
                </span>
              </button>
            </div>
            <form className="shadow-md rounded px-8 pt-6 pb-8 w-full">
              {!isLoginForm ? (
                <div className="mb-4">
                  <label className="block text-sm mb-1">Display Name</label>
                  <input
                    ref={displayNameRef}
                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  />
                </div>
              ) : null}
              <div>
                <label className="block text-sm mb-1">Username</label>
                <input
                  ref={userNameRef}
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                />
              </div>
            </form>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              {error ? (
                <span className="text-xs text-red-700">{error}</span>
              ) : null}
              <button
                className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 cursor-pointer"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="text-white bg-blue-500 active:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={onSubmit}
              >
                {isLoginForm ? 'Login' : 'Register'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
