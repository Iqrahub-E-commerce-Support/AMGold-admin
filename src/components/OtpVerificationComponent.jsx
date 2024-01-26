import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios/axios'
import toast from 'react-hot-toast'
const OtpVerificationComponent = () => {
    const [phone,setPhone]=useState('')
    const [otpis,setOtpis]=useState('')
    const navigate =useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem('userdeleteToken')){
          navigate('/deleteaccount')
        }
        // eslint-disable-next-line
      },[])
      useEffect(()=>{
        setPhone(localStorage.getItem('phone'))
      },[])
      const verifyOtp = async (e)=>{
        e.preventDefault();
        try {
          const response = await axios.post("/verifyOtp",{
            phone:phone,
            otpis:otpis
          })
          if(response.data.success){
            toast.success(response.data.message)
            localStorage.removeItem("userdeleteToken")
            localStorage.removeItem("phone")
            navigate('/deleteaccount')
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
          height: 300,
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          marginTop: 15,
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
        Otp Verification
        </Typography>
        <TextField
          value={otpis}
          onChange={(e) => setOtpis(e.target.value)}
          fullWidth
          sx={{ backgroundColor: "white" }}
          margin="normal"
          type={"tel"}
          label="Enter otp"
          variant="outlined"
        />
        <Button
          onClick={verifyOtp}
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

export default OtpVerificationComponent
