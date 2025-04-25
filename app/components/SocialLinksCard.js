import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const SocialLinksCard = ({ links }) => {
  const platformIcons = {
    facebook: <FaFacebook />,
    github: <FaGithub />,
    instagram: <FaInstagram />,
    linkedin: <FaLinkedin />,
    twitter: <FaTwitter />,
    youtube: <FaYoutube />,
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {Object.entries(links).map(([platform, url]) => {
        if (!url) return null; // Skip empty links

        const Icon = platformIcons[platform.toLowerCase()] || null;

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 text-black hover:bg-blue-500 hover:text-white transition duration-300"
          >
            {Icon || <span className="text-sm">{platform}</span>}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinksCard;