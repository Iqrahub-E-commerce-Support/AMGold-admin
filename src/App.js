import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CollectionPage from "./pages/CollectionPage";
import ProductPage from "./pages/ProductPage";
import DashboardPage from "./pages/DashboardPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import { Toaster } from "react-hot-toast";
import Banner from "./components/Banner";
import DeleteAccountPage from "./components/DeleteAccountPage";
import OtpVerificationPage from "./pages/OtpVerificationPage";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AdminLoginPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/banner" element={<Banner/>} />
          <Route path="/deleteaccount" element={<DeleteAccountPage/>}/>
          <Route path="/otp" element={<OtpVerificationPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
