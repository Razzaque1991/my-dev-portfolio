import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";  

const auth = getAuth(app);

const ManageComments = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  const API_URL = "https://my-dev-portfolio-server-psi.vercel.app/api/comments";

  useEffect(() => {
    const fetchToken = async () => {
      const user = auth.currentUser;
      if (user) {
        const idToken = await user.getIdToken();
        setToken(idToken);
      } else {
        setError("Admin login required");
      }
    };
    fetchToken();
  }, []);

  const fetchComments = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setComments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchComments();
  }, [token]);

  const handleApprove = async (id) => {
    await fetch(`${API_URL}/approve/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    setComments((prev) => prev.map(c => c._id === id ? { ...c, approved: true } : c));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete comment?")) return;
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setComments(prev => prev.filter(c => c._id !== id));
  };

  if (error) return <p className="text-red-500 p-6">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Comments</h2>
      {isLoading ? "Loading..." : comments.map(c => (
        <div key={c._id} className="border p-2 mb-2 flex justify-between items-center rounded">
          <div>
            <p>{c.text}</p>
            <small>{c.userEmail} · {new Date(c.createdAt).toLocaleDateString()} · {c.approved ? "✅" : "❌"}</small>
          </div>
          <div className="space-x-2">
            {!c.approved && <button onClick={() => handleApprove(c._id)} className="bg-green-600 text-white px-2 py-1 rounded">Approve</button>}
            <button onClick={() => handleDelete(c._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageComments;
