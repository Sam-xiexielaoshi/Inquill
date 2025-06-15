import React from "react";
import { Link } from "react-router";
import { PencilIcon, PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-300 bg-opacity-30 backdrop-blur-sm border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PencilIcon className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
              Inquill
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/create"
              className="btn btn-primary rounded-full px-4 py-2 flex items-center gap-2 hover:opacity-90 transition-all"
            >
              <PlusIcon className="h-5 w-5" />
              <span className="font-medium">Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;