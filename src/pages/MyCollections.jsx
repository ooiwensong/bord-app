import React from "react";
import CollItem from "../components/CollItem";

const MyCollections = (props) => {
  return (
    <div className="container mx-auto flex flex-col">
      <h1>My Collections</h1>
      <div id="collections-container" className="grid grid-cols-3 gap-3">
        {props.collection.length > 0 &&
          props.collection.map((i, idx) => (
            <CollItem
              key={i.itemId}
              item={i}
              idx={idx}
              setCollection={props.setCollection}
            />
          ))}
      </div>
      <div>
        {props.collection.length === 0 && <h1>No Games in collection</h1>}
      </div>
    </div>
  );
};

export default MyCollections;
