import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-hot-toast"; // assuming you have react-hot-toast installed

const API_URL = "https://my-dev-portfolio-server-psi.vercel.app/api/projects";

const ManageProjects = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    github: "",
    live: "",
    technologies: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  // Fetch all projects on initial load
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch projects.");
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>You must be logged in to manage projects.</p>
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
      toast.error("Please select a valid image file.");
      e.target.value = null;
      return;
    }
    if (images.length >= 4) {
      toast.error("You can only add a maximum of 4 images.");
      e.target.value = null;
      return;
    }

    setImages((prev) => [...prev, file]);
    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      github: "",
      live: "",
      technologies: "",
      description: "",
    });
    setImages([]);
    setEditingProject(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!editingProject && images.length === 0) {
      toast.error("Please add at least one image before submitting.");
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("github", formData.github);
    data.append("live", formData.live);
    data.append("description", formData.description);

    const technologiesArray = formData.technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech !== "");
    data.append("technologies", JSON.stringify(technologiesArray));

    images.forEach((img) => data.append("images", img));

    try {
      let response;
      if (editingProject) {
        response = await fetch(`${API_URL}/${editingProject._id}`, {
          method: "PUT",
          body: data,
        });
      } else {
        response = await fetch(API_URL, {
          method: "POST",
          body: data,
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save project.");
      }

      toast.success(editingProject ? "Project updated successfully!" : "Project added successfully!");
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete project.");
      }
      toast.success("Project deleted successfully!");
      fetchProjects();
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error.message || "An error occurred during deletion.");
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      github: project.github,
      live: project.live,
      technologies: project.technologies.join(", "),
      description: project.description,
    });
    setImages([]); // Clear images for the new update
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on edit
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {editingProject ? "Update Project" : "Add New Project"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-lg rounded-xl p-6"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Project Name"
          className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
          required
        />
        <input
          type="text"
          name="github"
          value={formData.github}
          onChange={handleChange}
          placeholder="GitHub Link"
          className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
        />
        <input
          type="text"
          name="live"
          value={formData.live}
          onChange={handleChange}
          placeholder="Live Link"
          className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
        />
        <input
          type="text"
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="Technologies (comma separated, e.g., React, Tailwind, Node.js)"
          className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
          rows={4}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {images.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {images.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={URL.createObjectURL(img)}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-md border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className={`w-full py-3 rounded-md transition-colors ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : editingProject
            ? "Update Project"
            : "Add Project"}
        </button>
        {editingProject && (
          <button
            type="button"
            onClick={resetForm}
            className="w-full py-3 mt-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition-colors"
          >
            Cancel Update
          </button>
        )}
      </form>
      <hr className="my-10 border-t border-gray-300" />
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">All Projects</h3>
        {loading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : (
          <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-4 text-left font-semibold">Name</th>
                <th className="border p-4 text-left font-semibold hidden md:table-cell">Technologies</th>
                <th className="border p-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                    <td className="border p-4">{p.name}</td>
                    <td className="border p-4 hidden md:table-cell">{p.technologies.join(", ")}</td>
                    <td className="border p-4">
                      <div className="flex flex-col md:flex-row gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(p)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600 transition-colors"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageProjects;