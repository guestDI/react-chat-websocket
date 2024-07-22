'use client';

import { useRouter } from 'next/navigation';

const Profile = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6 relative">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.back()}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden w-full max-w-md relative">
        <div className="absolute top-4 right-4">
          <button
            onClick={() => {}}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
        </div>
        <div className="bg-gray-700 h-32 flex justify-center items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-800 -mt-12"
          />
        </div>
        <div className="p-6">
          <h1 className="text-xl font-semibold text-white">John Doe</h1>
          <p className="text-gray-400">@johndoe</p>
          <p className="mt-4 text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-white">Details</h2>
            <ul className="mt-2 text-gray-300">
              <li>Email: john.doe@example.com</li>
              <li>Location: New York, USA</li>
              <li>Member since: January 2020</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
