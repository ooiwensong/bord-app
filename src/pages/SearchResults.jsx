import React, { useEffect, useState } from "react";
import convert from "xml-js";
import SearchItem from "../components/SearchItem";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const params = useParams();

  async function getResults(query) {
    const res = await fetch(
      `https://boardgamegeek.com/xmlapi2/search?query=${query}&type=boardgame`,
    );
    const XMLData = await res.text();
    const JSONData = convert.xml2js(XMLData, {
      compact: true,
      attributesKey: "attr",
      ignoreDeclaration: true,
    });
    setResults(
      Array.isArray(JSONData.items.item)
        ? JSONData.items.item
        : [JSONData.items.item],
    );
  }

  useEffect(() => {
    getResults(localStorage.getItem("input"));
  }, [params.searchParams]);

  return (
    <div className="container mx-auto">
      {results.map((item) => (
        <SearchItem key={item.attr.id} item={item} />
      ))}
    </div>
  );
};

export default SearchResults;
