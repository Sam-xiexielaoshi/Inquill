import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
// import toast from "react-hot-toast";

const App = () => {
  return (
    <div data-theme="retro">
      <button className="btn btn-outline">click me</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
