import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import MyCollections from "./pages/MyCollections";
import SearchResults from "./pages/SearchResults";
import ItemInfo from "./pages/ItemInfo";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [collection, setCollection] = useState([]);
  return (
    <div>
      <NavBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <Routes>
        <Route path="/" element={<MyCollections />} />
        <Route
          path="/search/:searchParams"
          element={
            <SearchResults
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          }
        />
        <Route path="/boardgame/:id" element={<ItemInfo />} />
      </Routes>
    </div>
  );
}

export default App;
