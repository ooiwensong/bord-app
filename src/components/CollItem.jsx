import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const CollItem = (props) => {
  const handleDelete = () => {
    props.setCollection((prevCollection) => {
      const tempArr = [...prevCollection];
      tempArr.splice(props.idx, 1);
      return tempArr;
    });
  };

  return (
    <div className="flex flex-col rounded-lg border p-2 shadow-md transition-transform ease-in-out hover:scale-105 hover:bg-slate-50">
      <div
        className="h-80 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${props.item.itemImg}")` }}
      ></div>
      <Link to={`/boardgame/${props.item.itemId}`}>
        <div className="mt-2 text-lg">
          {props.item.itemName} ({props.item.itemYear})
        </div>
      </Link>
      <div className="mt-10">
        <Button
          className=" relative rounded-md bg-gray-400 py-1 pl-7 pr-3 hover:bg-gray-300"
          onClick={handleDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="absolute left-0.5 h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
          </svg>
          Remove from Collection
        </Button>
      </div>
    </div>
  );
};

export default CollItem;
