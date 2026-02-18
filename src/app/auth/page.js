'use client';

import { useState } from 'react';
import useLogin from '../hooks/useLogin';
import Link from 'next/link';

export default function Auth() {
  const [userName, setUsername] = useState('');
  const [error, setError] = useState('');

  const { login } = useLogin();

  const onChange = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    login(userName);
  };

  const disabledStyles =
    'bg-gray-300 px-4 py-2 rounded-md cursor-not-allowed opacity-50';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
            <h1 className="text-3xl font-bold text-white mb-6 text-center">
              Login
            </h1>

            <form className="shadow-md rounded pt-6 pb-8 w-full" onSubmit={onSubmit}>
              <div>
                <label className="text-white block mb-2">Username</label>
                <input
                  value={userName}
                  onChange={onChange}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
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
                className="w-full bg-blue-500 hover:bg-blue-600  disabled:bg-gray-500 text-white font-bold py-3 rounded-lg transition"
                type="button"
                onClick={onSubmit}
                disabled={!userName.length}
              >
                Login
              </button>
            </div>
          <p className="text-gray-400 mt-4 text-center">
          Don't have an account yet?{' '}
          <Link href="/register" className="text-blue-500 hover:text-blue-400">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
