import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    setItemImg(
      JSONData.items.item.thumbnail
        ? JSONData.items.item.thumbnail._text
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
  }

  useEffect(() => {
    getItem();
  }, []);

  return (
    <Link to={`/boardgame/${item.attr.id}`}>
      <div className="mt-6 flex h-52 max-w-full rounded-lg border py-5 shadow-md hover:bg-slate-50">
        <div
          className="w-72 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${itemImg}")` }}
        ></div>
        {/* <img src={itemImg} alt="" className="bg-contain" /> */}
        <div>
          <p className="ml-5 text-xl font-medium">
            {itemName} <span className="text-lg font-normal">({itemYear})</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
