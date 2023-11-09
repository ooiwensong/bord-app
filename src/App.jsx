import React, { Suspense, useState, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import MyCollections from "./pages/MyCollections";
import ItemInfo from "./pages/ItemInfo";
import LoadingSpinner from "./components/LoadingSpinner";

const SearchResults = lazy(() => import("./pages/SearchResults.jsx"));

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [collection, setCollection] = useState([]);
  return (
    <div>
      <NavBar searchInput={searchInput} setSearchInput={setSearchInput} />

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
        <Route
          path="/search/:searchParams"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <SearchResults />
            </Suspense>
          }
        />
        <Route
          path="/boardgame/:id"
          element={
            <ItemInfo collection={collection} setCollection={setCollection} />
          }
        />
      </Routes>
    </div>
  );
}
export default App;
