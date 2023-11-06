import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import convert from "xml-js";
import Button from "../components/Button";

const ItemInfo = (props) => {
  const params = useParams();
  const [itemImg, setItemImg] = useState("");
  const [itemYear, setItemYear] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDesigner, setItemDesigner] = useState("");
  const [itemPublisher, setItemPublisher] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemMinPlayer, setItemMinPlayer] = useState("");
  const [itemMaxPlayer, setItemMaxPlayer] = useState("");
  const [itemMinTime, setItemMinTime] = useState("");
  const [itemMaxTime, setItemMaxTime] = useState("");
  const [itemRating, setItemRating] = useState("");
  const [itemWeight, setItemWeight] = useState("");

  async function getItem() {
    const res = await fetch(
      `https://boardgamegeek.com/xmlapi2/thing?id=${params.id}&stats=1`,
      {
        "Content-Type": "application/xml; charset=utc-8",
      },
    );
    const XMLData = await res.text();
    const JSONData = convert.xml2js(XMLData, {
      compact: true,
      attributesKey: "attr",
      ignoreDeclaration: true,
    });
    setItemImg(
      JSONData.items.item.image
        ? JSONData.items.item.image._text
        : "https://cf.geekdo-images.com/zxVVmggfpHJpmnJY9j-k1w__itemrep/img/Py7CTY0tSBSwKQ0sgVjRFfsVUZU=/fit-in/246x300/filters:strip_icc()/pic1657689.jpg",
    );
    setItemYear(
      JSONData.items.item.yearpublished.attr.value !== "0"
        ? JSONData.items.item.yearpublished.attr.value
        : "N/A",
    );
    setItemName(
      Array.isArray(JSONData.items.item.name)
        ? JSONData.items.item.name[0].attr.value
        : JSONData.items.item.name.attr.value,
    );
    setItemDesigner(() => {
      const temp = JSONData.items.item.link.find(
        (i) => i.attr.type === "boardgamedesigner",
      );
      return temp.attr ? temp.attr.value : "N/A";
    });
    setItemPublisher(() => {
      const temp = JSONData.items.item.link.find(
        (i) => i.attr.type === "boardgamepublisher",
      );
      return temp.attr ? temp.attr.value : "N/A";
    });
    setItemDescription(JSONData.items.item.description._text);
    setItemMinPlayer(JSONData.items.item.minplayers.attr.value);
    setItemMaxPlayer(JSONData.items.item.maxplayers.attr.value);
    setItemMinTime(JSONData.items.item.minplaytime.attr.value);
    setItemMaxTime(JSONData.items.item.maxplaytime.attr.value);
    setItemRating(JSONData.items.item.statistics.ratings.average.attr.value);
    setItemWeight(
      JSONData.items.item.statistics.ratings.averageweight.attr.value,
    );
  }

  useEffect(() => {
    getItem();
  }, []);

  function handleAddCollection() {
    console.log("button clicked");
    let collectionId = [];
    // create an array of game IDs that are inside the collection
    if (props.collection.length > 0) {
      collectionId = props.collection.map((i) => i.itemId);
    }
    // checks if current game is already in collection
    if (!collectionId.includes(params.id)) {
      props.setCollection([
        ...props.collection,
        { itemId: params.id, itemImg, itemName, itemYear },
      ]);
      console.log(props.collection);
    } else {
      console.log("game already in collection");
      return;
    }
  }

  return (
    <div className="container mx-auto mt-5 px-3 2xl:px-60">
      <section id="hero" className="flex">
        <div id="img-container" className="w-40">
          <img src={itemImg} alt="" className="bg-cover" />
        </div>
        <div id="main-item-data" className="ml-10 flex flex-col gap-1">
          <h2 className="text-2xl font-bold">
            {itemName}
            <span className="text-lg font-normal"> ({itemYear})</span>
          </h2>
          <h3>Designed By: {itemDesigner}</h3>
          <h3>Published By: {itemPublisher}</h3>
          <h3>Rating: {Math.round(itemRating * 10) / 10}</h3>
          <div className="mt-auto">
            <Button
              className=" relative rounded-md bg-green-500 py-1 pl-7 pr-3 hover:bg-green-400"
              onClick={handleAddCollection}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="absolute left-0.5 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
              Add To Collection
            </Button>
          </div>
        </div>
      </section>
      <section
        id="stats"
        className="my-5 grid grid-cols-3 divide-x-2 text-center leading-10"
      >
        <h3>
          {itemMinPlayer}-{itemMaxPlayer} Players
        </h3>
        <h3>
          {itemMinTime}-{itemMaxTime} Min
        </h3>
        <h3>Weight: {Math.round(itemWeight * 100) / 100}/5</h3>
      </section>
      <section id="description" className="mt-16 border-t-2 px-2 pt-5">
        {itemDescription}
      </section>
    </div>
  );
};

export default ItemInfo;
