import React, { useEffect, useState } from "react";
import convert from "xml-js";

const ItemInfo = ({ item }) => {
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
      `https://boardgamegeek.com/xmlapi2/thing?id=332686&stats=1`,
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
    setItemImg(JSONData.items.item.image._text);
    setItemYear(JSONData.items.item.yearpublished.attr.value);
    setItemName(
      Array.isArray(JSONData.items.item.name)
        ? JSONData.items.item.name[0].attr.value
        : JSON.item.item.name.attr.value,
    );
    setItemDesigner(() => {
      const temp = JSONData.items.item.link.find(
        (i) => i.attr.type === "boardgamedesigner",
      );
      return temp.attr.value;
    });
    setItemPublisher(() => {
      const temp = JSONData.items.item.link.find(
        (i) => i.attr.type === "boardgamepublisher",
      );
      return temp.attr.value;
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

  return (
    <div className="container mx-auto px-3">
      <section id="hero" className="flex">
        <img src={itemImg} alt="" className="" />
        <div id="main-data">
          <h2>
            {itemName}
            <span>({itemYear})</span>
          </h2>
          <h3>Designed By: {itemDesigner}</h3>
          <h3>Published By: {itemPublisher}</h3>
        </div>
      </section>
      <section id="stats">
        <h3>
          {itemMinPlayer}-{itemMaxPlayer} Players
        </h3>
        <h3>
          {itemMinTime}-{itemMaxTime} Min
        </h3>
        <h3>Weight: {itemWeight}/5</h3>
      </section>
      <section id="description">{itemDescription}</section>
    </div>
  );
};

export default ItemInfo;
