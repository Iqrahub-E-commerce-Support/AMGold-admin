import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CollectionPage from "./pages/CollectionPage";
import ProductPage from "./pages/ProductPage";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage/>}/>
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/product" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
