import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <header className="sticky top-0 w-full bg-slate-200 leading-6">
      <nav className="mx-auto flex h-full max-w-full justify-between gap-5 px-10">
        <div className="relative">
          <input
            type="text"
            name="q"
            value={props.searchInput}
            placeholder="Search"
            className="w-full rounded-lg bg-slate-300 px-7 py-2"
            onChange={(e) => props.setSearchInput(e.target.value)}
            required
          />
          <Link to={`/search/${props.searchInput}`}>
            <button
              type="submit"
              className="absolute left-0"
              // onClick={handleClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </Link>
        </div>
        <div>
          <Link to="/">My Collection</Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
