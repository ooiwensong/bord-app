import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <header className="sticky top-0 leading-6 w-full bg-slate-200">
      <nav className="max-w-full flex h-full gap-5 mx-auto px-10 justify-between">
        <form action="" className="relative py-4">
          <input
            className="rounded-lg w-full bg-slate-300 px-7 py-2"
            value={searchInput}
            placeholder="Search"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="absolute left-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </form>
      </nav>
    </header>
  );
};

export default NavBar;
