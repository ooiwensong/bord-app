import React from "react";
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
    <div className="flex flex-col rounded-lg border p-2 shadow-md hover:bg-slate-50">
      <div
        className="h-80 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${props.item.itemImg}")` }}
      ></div>
      <Link to={`/boardgame/${props.item.itemId}`}>
        <div className="mt-2">
          {props.item.itemName} ({props.item.itemYear})
        </div>
      </Link>
      <div>
        <Button className="mt-10" onClick={handleDelete}>
          Remove from Collection
        </Button>
      </div>
    </div>
  );
};

export default CollItem;
