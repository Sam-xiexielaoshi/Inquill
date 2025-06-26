import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router"; // Fix this import!
import instance from "../lib/axios";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import { ArrowLeftIcon, BadgeMinus, Save } from "lucide-react";

const DetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Add 3D rotation effect state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" });
  const ROTATION_SENSITIVITY = 10; // Slightly less than card for better experience on larger element

  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await instance.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to load note");
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  // Add rotation handlers from NoteCard
  const handleRotationMouseMove = (e) => {
    if (!cardRef.current) return;

    const { left, top, width, height } =
      cardRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Update gradient position based on mouse within the card
    setMousePosition({
      x: `${e.clientX - left}px`,
      y: `${e.clientY - top}px`,
    });

    requestAnimationFrame(() => {
      const newRotateY = (mouseX / (width / 2)) * ROTATION_SENSITIVITY;
      const newRotateX = (mouseY / (height / 2)) * -ROTATION_SENSITIVITY;
      setRotateX(newRotateX);
      setRotateY(newRotateY);
    });
  };

  const handleRotationMouseLeave = () => {
    setMousePosition({ x: "50%", y: "50%" }); // Reset gradient position

    // Spring animation for rotation
    const animateSpring = () => {
      setRotateX((prev) => prev * 0.9);
      setRotateY((prev) => prev * 0.9);

      if (Math.abs(rotateX) > 0.1 || Math.abs(rotateY) > 0.1) {
        requestAnimationFrame(animateSpring);
      } else {
        setRotateX(0);
        setRotateY(0);
      }
    };
    requestAnimationFrame(animateSpring);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await instance.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await instance.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note updated successfully");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(to bottom right, #1a1a2e, #121212)",
        color: "#e2e2e2",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/"
            className="btn btn-ghost mb-6 rounded-3xl bg-opacity-70 hover:bg-opacity-50 text-white"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Notes
          </Link>

          {/* Apply 3D card styling from NoteCard */}
          <div
            ref={cardRef}
            className="relative rounded-xl overflow-hidden transform-gpu"
            style={{
              perspective: "1500px",
            }}
            onMouseMove={handleRotationMouseMove}
            onMouseLeave={handleRotationMouseLeave}
          >
            <div
              className="card bg-base-100/40 hover:bg-base-50 hover:shadow-lg border-t-4 border-solid border-[#f5c74b] relative overflow-hidden"
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)",
                willChange: "transform",
              }}
            >
              {/* Add the gradient effect */}
              <div
                className="absolute inset-0 opacity-50 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x} ${mousePosition.y},
                    rgba(245, 199, 75, 0.15) 0%,
                    transparent 50%
                  )`,
                }}
              />

              <div
                className="card-body"
                style={{
                  transform: "translateZ(75px)",
                  transition: "transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)",
                }}
              >
                <div className="flex justify-end mb-4">
                  <button
                    onClick={handleDelete}
                    className="btn btn-error btn-outline rounded-3xl"
                  >
                    <BadgeMinus className="h-5 w-5 mr-2" />
                    Delete Note
                  </button>
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="note title"
                    className="input input-bordered"
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="write your note here ..."
                    className="textarea textarea-bordered h-32"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={handleSave}
                    className="btn btn-primary rounded-3xl bg-opacity-80 hover:bg-opacity-70"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                    {!saving && <Save className="h-4 w-4 ml-2" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
