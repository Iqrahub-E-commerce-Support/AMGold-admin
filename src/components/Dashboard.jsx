import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material'
import GoldPriceChangerComponent from './GoldPriceChangerComponent';
import { useNavigate } from 'react-router-dom';
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
const Dashboard = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('admintoken')){
      navigate('/login')
    }
  })
  return (
    <>
     <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
       
       <Box>
        <Typography sx={{fontWeight:600,fontSize:22}}> Dashboard</Typography>
       </Box>
        <Box sx={{mt:4}}>
        <GoldPriceChangerComponent/>
        </Box>
      </Box>
      </Box> 
    </>
  )
}

export default Dashboard
