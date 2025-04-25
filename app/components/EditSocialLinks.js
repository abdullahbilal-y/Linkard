import React, { useState } from "react";

const EditSocialLinks = ({ initialLinks, onSave }) => {
  const [links, setLinks] = useState(initialLinks);

  const handleChange = (platform, value) => {
    setLinks({ ...links, [platform]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(links); // Pass updated links to parent component
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.keys(links).map((platform) => (
        <div key={platform} className="flex flex-col">
          <label className="text-sm font-bold capitalize">{platform}</label>
          <input
            type="url"
            placeholder={`Enter ${platform} URL`}
            value={links[platform]}
            onChange={(e) => handleChange(platform, e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditSocialLinks;