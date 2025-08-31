import React, { useEffect, useState } from "react";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/api/comments";

  // Fetch approved comments
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch comments.");
        const data = await res.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, []);

  // Post new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !newCommentText.trim()) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newCommentText, userEmail: name }),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      const newComment = await res.json();

      // Frontend shows nothing until admin approves
      alert("Comment submitted! Waiting for admin approval.");

      setNewCommentText("");
      setName("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 min-h-screen flex flex-col">
      <h2 className="text-3xl font-bold mb-6">💬 Comments</h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          disabled={isSubmitting}
        />
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={isSubmitting || !newCommentText.trim() || !name.trim()}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </form>

      {isLoading && <div className="text-center py-8 text-gray-500">Loading comments...</div>}
      {error && <div className="text-center py-8 text-red-500">Error: {error}</div>}
      {!isLoading && comments.length === 0 && (
        <div className="text-center py-8 text-gray-500">No comments yet.</div>
      )}

      <div className="space-y-4 flex-1 overflow-y-auto">
        {comments.map((c) => (
          <div key={c._id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-800 mb-1">{c.text}</p>
            <small className="text-gray-500 text-sm">
              <span className="font-semibold">{c.userEmail}</span> · {new Date(c.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
