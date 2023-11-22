import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../axios/axios'
import toast from "react-hot-toast";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('admintoken')){
      navigate('/')
    }
  })
  const handleLogin = async (e)=>{
    e.preventDefault();
    try {
      // dispatch(showLoading())
      const response = await axios.post("/adminLogin",{
        email:email,
        password:password
      })
      // dispatch(hideLoading())
      console.log(e);
      if(response.data.success){
        toast.success(response.data.message)
        localStorage.setItem("admintoken", response.data.data)
        // dispatch(setAdmin(response.data.adminz))
        navigate('/')
      }else{
        console.log("heree");
        toast.error(response.data.message)
      }
    } catch (error) {
      // dispatch(hideLoading())
      toast.error("something went wrong" )
    }
  }
  return (
    <>
      <Box>
        <form>
          <Box
            sx={{
              backgroundColor: "#ffecf0",
              display: "flex",
              flexDirection: "column",
              maxWidth: 450,
              height: 450,
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
              marginTop: 10,
              padding: 3,
              borderRadius: 5,
              // height:"70vh",
              boxShadow: "5px 5px 10px #ccc ",
              ":hover": {
                boxShadow: "10px 10px 20px #ccc ",
              },
            }}
          >
            <Typography variant="h4" padding={3} textAlign="center">
              AL Muqtadir Admin Login
            </Typography>
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ backgroundColor: "white" }}
              margin="normal"
              type={"email"}
              label="Email"
              variant="outlined"
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{ backgroundColor: "white" }}
              margin="normal"
              type={"password"}
              label="Password"
              variant="outlined"
            />
            <Button
              onClick={handleLogin}
              variant="contained"
              sx={{
                color: "#FF90AB",
                backgroundColor: "white",
                ":hover": { backgroundColor: "#FF90AB", color: "white" },
                marginTop: 3,
                borderRadius: 3,
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AdminLogin;
