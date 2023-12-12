import {  Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from '../axios/axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const DeleteAccountPage = () => {
    const navigate =useNavigate()
    const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const handleAccountDeletion = async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.post("/accountdeletion",{
        phone:phone,
        password:password
      })
      console.log(e);
      if(response.data.success){
        toast.success(response.data.message)
        localStorage.setItem("userdeleteToken", response.data.data)
        localStorage.setItem("phone",response.data.phonenum)
        navigate('/otp')
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("something went wrong" )
    }
  }
  return (
    <Box>
        <Typography  sx={{textAlign:'center',mt:'3%'}}></Typography>
        <form>
          <Box
            sx={{
              backgroundColor: "#b2fc9f",
              display: "flex",
              flexDirection: "column",
              maxWidth: 450,
              height: 400,
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
            <Typography variant="h5" padding={3} textAlign="center">
            Al Muqtadir Account Deletion Page
            </Typography>
            <TextField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              sx={{ backgroundColor: "white" }}
              margin="normal"
              type={"tel"}
              label="Phone Number"
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
              onClick={handleAccountDeletion}
              variant="contained"
              sx={{
                color: "#2ead0e",
                backgroundColor: "white",
                ":hover": { backgroundColor: "#2ead0e", color: "white" },
                marginTop: 3,
                borderRadius: 3,
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
    </Box>
  )
}

export default DeleteAccountPage
