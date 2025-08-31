import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const ManageProjects = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    github: "",
    live: "",
    technologies: "",
    description: "", // Added description field
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/api/projects";

  if (!user) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>You must be logged in to add a new project.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    if (images.length >= 4) {
      alert("You can only add a maximum of 4 images.");
      e.target.value = null;
      return;
    }
    setImages((prev) => [...prev, file]);
    setError(null);
    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (images.length - 1 < 4) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (images.length === 0) {
      setError("Please add at least one image before submitting.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("github", formData.github);
      data.append("live", formData.live);
      data.append("description", formData.description); // append description

      const technologiesArray = formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech !== "");
      data.append("technologies", JSON.stringify(technologiesArray));

      images.forEach((img) => data.append("images", img));

      const res = await fetch(API_URL, {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add project.");
      }

      alert("Project added successfully!");
      setFormData({
        name: "",
        github: "",
        live: "",
        technologies: "",
        description: "",
      });
      setImages([]);
    } catch (err) {
      console.error("Submission Error:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add New Project
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., E-commerce Website"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">GitHub Link</label>
          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Live Link</label>
          <input
            type="text"
            name="live"
            value={formData.live}
            onChange={handleChange}
            placeholder="https://live-site.netlify.app"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Technologies (comma separated)</label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="e.g., React, Node.js, MongoDB"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Project Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write a brief description of your project..."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Add Project Images ({images.length} of 4)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {images.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-2">
            {images.map((img, i) => (
              <div key={i} className="relative group w-24 h-24">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`Project preview ${i + 1}`}
                  className="w-full h-full object-cover rounded-lg border-2 border-gray-300 transition-transform duration-200 transform group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
          disabled={loading || images.length === 0}
        >
          {loading ? "Submitting..." : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default ManageProjects;
