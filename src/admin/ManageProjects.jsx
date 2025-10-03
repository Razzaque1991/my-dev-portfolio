import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-hot-toast";

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

  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return <p className="text-center text-red-500">You must be logged in to manage projects.</p>;

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Select a valid image");
      return;
    }
    if (newImages.length + existingImages.length >= 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }
    setNewImages((prev) => [...prev, file]);
    e.target.value = null;
  };

  const removeNewImage = (idx) => setNewImages((prev) => prev.filter((_, i) => i !== idx));
  const removeExistingImage = (idx) => setExistingImages((prev) => prev.filter((_, i) => i !== idx));

  const resetForm = () => {
    setFormData({ name: "", github: "", live: "", technologies: "", description: "" });
    setNewImages([]);
    setExistingImages([]);
    setEditingProject(null);
  };

  const uploadToImgbb = async (file) => {
    const apiKey = "bbceb0a46ed71eac1470de839002d556";
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: fd,
    });
    const result = await res.json();
    if (result.success) return result.data.url;
    throw new Error(result?.error?.message || "Image upload failed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.name.trim()) {
        toast.error("Project name is required");
        return;
      }
      if (newImages.length === 0 && existingImages.length === 0) {
        toast.error("At least one image is required");
        return;
      }

      // Upload new images
      const uploadedUrls = [];
      for (let file of newImages) {
        try {
          const url = await uploadToImgbb(file);
          uploadedUrls.push(url);
        } catch (err) {
          console.error("Image upload error:", err);
          toast.error("Image upload failed");
          return;
        }
      }

      const payload = {
        name: formData.name.trim(),
        github: formData.github.trim() || null,
        live: formData.live.trim() || null,
        description: formData.description.trim() || null,
        technologies: formData.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        images: [...existingImages, ...uploadedUrls].slice(0, 4),
      };

      console.log("Final payload:", payload);

      let res;
      if (editingProject) {
        res = await fetch(`${API_URL}/${editingProject._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Server error" }));
        throw new Error(err.message || "Failed to save project");
      }

      toast.success(editingProject ? "Project updated!" : "Project added!");
      resetForm();
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      toast.success("Project deleted");
      fetchProjects();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error");
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name || "",
      github: project.github || "",
      live: project.live || "",
      technologies: (project.technologies || []).join(", "),
      description: project.description || "",
    });
    setExistingImages(project.images || []);
    setNewImages([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">{editingProject ? "Update Project" : "Add New Project"}</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-xl p-6">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Project Name" className="w-full p-3 border rounded-md" required />
        <input type="text" name="github" value={formData.github} onChange={handleChange} placeholder="GitHub Link" className="w-full p-3 border rounded-md" />
        <input type="text" name="live" value={formData.live} onChange={handleChange} placeholder="Live Link" className="w-full p-3 border rounded-md" />
        <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} placeholder="Technologies (comma separated)" className="w-full p-3 border rounded-md" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Project Description" className="w-full p-3 border rounded-md" rows={4} />

        <input type="file" accept="image/*" onChange={handleFileSelect} className="w-full text-sm text-gray-500" />

        {existingImages.length > 0 && (
          <div className="flex gap-3 flex-wrap mt-2">
            {existingImages.map((url, i) => (
              <div key={i} className="flex flex-col items-center">
                <img src={url} alt={`old-${i}`} className="w-24 h-24 object-cover rounded-md border" />
                <button type="button" onClick={() => removeExistingImage(i)} className="mt-1 bg-red-600 text-white px-2 rounded-md text-sm">Remove</button>
              </div>
            ))}
          </div>
        )}

        {newImages.length > 0 && (
          <div className="flex gap-3 flex-wrap mt-2">
            {newImages.map((file, i) => (
              <div key={i} className="flex flex-col items-center">
                <img src={URL.createObjectURL(file)} alt={`new-${i}`} className="w-24 h-24 object-cover rounded-md border" />
                <span className="text-sm mt-1">{file.name}</span>
                <button type="button" onClick={() => removeNewImage(i)} className="mt-1 bg-red-600 text-white px-2 rounded-md text-sm">Remove</button>
              </div>
            ))}
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-md bg-blue-600 text-white">
          {isSubmitting ? "Saving..." : editingProject ? "Update Project" : "Add Project"}
        </button>

        {editingProject && <button type="button" onClick={resetForm} className="w-full py-3 mt-2 rounded-md bg-gray-500 text-white">Cancel Update</button>}
      </form>

      <hr className="my-10 border-t" />

      <h3 className="text-2xl font-bold mb-4">All Projects</h3>
      {loading ? <p>Loading...</p> : (
        <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-4 text-left">Name</th>
              <th className="border p-4 text-left hidden md:table-cell">Technologies</th>
              <th className="border p-4 text-center">Images</th>
              <th className="border p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? projects.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="border p-4">{p.name}</td>
                <td className="border p-4 hidden md:table-cell">{(p.technologies || []).join(", ")}</td>
                <td className="border p-4 flex gap-2 justify-center flex-wrap">
                  {(p.images || []).map((img, i) => (
                    <img key={i} src={img} alt={`${p.name}-${i}`} className="w-16 h-16 object-cover rounded-md border" />
                  ))}
                </td>
                <td className="border p-4 flex gap-2 justify-center">
                  <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-white px-3 py-1 rounded-md">Update</button>
                  <button onClick={() => handleDelete(p._id)} className="bg-red-600 text-white px-3 py-1 rounded-md">Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="text-center p-4">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageProjects;
