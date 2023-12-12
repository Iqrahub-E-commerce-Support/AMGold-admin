import { Box, Button,  Modal, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { useFormik } from 'formik';
import axios from '../axios/axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
const Banner = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [banner, setBanner] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem("admintoken")) {
          navigate("/login");
        }
      });
    const modalHandler = () => {
        setOpen(true);
      };
      useEffect(() => {
        getBanner();
      }, []);
      const getBanner = async () => {
        try {
          const response = await axios.get("/getAllBanner", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
            },
          });
          if (response.data.success) {
            const banner = response.data.data.map((item) => item);
            setBanner(banner);
          }
        } catch (error) {
          console.log(error);
        }
      };
      const formik = useFormik({
        initialValues: {
          file: null,
        },
        onSubmit: async (values, helpers) => {
          try {
            const formData = new FormData();
            for (let i = 0; i < values.file.length; i++) {
              formData.append("file", values.file[i]);
            }
            const response = await axios.post("/postBanner", formData, { values });
            if (response.data.success) {
              toast.success(response.data.message);
              getBanner();
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            helpers.setErrors({ submit: error.message });
            toast.error("Something went wrong");
          }
        },
      });
  return (
   <>
   <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box display={"flex"} justifyContent={"end"}>
              <Button
                onClick={() => modalHandler()}
                variant="contained"
                sx={{ backgroundColor: "white", color: "#FF90AB" }}
              >
                Add a Banner
              </Button>
              <StyledModal
                open={open}
                onClose={(e) => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  width={450}
                  height={250}
                  sx={{ scrollBehavior: "auto" }}
                  bgcolor={"background.default"}
                  color={"text.primary"}
                  p={3}
                  borderRadius={5}
                >
                  <Typography
                    variant="h6"
                    color="gray"
                    textAlign="center"
                    marginBottom={3}
                  >
                    Add new Banner
                  </Typography>
                  <TextField
                    focused
                    required
                    fullWidth
                    inputProps={{
                      multiple: true,
                    }}
                    margin="normal"
                    type="file"
                    size="small"
                    name="file"
                    onChange={(e) => {
                      formik.setFieldValue("file", e.currentTarget.files);
                    }}
                    label="upload your Images"
                    variant="outlined"
                  />
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    marginTop={3}
                  >
                    <Button
                      variant="contained"
                      color="inherit"
                      type="submit"
                      name="submit"
                      onClick={
                        formik.handleSubmit

                        // setOpen(false);
                      }
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </StyledModal>
            </Box>
       <Typography variant="h5" sx={{ marginBottom: 5, fontWeight: 500 }}>
              Product List
            </Typography>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  {banner && banner?.length > 0 ? (
                    <>
                      <TableHead>
                        <TableRow>
                          <TableCell>image</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Action</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {banner &&
                          banner.map((value) => (
                            <TableRow
                             key={value._id}
                            >
                              <TableCell>
                                <img
                                  src={value?.image}
                                  alt=""
                                  style={{
                                    objectFit: "cover",
                                    width: "180px",
                                    height: "80px",
                                  }}
                                />
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
                                    // onClick={()=>BlockHandler(value._id)}
                                  >
                                    Block
                                  </Button>
                                 ) : ( 
                                  <Button
                                    variant="contained"
                                    color="success"
                                    // onClick={()=>unBlockHadler(value._id)}
                                  >
                                    Unblock
                                  </Button>
                                 )} 
                              </TableCell>
                              <TableCell
                                // onClick={() => DeleteHandler(value._id)}
                                sx={{ cursor: "pointer" }}
                              >
                                {/* <DeleteIcon /> */}
                              </TableCell>
                              <TableCell
                                // onClick={() => editmodalHandler(value._id)}
                                sx={{ cursor: "pointer" }}
                              >
                                {/* <EditIcon /> */}
                              </TableCell>
                            </TableRow>
                            ))}  
                      </TableBody>
                    </>
                 ) : (  
                    <Box display={"flex"} justifyContent={"center"}>
                      <Typography fontWeight={400} variant="h6">
                        Currently there is no Products
                      </Typography>
                    </Box>
                 )}  
                </Table>
              </TableContainer>
            </Paper>
      </Box>
      </Box> 
   </>
  )
}

export default Banner
