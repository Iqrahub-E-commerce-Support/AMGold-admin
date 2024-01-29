import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { Box, Typography, styled } from "@mui/material";
import GoldPriceChangerComponent from "./DashboardComponents/GoldPriceChangerComponent";
import { useNavigate } from "react-router-dom";
import OrderChart from "./DashboardComponents/OrderChart";
import DashboardOverview from "./DashboardComponents/DashboardOverview";
import axios from "../axios/axios";
import { useState } from "react";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(0);
  const [monthRevanue, setMonthRevanue] = useState(0);
  const [monthcount, setMonthcount] = useState(0);
  const [totalRevenue, SetTotalRevenue] = useState(0);
  const [totalcount, setTotalcount] = useState(0);
  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/login");
    }
  });
  const getSalesData = async () => {
    try {
      const response = await axios.get("/DashBoardOverview", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
      });
      if (response.data.success) {
        setUser(response.data.data);
        setMonthRevanue(response.data.monthrev);
        setMonthcount(response.data.monthcount);
        SetTotalRevenue(response.data.totalrev);
        setTotalcount(response.data.totalcount);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };
  useEffect(() => {
    getSalesData();
  }, []);
  return (
    <>
      <Box
        sx={{ display: "flex", height: "100vh", backgroundColor: "#098B20" }}
      >
        <AdminSidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />

          <Box>
            <Typography
              sx={{ fontWeight: 600, fontSize: 22, color: "#ffffff" }}
            >
              {" "}
              Dashboard
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
            {loading ? (
              <Typography>Loading</Typography>
            ) : (
              <>
                {" "}
                <DashboardOverview name="customer" data={user} />
                <DashboardOverview name="Monthly Revenue" data={monthRevanue} />
                <DashboardOverview name="Total Revenue" data={totalRevenue} />
                <DashboardOverview name="Monthly Sale" data={monthcount} />
                <DashboardOverview name="Total Sale" data={totalcount} />
              </>
            )}
          </Box>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
              alignContent: "flex-start",
              gap: 5,
            }}
          >
            <GoldPriceChangerComponent />
            <OrderChart />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
