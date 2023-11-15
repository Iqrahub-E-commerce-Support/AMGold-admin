import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CollectionPage from "./pages/CollectionPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
