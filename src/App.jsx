import React, { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import MyCollections from "./pages/MyCollections";
import SearchResults from "./pages/SearchResults";
import ItemInfo from "./pages/ItemInfo";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [collection, setCollection] = useState([]);
  return (
    <div>
      <NavBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/"
            element={
              <MyCollections
                collection={collection}
                setCollection={setCollection}
              />
            }
          />
          <Route path="/search/:searchParams" element={<SearchResults />} />
          <Route
            path="/boardgame/:id"
            element={
              <ItemInfo collection={collection} setCollection={setCollection} />
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;
