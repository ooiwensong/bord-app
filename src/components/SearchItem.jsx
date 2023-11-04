import React, { useEffect, useState } from "react";
import convert from "xml-js";

const SearchItem = ({ item }) => {
  const [itemImg, setItemImg] = useState("");
  const [itemYear, setItemYear] = useState("");
  const [itemName, setItemName] = useState("");

  async function getItem() {
    const res = await fetch(
      `https://boardgamegeek.com/xmlapi2/thing?id=${item.attr.id}&stats=1`,
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
        : JSONData.items.item.name.attr.value,
    );
  }

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div className="flex h-52 max-w-full mt-6">
      <img src={itemImg} alt="" className="bg-contain" />
      <h2>
        {itemName} ({itemYear})
      </h2>
    </div>
  );
};

export default SearchItem;
