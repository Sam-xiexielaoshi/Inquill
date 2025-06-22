import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import instance from "../lib/axios";
import Navbar from "../components/Navbar";

// This component allows users to create a new note with a title and content.
// It includes form validation to ensure that both fields are filled out before submission.
const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // This function handles the form submission for creating a new note.
  // It checks if the title and content are valid, then sends a POST request to the
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Fields cannot be empty");
      return;
    }
    if (title.length < 3 || content.length < 5) {
      toast.error(
        "Title must be at least 3 characters and content at least 5 characters"
      );
      return;
    }
    setLoading(true);
    try {
      await instance.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Slow down!, NGL you creating too fast.", {
          duration: 4000,
          icon: "🚨",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar hideAddButton={true} /> 
      <div className="max-w-7xl mx-auto p-4 mt-6">
        <div className="max-w-2xl mx-auto">
          <Link
            to={"/"}
            className="btn btn-ghost mb-6 rounded-3xl bg-opacity-70 hover:bg-opacity-50"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100 shadow-xl bg-opacity-45">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create a New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32" /* Fixed typo: extarea → textarea */
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-3xl bg-opacity-80 hover:bg-opacity-70"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
