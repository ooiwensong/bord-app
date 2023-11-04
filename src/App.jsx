import { useState } from "react";
import NavBar from "./components/NavBar";
import SearchResults from "./pages/SearchResults";
import ItemInfo from "./pages/ItemInfo";

function App() {
  return (
    <div>
      <NavBar />
      {/* <SearchResults /> */}
      <ItemInfo />
    </div>
  );
}

export default App;
