import React, { useEffect, useState } from "react";
import convert from "xml-js";
import SearchItem from "../components/SearchItem";

const SearchResults = (props) => {
  const [results, setResults] = useState([]);

  async function getResults(searchInput) {
    const res = await fetch(
      `https://boardgamegeek.com/xmlapi2/search?query=${searchInput}&type=boardgame`,
    );
    const XMLData = await res.text();
    const JSONData = convert.xml2js(XMLData, {
      compact: true,
      attributesKey: "attr",
      ignoreDeclaration: true,
    });
    setResults(JSONData.items.item);
  }

  useEffect(() => {
    getResults("red");
  }, []);

  // console.log(results);

  return (
    <div className="container mx-auto">
      {results.map((item) => (
        <SearchItem key={item.attr.id} item={item} />
      ))}
    </div>
  );
};

export default SearchResults;
