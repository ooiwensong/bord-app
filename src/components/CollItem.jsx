import React from "react";
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
    <div className="flex flex-col border">
      <div className="w-full">
        <img src={props.item.itemImg} alt="" className="" />
      </div>
      <div className="w-full">
        {props.item.itemName} ({props.item.itemYear})
      </div>
      <div>
        <Button onClick={handleDelete}>Remove from Collection</Button>
      </div>
    </div>
  );
};

export default CollItem;
