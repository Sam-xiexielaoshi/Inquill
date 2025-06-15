import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import { useState } from "react";

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = (e) => {
    setMousePosition({
      x: `${e.clientX}px`,
      y: `${e.clientY}px`,
    });
  };

  return (
    <div className="relative h-full w-full" onMouseMove={handleMouseMove}>
      <div
        className="absolute inset-0 -z-10 h-full w-full items-center transition-all duration-300"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x} ${mousePosition.y},
              rgba(67, 179, 226, 0.15) 0%,
              rgba(226, 135, 67, 0.15) 5%,
              transparent 60%
            ),
            radial-gradient(125% 125% at 50% 10%,
              #000 50%,
              #e28743 120%
               
            )
          `,
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
