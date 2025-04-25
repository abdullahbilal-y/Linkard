"use client";

import { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
 import Link from "next/link";

const platformIcons = {
  facebook: <FaFacebook />,
  github: <FaGithub />,
  instagram: <FaInstagram />,
  linkedin: <FaLinkedin />,
  twitter: <FaTwitter />,
  youtube: <FaYoutube />,
};

export default function ShowLinksPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/users/username"); // Replace with actual username
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-96 text-center transform hover:scale-105 transition duration-300">
        <img
          src={user.profilePic || "/default-profile.jpg"}
          alt={user.name}
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {user.links?.length > 0 ? (
            user.links.map((link, index) => {
              const Icon = platformIcons[link.platform.toLowerCase()] || null;
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-black hover:bg-blue-500 hover:text-white transition duration-300"
                >
                  {Icon || <span className="text-sm">{link.platform}</span>}
                </a>
              );
            })
          ) : (
            <p className="text-gray-500">No links available</p>
          )}
        </div>
        {/* Button to navigate to UpdateLinksPage */}
        <Link href="/update-links">
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Update Links
          </button>
        </Link>
      </div>
    </div>
  );
}