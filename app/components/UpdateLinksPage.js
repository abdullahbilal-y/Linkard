"use client";

import { useState, useEffect } from "react";

const predefinedPlatforms = [
  "Facebook",
  "GitHub",
  "Instagram",
  "LinkedIn",
  "Twitter",
  "YouTube",
];

export default function UpdateLinksPage() {
  const [links, setLinks] = useState(
    predefinedPlatforms.reduce((acc, platform) => {
      acc[platform.toLowerCase()] = "";
      return acc;
    }, {})
  );
  const [customLinks, setCustomLinks] = useState([]);
  const [customPlatform, setCustomPlatform] = useState({ name: "", url: "" });

  const userId = "12345"; // Replace with the actual user ID

  // Fetch existing links from the backend
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch(`/api/users/links/${userId}`);
        const data = await res.json();
        if (data.links) {
          const predefined = {};
          const custom = [];
          data.links.forEach((link) => {
            if (predefinedPlatforms.includes(link.platform)) {
              predefined[link.platform.toLowerCase()] = link.url;
            } else {
              custom.push(link);
            }
          });
          setLinks(predefined);
          setCustomLinks(custom);
        }
      } catch (err) {
        console.error("Error fetching links:", err);
      }
    };

    fetchLinks();
  }, []);

  const handleChange = (platform, value) => {
    setLinks({ ...links, [platform.toLowerCase()]: value });
  };

  const handleCustomChange = (field, value) => {
    setCustomPlatform({ ...customPlatform, [field]: value });
  };

  const addCustomPlatform = () => {
    if (customPlatform.name && customPlatform.url) {
      setCustomLinks([...customLinks, customPlatform]);
      setCustomPlatform({ name: "", url: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allLinks = [
      ...Object.entries(links)
        .filter(([_, url]) => url)
        .map(([platform, url]) => ({ platform, url })),
      ...customLinks,
    ];

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ links: allLinks }),
      });

      if (res.ok) {
        alert("Links saved successfully!");
      } else {
        console.error("Failed to save links");
      }
    } catch (err) {
      console.error("Error saving links:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Your Links</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Predefined Platforms */}
        {predefinedPlatforms.map((platform) => (
          <div key={platform} className="flex flex-col">
            <label className="text-sm font-bold">{platform}</label>
            <input
              type="url"
              placeholder={`Enter ${platform} URL`}
              value={links[platform.toLowerCase()]}
              onChange={(e) => handleChange(platform, e.target.value)}
              className="p-2 border rounded"
            />
          </div>
        ))}

        {/* Custom Platforms */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Add Custom Platform</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Platform Name"
              value={customPlatform.name}
              onChange={(e) => handleCustomChange("name", e.target.value)}
              className="p-2 border rounded flex-1"
            />
            <input
              type="url"
              placeholder="Platform URL"
              value={customPlatform.url}
              onChange={(e) => handleCustomChange("url", e.target.value)}
              className="p-2 border rounded flex-1"
            />
            <button
              type="button"
              onClick={addCustomPlatform}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <ul>
            {customLinks.map((link, index) => (
              <li key={index} className="text-sm">
                {link.name}: {link.url}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Links
        </button>
      </form>
    </div>
  );
}