"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

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
  const { userId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!userId) return;

    const fetchUserAndLinks = async () => {
      try {
        // Fetch user data
        const userRes = await fetch(`http://localhost:3001/api/users/id/${userId}`);
        const userData = await userRes.json();

        // Fetch links data
        const linksRes = await fetch(`http://localhost:3001/api/users/links/${userId}`);
        const linksData = await linksRes.json();

        // Combine user data and links
        setUser({ ...userData, links: linksData });
      } catch (err) {
        console.error("Error fetching user or links:", err);
      }
    };

    fetchUserAndLinks();
  }, [userId]);

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
              // Normalize platform to lowercase
              const platformKey = link.platform?.toLowerCase();
              const Icon = platformIcons[platformKey] || null;

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
        <button
          onClick={() => router.push(`/update-links/${userId}`)}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Update Links
        </button>
      </div>
    </div>
  );
}