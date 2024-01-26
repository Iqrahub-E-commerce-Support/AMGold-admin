import { Box, styled,Button,Typography,Paper,TableContainer,Table, TableRow, TableHead, TableCell, TableBody, TextField } from '@mui/material';
import React, { useState,useEffect } from 'react'
import AdminSidebar from './AdminSidebar';
import { useNavigate } from 'react-router-dom';
import axios from '../axios/axios'
import toast from 'react-hot-toast';
const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
const UserComponent = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const getUser = async () => {
        try {
          const response = await axios.get("/getAllUser", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
            },
          });
          if (response.data.success) {
            setUser(response.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getUser();
      }, []);
      useEffect(() => {
        if (!localStorage.getItem("admintoken")) {
          navigate("/login");
        }
      });
      const BlockHandler =  async (userId)=>{
        try {
          const response = await axios.post(
            "/blockUser",
            {
                userId: userId
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("admintoken"),
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            getUser()
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("something went wrong");
        }
      }
      const unBlockHadler = async (userId)=>{
        try {
          const response = await axios.post(
            "/unblockUser",
            {
              userId: userId
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("admintoken"),
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            getUser()
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("something went wrong");
        }
      }
      const filterCollection = (data) => {
        return data.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.phone.includes(searchTerm) ||
          item.access.toLowerCase().includes(searchTerm.toLowerCase())
        );
      };
  return (
    <>
   <Box sx={{ display: 'flex',height: '110vh', backgroundColor: '#098B20' }}>
      <AdminSidebar />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
       <Typography variant="h5" sx={{ marginBottom: 5, fontWeight: 600,color:'#ffffff' }}>
              User List
            </Typography>
            <TextField
            type="text"
            fullWidth
            margin="normal"
            size="small"
            placeholder='search name, email and phone'
            sx={{ backgroundColor: "white", marginBottom: 2 }}
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
            <Box sx={{paddingBottom:5}}>
            <Paper sx={{ width: "100%", overflow: "hidden", }}>
              <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                  {user && user?.length > 0 ? (
                    <>
                      <TableHead>
                        <TableRow>
                          <TableCell>No</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Phone</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {user &&
                         filterCollection(user).map((value,index) => (
                            <TableRow
                             key={value._id}
                            >
                                <TableCell>
                                    {index+1}
                                </TableCell>
                                <TableCell>
                                    {value.name}
                                </TableCell>
                                <TableCell>
                                    {value.email}
                                </TableCell>
                                <TableCell>
                                    {value.phone}
                                </TableCell>
                              <TableCell>
                                <Box
                                  sx={{
                                    backgroundColor: value.access === "Active" ? "#6bff93" : "#fcb8b8",
                                    width: "95%",
                                    borderRadius: 1,
                                    px:0.5,
                                    py:0.3
                                  }}
                                >
                                  <Typography textAlign={"center"}>
                                    {value.access}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                {value.access === "Active" ? (
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={()=>BlockHandler(value._id)}
                                  >
                                    Block
                                  </Button>
                                 ) : ( 
                                  <Button
                                    variant="contained"
                                    color="success"
                                    onClick={()=>unBlockHadler(value._id)}
                                  >
                                    Unblock
                                  </Button>
                                 )} 
                              </TableCell>
                            </TableRow>
                             ))}   
                      </TableBody>
                    </>
               ) : (   
                    <Box display={"flex"} justifyContent={"center"}>
                      <Typography fontWeight={400} variant="h6">
                        Currently there is no Banners
                      </Typography>
                    </Box>
                  )}   
                </Table>
              </TableContainer>
            </Paper>
            </Box>
           
      </Box>
      </Box> 
    </>
  )
}

export default UserComponent
