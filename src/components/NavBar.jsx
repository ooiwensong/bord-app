import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="sticky top-0 leading-6 w-full bg-slate-200">
      <nav className="max-w-full flex h-full gap-5 mx-auto px-10 justify-between">
        <div className="py-4">
          <input
            className="relative rounded-lg w-full bg-slate-300 px-7 py-2"
            placeholder="Search"
          />
          <button className="absolute">O</button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
