import React from "react";
export default ({ value, onChange, onSearch }) => (
  <div className="flex gap-2 mb-4">
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 flex-1"
      placeholder="Search movies..."
    />
    <button onClick={onSearch} className="bg-blue-600 text-white px-4">
      Search
    </button>
  </div>
);
