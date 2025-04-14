"use client";
import { useEffect, useState } from "react";
import { FaTrash, FaPlus, FaPen } from "react-icons/fa";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [editMode, setEditMode] = useState(null);

  const API_BASE = "http://localhost:3001/api/links";

  // ✅ Make sure fetchLinks is defined BEFORE it's used anywhere
  const fetchLinks = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      console.error("Error fetching links:", err);
    }
  };

  useEffect(() => {
    fetchLinks(); // ✅ Will work now
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = "12345";

    if (editMode) {
      const res = await fetch(`${API_BASE}/${editMode}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newLink }),
      });

      if (res.ok) {
        fetchLinks(); // ✅ Safe to call
        setEditMode(null);
      }
    } else {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newLink, userId }),
      });

      if (res.ok) {
        fetchLinks(); // ✅ Safe to call
      }
    }

    setNewLink({ title: "", url: "" });
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchLinks(); // ✅ Safe to call
    } else {
      console.error("Delete failed");
    }
  };

  const handleEdit = (link) => {
    setEditMode(link._id);
    setNewLink({ title: link.title, url: link.url });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-black shadow-2xl rounded-xl p-6 w-96 text-center text-white">
        <h1 className="text-xl font-bold">Your Links</h1>

        <form onSubmit={handleSubmit} className="my-4 space-y-2">
          <input
            type="text"
            placeholder="Link Title"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            className="w-full p-2 border rounded text-black"
          />
          <input
            type="url"
            placeholder="Link URL"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            className="w-full p-2 border rounded text-black"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2 mx-auto"
          >
            <FaPlus /> {editMode ? "Update Link" : "Add Link"}
          </button>
        </form>

        <div className="space-y-4">
          {links.map((link) => (
            <div
              key={link._id}
              className="bg-gray-800 p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{link.title}</p>
                <a href={link.url} className="text-blue-400" target="_blank">
                  {link.url}
                </a>
              </div>
              <div className="space-x-2">
                <button className="text-yellow-400" onClick={() => handleEdit(link)}>
                  <FaPen />
                </button>
                <button className="text-red-500" onClick={() => handleDelete(link._id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
