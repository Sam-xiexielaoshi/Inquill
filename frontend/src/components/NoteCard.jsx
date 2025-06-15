import { BadgeMinus, NotebookPen } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";

const NoteCard = ({ note }) => {
  // State for 3D rotation effect
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" });
  const ROTATION_SENSITIVITY = 15;

  // State for dragging functionality
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const cardRef = useRef(null); // Ref for the card element
  const startMousePos = useRef({ x: 0, y: 0 }); // Mouse position when drag starts
  const startCardPos = useRef({ x: 0, y: 0 }); // Card position when drag starts
  const initialClickPos = useRef({ x: 0, y: 0 }); // Stores the mouse position when mouse down occurs

  const DRAG_THRESHOLD = 5; // Pixels threshold to differentiate between a click and a drag

  // Dragging Handlers 
  const handleMouseDown = (e) => {
    // Prevent default to avoid text selection issues when dragging
    e.preventDefault();
    if (cardRef.current) {
      setIsDragging(true);

      // Store current mouse position and card's current translated position
      startMousePos.current = { x: e.clientX, y: e.clientY };
      startCardPos.current = { x: position.x, y: position.y };
      initialClickPos.current = { x: e.clientX, y: e.clientY }; // Store initial click position
    }
  };

  const handleDragMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;

      // Calculate new position relative to the starting drag point
      const newX = startCardPos.current.x + (e.clientX - startMousePos.current.x);
      const newY = startCardPos.current.y + (e.clientY - startMousePos.current.y);

      setPosition({ x: newX, y: newY });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  //  Rotation Handlers 
  const handleRotationMouseMove = (e) => {
    if (isDragging || !cardRef.current) return; // Do not rotate if dragging

    // We need to query for the .card element, as the ref is on the outer div
    const card = cardRef.current.querySelector(".card");
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
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
    if (isDragging) return; // Do not animate if currently dragging

    setMousePosition({ x: "50%", y: "50%" }); // Reset gradient position

    // Spring animation for rotation
    const animateSpring = () => {
      setRotateX((prev) => prev * 0.9);
      setRotateY((prev) => prev * 0.9);

      // Continue animation if values are still significant
      if (Math.abs(rotateX) > 0.1 || Math.abs(rotateY) > 0.1) {
        requestAnimationFrame(animateSpring);
      } else {
        // Snap to 0 when values are very small to prevent endless tiny calculations
        setRotateX(0);
        setRotateY(0);
      }
    };
    requestAnimationFrame(animateSpring);
  };

  //  Effect for global mouse events during dragging 
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      // Clean up listeners when not dragging
      window.removeEventListener("mousemove", handleDragMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    // Cleanup function runs when component unmounts or isDragging changes
    return () => {
      window.removeEventListener("mousemove", handleDragMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleDragMouseMove, handleMouseUp]);

  return (
    <div
      ref={cardRef} // Attach ref to the outermost div
      className={`
        relative rounded-xl overflow-hidden transform-gpu
        ${isDragging ? "cursor-grabbing absolute z-50" : "cursor-grab"}
      `}
      style={{
        perspective: "1500px",
        // Apply dragging transform directly to the outer div
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        // Set width/height while dragging to prevent layout shifts
        width: isDragging && cardRef.current ? cardRef.current.offsetWidth : "auto",
        height: isDragging && cardRef.current ? cardRef.current.offsetHeight : "auto",
        // Ensure smooth transition for positioning when dropping, if needed
        transition: isDragging ? "none" : "transform 0.2s ease-out",
      }}
      onMouseDown={handleMouseDown} // Only for initiating drag
    >
      <Link
        to={`/note/${note._id}`}
        className="card bg-base-100/40 hover:bg-base-50 hover:shadow-lg border-t-4 border-solid border-[#f5c74b] relative overflow-hidden"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          // Transition only for rotation, not for dragging
          transition: "transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)",
          willChange: "transform",
        }}
        // Handlers for rotation and gradient are on the Link
        onMouseMove={handleRotationMouseMove}
        onMouseLeave={handleRotationMouseLeave}
        onClick={(e) => {
          // Calculate the distance moved from the initial click point
          const distanceMoved = Math.sqrt(
            Math.pow(e.clientX - initialClickPos.current.x, 2) +
            Math.pow(e.clientY - initialClickPos.current.y, 2)
          );

          // Prevent link navigation if it was a drag (moved beyond threshold)
          if (distanceMoved > DRAG_THRESHOLD) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
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
          className="card-body relative z-10"
          style={{
            transform: "translateZ(75px)",
            transition: "transform 0.1s cubic-bezier(0.33, 1, 0.68, 1)",
          }}
        >
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
              <NotebookPen className="size-4" />
              <button className="btn btn-ghost btn-xs text-error">
                <BadgeMinus className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NoteCard;
