import { Box, Typography } from "@mui/material";
import React from "react";

const DashboardOverview = ({name,data}) => {
  return (
    <>
      
        <Box
          sx={{
            borderRadius: "15px",
            border: "1px solid rgba(0, 0, 0, 0.20)",
            background: "#FFF",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            px:7,
            py:3
          }}
        >
          <Typography sx={{color:'#075107',textAlign:'center',fontSize:'18px',fontWeight:'500'}}>{name}</Typography>
          <Typography sx={{color:'#098920',textAlign:'center',fontSize:'20px',fontWeight:'800'}}>{data}</Typography>
        </Box>
    </>
  );
};

export default DashboardOverview;
