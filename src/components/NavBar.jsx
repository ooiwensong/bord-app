import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  function handleClick() {
    localStorage.setItem("input", props.searchInput);
    props.setSearchInput("");
  }

  return (
    <header className="sticky top-0 z-10 w-full bg-slate-200">
      <nav className="mx-auto grid grid-cols-4 gap-5">
        <div className="col-span-1"></div>
        <div className="relative col-span-2 my-4">
          <input
            type="text"
            name="q"
            value={props.searchInput}
            placeholder="Search"
            className="w-full rounded-full bg-slate-300 px-7 py-2"
            onChange={(e) => props.setSearchInput(e.target.value)}
            required
          />
          <Link to={props.searchInput ? `/search/${props.searchInput}` : "#"}>
            <button
              type="button"
              className="absolute left-1 top-2.5"
              onClick={handleClick}
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
        <div className="col-span-1 flex align-middle text-lg">
          <Link to="/" className="my-auto ml-3">
            <p className="leading-[3rem] underline-offset-8 hover:underline">
              My Collection
            </p>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
