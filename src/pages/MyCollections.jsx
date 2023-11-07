import React from "react";
import CollItem from "../components/CollItem";

const MyCollections = (props) => {
  return (
    <div className="container mx-auto px-10">
      <h1 className="mb-5 mt-5 text-5xl font-semibold">My Collection</h1>
      <div
        id="collections-container"
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
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
      {props.collection.length === 0 && (
        <div>
          <h2 className="mt-5 text-center text-4xl leading-relaxed text-slate-300">
            Looks like your collection is empty. Search for a game to begin!
          </h2>
        </div>
      )}
    </div>
  );
};

export default MyCollections;
