import { useState } from "react";
import NavBar from "./components/NavBar";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <div>
      <NavBar />
      <SearchResults />
    </div>
  );
}

export default App;
