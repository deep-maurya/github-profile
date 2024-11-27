"use client";

import { useState } from "react";
import LabelandCount from "./components/LabelandCount";
import { ArrowBigLeft, ArrowBigRightIcon, ArrowRightCircle, Camera } from 'lucide-react';
import localStorageUtils from "./utils/localStrorag";

export default function Home() {
  const [username, setUsername] = useState(""); // For the GitHub username input
  const [userData, setUserData] = useState(null); // For storing the fetched GitHub data
  const [error, setError] = useState(null); // For error handling

  const fetchGitHubData = async () => {
    if (!username) {
      setError("Please enter a GitHub username.");
      return;
    }
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      const searchRecords = localStorageUtils.getItem("searchRecords") || [];
      if (!searchRecords.includes(username)) {
        searchRecords.push(username);
        localStorageUtils.setItem("searchRecords", searchRecords);
      }
      setUserData(data);
    } catch (err) {
      setError(err.message);
      setUserData(null);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center p-4">
      {error && <p className="text-red-500 bg-red-200 w-full max-w-md mb-5 font-extrabold p-3 rounded-lg text-center mt-4">{error}</p>}
      {!userData && <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md text-center">
        <h1 className="text-xl font-bold mb-4 text-gray-700">GitHub User Data Extractor</h1>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 text-blue-600 font-bold text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchGitHubData}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Fetch Data
        </button>
        
      </div>}

      {userData && (
        <>
          <div className="bg-white text-center p-6 mt-6 rounded-md shadow-md w-full max-w-md">
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h2 className="text-lg text-blue-500 font-bold mb-2">{userData.name || "No Name Available"}</h2>
            <p className="text-blue-500 bg-gree mb-2">@{userData.login}</p>
            <p className="text-gray-600 font-semibold mb-4">{userData.bio || "No Bio Available"}</p>
            <div className="grid grid-cols-3 gap-4 justify-between">
              <LabelandCount value={userData.public_repos} label={"Repo"} color={"blue"}/>
              <LabelandCount value={userData.followers} label={"Followers"} color={"blue"}/>
              <LabelandCount value={userData.following} label={"Following"} color={"blue"}/>
            </div>
          </div>
          <button onClick={()=>setUserData(null)} className="bg-blue-200 flex gap-2 justify-center text-blue-500 font-bold text-center p-3 mt-6 rounded-sm shadow-md w-full max-w-md transition-all duration-300 ease-in-out transform hover:gap-3 hover:-rotate-2 hover:scale-105">
            Search another profile <ArrowRightCircle />
          </button>

         </>
      )}
      {localStorageUtils.getItem("searchRecords")?.length > 0 ? (
        <div className="bg-white text-center p-4 mt-6 rounded-md shadow-md w-full max-w-md">
          <h3 className="text-lg font-bold text-gray-700 pb-2 border-b-[1px]">Search History</h3>
          <ul className="text-gray-600 pt-2">
            {localStorageUtils.getItem("searchRecords").map((record, index) => (
              <li key={index} className="mb-2 font-bold">
                {record}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-red-500 font-bold max-w-md p-2 text-center w-full bg-red-200 mt-6">No search history available.</p>
      )}
    </div>
  );
}
