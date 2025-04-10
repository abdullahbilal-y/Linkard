import React from "react";

export default function LinkCard({ link }) {
  return (
    <div className="bg-black shadow-lg rounded-xl p-4 flex flex-col items-center">
      <h2 className="text-lg font-semibold">{link.title}</h2>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline mt-2"
      >
        {link.url}
      </a>
    </div>
  );
}
