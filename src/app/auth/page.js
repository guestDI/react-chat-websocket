'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../context/AuthContext';

export default function Auth() {
  const [userName, setUsername] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const { setCurrentUser } = useAuthContext();

  const onChange = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:8081/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: userName }),
    });
  };

  const disabledStyles =
    'bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50';

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-transparent">
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/3 my-6 mx-auto ">
          <div className="rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none border border-solid border-gray-300 ">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-2xl font=semibold">User Info</h3>
            </div>
            <form className="shadow-md rounded px-8 pt-6 pb-8 w-full">
              <div>
                <label className="block text-sm mb-1">Username</label>
                <input
                  value={userName}
                  onChange={onChange}
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                />
                {error ? (
                  <span className="text-xs text-red-700">{error}</span>
                ) : null}
              </div>
            </form>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 cursor-pointer"
                type="button"
                onClick={() => setUsername('')}
              >
                Reset
              </button>
              <button
                className={`text-white bg-blue-500 active:bg-blue-700 ${!userName.length ? disabledStyles : ''} font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
                type="button"
                onClick={onSubmit}
                disabled={!userName.length}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
