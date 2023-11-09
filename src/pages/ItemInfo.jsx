import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import convert from "xml-js";
import { decode } from "html-entities";
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
  const [isGameAdded, setIsGameAdded] = useState();

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
    let collectionId = [];
    if (props.collection.length > 0) {
      collectionId = props.collection.map((i) => i.itemId);
    }
    collectionId.includes(params.id)
      ? setIsGameAdded(true)
      : setIsGameAdded(false);
  }, []);

  function handleAddCollection() {
    props.setCollection((prevCollection) => {
      return [
        ...prevCollection,
        { itemId: params.id, itemImg, itemName, itemYear },
      ];
    });
    setIsGameAdded(true);
  }

  function handleRemoveCollection() {
    let idx = props.collection.findIndex((i) => i.itemId === params.id);
    props.setCollection((prevCollection) => {
      const tempArr = [...prevCollection];
      tempArr.splice(idx, 1);
      return tempArr;
    });
    setIsGameAdded(false);
  }

  function decodeDes() {
    const replacedDescription = itemDescription.replaceAll("&#10;", "<br/>");
    decode(`${replacedDescription}`);
    return replacedDescription;
  }

  return (
    <div className="container mx-auto mt-5 px-3 2xl:px-60">
      <section id="hero" className="grid grid-cols-2 grid-rows-[250px]">
        <div
          id="img-container"
          className="col-span-1 bg-contain bg-right bg-no-repeat"
          style={{ backgroundImage: `url("${itemImg}")` }}
        ></div>
        <div
          id="main-item-data"
          className="col-span-1 ml-10 flex flex-col gap-1"
        >
          <h2 className="text-2xl font-bold">
            {itemName}
            <span className="text-lg font-normal"> ({itemYear})</span>
          </h2>
          <h3>Designed By: {itemDesigner}</h3>
          <h3>Published By: {itemPublisher}</h3>
          <h3>Rating: {Math.round(itemRating * 10) / 10}</h3>
          {!isGameAdded && (
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
          )}
          {isGameAdded && (
            <div className="mt-auto">
              <Button
                className=" relative rounded-md bg-gray-400 py-1 pl-7 pr-3 hover:bg-gray-300"
                onClick={handleRemoveCollection}
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
                    d="M18 12H6"
                  />
                </svg>
                Remove from Collection
              </Button>
            </div>
          )}
        </div>
      </section>
      <section
        id="stats"
        className="my-10 grid grid-cols-3 divide-x-2 text-center leading-10"
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
        <p
          ref={(node) => {
            if (node) {
              node.innerHTML = decodeDes();
            }
          }}
        ></p>
      </section>
    </div>
  );
};

export default ItemInfo;
