"use client";
import { useEffect, useState } from "react";
import LinkCard from "@/src/components/LinkCard";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: "", url: "" });

  // Fetch existing links from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/links")
      .then((res) => res.json())
      .then((data) => setLinks(data))
      .catch((err) => console.error("Error fetching links:", err));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newLink, userId: "12345" }), // Replace with real user ID later
    });

    if (response.ok) {
      const newAddedLink = await response.json();
      setLinks([...links, newAddedLink]); // Update UI with new link
      setNewLink({ title: "", url: "" }); // Clear form
    } else {
      console.error("Failed to add link");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-xl p-6 w-96 text-center">
        <h1 className="text-xl font-bold">Your Links</h1>

        {/* Add Link Form */}
        <form onSubmit={handleSubmit} className="my-4 space-y-2">
          <input
            type="text"
            placeholder="Link Title"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            placeholder="Link URL"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Link
          </button>
        </form>

        {/* Display Links */}
        <div className="space-y-4">
          {links.map((link) => (
            <LinkCard key={link._id} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
}
