import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { useFormik } from "formik";
import axios from "../axios/axios";
import { Collection} from "../validation/CollectionSchema";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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

const AddCollection = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [makeOpen, setMakeOpen] = useState(false);
  const [collection, setCollection] = useState([]);
  useEffect(()=>{
    if(!localStorage.getItem('admintoken')){
      navigate('/login')
    }
  })
  const modalHandler = () => {
    setOpen(true);
  };
  const modalHandlerMakingCharge = (id) => {
    setMakeOpen(true);
    MakingChargeformik.setFieldValue('id', id);
  };
  const getCollection = async () => {
    try {
      const response = await axios.get("/getCollection", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
      });
      if (response.data.success) {
        setCollection(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCollection();
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      file: null,
    },
    validationSchema: Collection,
    onSubmit: async (values, helpers) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        for (let i = 0; i < values.file.length; i++) {
          formData.append("file", values.file[i]);
        }
        console.log("form data", formData);
        const response = await axios.post("/addCollection", formData, {});
        if (response.data.success) {
          toast.success(response.data.message);
          getCollection();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        helpers.setErrors({ submit: error.message });
        toast.error("Please login");
      }
    },
  });
  const MakingChargeformik = useFormik({
    initialValues: {
      charge:0,
    },
    // validationSchema: CollectionSchema,
    onSubmit: async (values, helpers) => {
      try {
        
        const response = await axios.post("/updateMakingCharge", {values});
        if (response.data.success) {
          toast.success(response.data.message);
          getCollection();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        helpers.setErrors({ submit: error.message });
        toast.error("Please login");
      }
    },
  });
  const DeleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        "/deleteCollection",
        {
          params: { id },
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admintoken"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getCollection()
        // setRefresh(!refresh);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AdminSidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Box display={"flex"} justifyContent={"end"}>
            <Button
              onClick={() => modalHandler()}
              variant="contained"
              sx={{ backgroundColor: "white", color: "#FF90AB" }}
            >
              Add a Collection
            </Button>
            <StyledModal
              open={open}
              onClose={(e) => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                width={450}
                height={400}
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
                  Add new Collection
                </Typography>

                <TextField
                  type="text"
                  fullWidth
                  name="name"
                  margin="normal"
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  label="Title"
                  variant="outlined"
                  value={formik.values.name}
                  error={formik.errors.name}
                  helperText={formik.errors.name}
                  onChange={formik.handleChange}
                />
                <TextField
                  type="text"
                  name="description"
                  fullWidth
                  margin="normal"
                  size="small"
                  sx={{ backgroundColor: "white" }}
                  label="Description"
                  variant="outlined"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
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
          <Box></Box>
          <Typography variant="h5" sx={{ marginBottom: 5, fontWeight: 500 }}>
            Collection List
          </Typography>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                {collection && collection.length > 0 ? (
                  <>
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>image</TableCell>
                        <TableCell>products</TableCell>
                        <TableCell>Making Charge</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                        <TableCell>Update making charge(%)</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {collection &&
                        collection.map((value) => (
                          <TableRow
                          key={value._id}
                          >
                            <TableCell>{value.title}</TableCell>
                            <TableCell>
                              <img
                                src={value.image}
                                alt=""
                                style={{
                                  objectFit: "cover",
                                  width: "80px",
                                  height: "80px",
                                }}
                              />
                            </TableCell>
                            <TableCell>{/* {value?.phone} */}</TableCell>
                            <TableCell>{value?.makingCharge} </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  backgroundColor: "#6bff93",
                                  width: "80%",
                                  borderRadius: 1,
                                }}
                              >
                                <Typography textAlign={"center"}>
                                  {value.isActive}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {value.isActive === "Active" ? (
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
                            <TableCell>
                              <Button
                                 onClick={() => modalHandlerMakingCharge(value._id)}
                                variant="contained"
                                sx={{
                                  backgroundColor: "white",
                                  color: "#FF90AB",
                                }}
                              >
                                Add making charge
                              </Button>
                              <StyledModal
                                open={makeOpen}
                                onClose={(e) => setMakeOpen(false)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box
                                  width={450}
                                  height={250}
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
                                    Add making charge in percentage
                                  </Typography>

                                  <TextField
                                    type="number"
                                    fullWidth
                                    name="charge"
                                    margin="normal"
                                    size="small"
                                    sx={{ backgroundColor: "white" }}
                                    label="Enter the Pricing"
                                    variant="outlined"
                                    value={MakingChargeformik.values.charge}
                                    error={MakingChargeformik.errors.charge}
                                    helperText={MakingChargeformik.errors.charge}
                                    onChange={MakingChargeformik.handleChange}
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
                                        MakingChargeformik.handleSubmit

                                        // setOpen(false);
                                      }
                                    >
                                      Submit
                                    </Button>
                                  </Box>
                                </Box>
                              </StyledModal>
                            </TableCell>
                            <TableCell  onClick={() => DeleteHandler(value._id)} sx={{ cursor: "pointer" }}><DeleteIcon/></TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </>
                ) : (
                  <Box display={"flex"} justifyContent={"center"}>
                    <Typography fontWeight={400} variant="h6">
                      Currently there is no Collection
                    </Typography>
                  </Box>
                )}
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default AddCollection;
