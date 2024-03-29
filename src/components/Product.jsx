import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
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
import axios from "../axios/axios";
import { useFormik } from "formik";
import { ProductSchema } from "../validation/productschema";
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

const Product = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editopen, setEditopen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [collection, setCollection] = useState([]);
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/login");
    }
  });
  const getProducts = async () => {
    try {
      const response = await axios.get("/getAllProducts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
        },
      });
      if (response.data.success) {
        setProduct(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const filterProduct = (data) => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.weight.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.isActive.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  const getCollection = async () => {
    try {
      const response = await axios.get("/getCollection", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
        },
      });
      if (response.data.success) {
        const collection = response.data.data.map((item) => item);
        setCollection(collection);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: null,
      weight: null,
      stock: null,
      stoneWeight: 0,
      stonePrice: 0,
      file: null,
      productType: "",
    },
    validationSchema: ProductSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("category", values.category);
        formData.append("weight", values.weight);
        formData.append("stock", values.stock);
        formData.append("stoneWeight", values.stoneWeight);
        formData.append("stonePrice", values.stonePrice);
        formData.append("productType", values.productType);
        for (let i = 0; i < values.file.length; i++) {
          formData.append("file", values.file[i]);
        }
        const response = await axios.post("/addProducts", formData, { values });
        if (response.data.success) {
          toast.success(response.data.message);
          getProducts();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        helpers.setErrors({ submit: error.message });
        toast.error("Something went wrong");
      }
    },
  });
  const editmodalHandler = async (productId) => {
    try {
      const response = await axios.get("/getSpecificProduct", {
        params: { productId },
      });

      if (response.data.success) {
        const productData = response.data.data;
        setEditProduct(productData);
        setEditopen(true);
        getCollection();
        const initialValues = {
          name: productData.name,
          description: productData.description,
          category: productData.collectionref,
          weight: productData.weight,
          stock: productData.stock,
          stoneWeight: productData ? productData.stoneWeight : 0,
          stonePrice: productData ? productData.stonePrice : 0,
          file: null,
          productType: productData.productType,
        };
        editFormik.setValues(initialValues);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: null,
      weight: null,
      stock: null,
      stoneWeight: 0,
      stonePrice: 0,
      file: null,
      productType: "",
    },
    validationSchema: ProductSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = new FormData();
        formData.append("productId", editProduct._id);
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("category", values.category);
        formData.append("weight", values.weight);
        formData.append("stock", values.stock);
        formData.append("stoneWeight", values.stoneWeight);
        formData.append("stonePrice", values.stonePrice);
        formData.append("productType", values.productType);
        for (let i = 0; i < values.file?.length; i++) {
          formData.append("file", values.file[i]);
        }
        const response = await axios.post("/editProduct", formData, { values });
        if (response.data.success) {
          toast.success(response.data.message);
          getProducts();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        helpers.setErrors({ submit: error.message });
        toast.error("Something went wrong");
      }
    },
  });
  const modalHandler = () => {
    setOpen(true);
    getCollection();
  };

  const DeleteHandler = async (id) => {
    try {
      const response = await axios.post(
        "deleteProduct",
        {
          id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admintoken"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getProducts();
        // setRefresh(!refresh);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const BlockHandler =  async (ProductId)=>{
    try {
      const response = await axios.post(
        "/Blockproduct",
        {
          ProductId: ProductId
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admintoken"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getProducts()
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }
  const unBlockHadler = async (productId)=>{
    try {
      const response = await axios.post(
        "/unblockProduct",
        {
          productId: productId
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admintoken"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getProducts()
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }
  return (
    <>
      <Box sx={{ display: "flex",height: '120vh', backgroundColor: '#098B20' }}>
        <AdminSidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Box display={"flex"} justifyContent={"end"}>
              <Button
                onClick={() => modalHandler()}
                variant="contained"
                sx={{ backgroundColor: "white", color: "#000000" }}
              >
                Add a Product
              </Button>
              <StyledModal
                open={open}
                onClose={(e) => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  width={450}
                  height={700}
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
                    Add new Products
                  </Typography>

                  <TextField
                    type="text"
                    fullWidth
                    name="name"
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="Name of the Product"
                    variant="outlined"
                    value={formik.values.name}
                    error={formik.errors.name}
                    helperText={formik.errors.name}
                    onChange={formik.handleChange}
                  />
                  <FormControl sx={{ m: 1, minWidth: 110 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Category
                    </InputLabel>
                    <Select
                      name="category"
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      {...formik.getFieldProps("category")}
                      autoWidth
                      label="Category"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {collection.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 110 }}>
                    <InputLabel id="demo-simple-select-autowidth-label1">
                      Product Type
                    </InputLabel>
                    <Select
                      name="productType"
                      labelId="demo-simple-select-autowidth-label1"
                      id="demo-simple-select-autowidth1"
                      {...formik.getFieldProps("productType")}
                      autoWidth
                      label="productType"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"22k"}>22k</MenuItem>
                      <MenuItem value={"24k"}>24k</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    type="text"
                    name="description"
                    fullWidth
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="Description of the product"
                    variant="outlined"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    type="number"
                    name="weight"
                    fullWidth
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="weight of the gold"
                    variant="outlined"
                    value={formik.values.weight}
                    error={formik.errors.weight}
                    helperText={formik.errors.weight}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    type="number"
                    name="stock"
                    fullWidth
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="Number of Stock"
                    variant="outlined"
                    value={formik.values.stock}
                    error={formik.errors.stock}
                    helperText={formik.errors.stock}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    type="number"
                    name="stoneWeight"
                    fullWidth
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="Stone weight of the product"
                    variant="outlined"
                    value={formik.values.stoneWeight}
                    error={formik.errors.stoneWeight}
                    helperText={formik.errors.stoneWeight}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    type="number"
                    name="stonePrice"
                    fullWidth
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="Stone price of the product"
                    variant="outlined"
                    value={formik.values.stonePrice}
                    error={formik.errors.stonePrice}
                    helperText={formik.errors.stonePrice}
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
            <Box>
              <StyledModal
                open={editopen}
                onClose={(e) => setEditopen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  width={450}
                  height={700}
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
                    Edit product
                  </Typography>

                  <TextField
                    type="text"
                    fullWidth
                    name="name"
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="Name of the Product"
                    variant="outlined"
                    value={editFormik.values.name}
                    error={editFormik.errors.name}
                    helperText={editFormik.errors.name}
                    onChange={editFormik.handleChange}
                  />
                  <FormControl sx={{ m: 1, minWidth: 110 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Category
                    </InputLabel>
                    <Select
                      name="category"
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      {...editFormik.getFieldProps("category")}
                      autoWidth
                      label="Category"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {collection.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 110 }}>
                    <InputLabel id="demo-simple-select-autowidth-label1">
                      Product Type
                    </InputLabel>
                    <Select
                      name="productType"
                      labelId="demo-simple-select-autowidth-label1"
                      id="demo-simple-select-autowidth1"
                      {...editFormik.getFieldProps("productType")}
                      autoWidth
                      label="productType"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"22k"}>22k</MenuItem>
                      <MenuItem value={"24k"}>24k</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    type="text"
                    name="description"
                    fullWidth
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="Description of the product"
                    variant="outlined"
                    value={editFormik.values.description}
                    onChange={editFormik.handleChange}
                  />
                  <TextField
                    type="number"
                    name="weight"
                    fullWidth
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="weight of the gold"
                    variant="outlined"
                    value={editFormik.values.weight}
                    error={editFormik.errors.weight}
                    helperText={editFormik.errors.weight}
                    onChange={editFormik.handleChange}
                  />
                  <TextField
                    type="number"
                    name="stock"
                    fullWidth
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="Number of Stock"
                    variant="outlined"
                    value={editFormik.values.stock}
                    error={editFormik.errors.stock}
                    helperText={editFormik.errors.stock}
                    onChange={editFormik.handleChange}
                  />
                  <TextField
                    type="number"
                    name="stoneWeight"
                    fullWidth
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="Stone weight of the product"
                    variant="outlined"
                    value={editFormik.values.stoneWeight}
                    error={editFormik.errors.stoneWeight}
                    helperText={editFormik.errors.stoneWeight}
                    onChange={editFormik.handleChange}
                  />
                  <TextField
                    type="number"
                    name="stonePrice"
                    fullWidth
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="Stone price of the product"
                    variant="outlined"
                    value={editFormik.values.stonePrice}
                    error={editFormik.errors.stonePrice}
                    helperText={editFormik.errors.stonePrice}
                    onChange={editFormik.handleChange}
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
                      editFormik.setFieldValue("file", e.currentTarget.files);
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
                        editFormik.handleSubmit

                        // setOpen(false);
                      }
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </StyledModal>
            </Box>
            <Typography variant="h5" sx={{ marginBottom: 5, fontWeight: 600,color:'#ffffff', }}>
              Product List
            </Typography>
            <TextField
            type="text"
            fullWidth
            margin="normal"
            size="small"
            placeholder="Search Based on name,weight & product type"
            sx={{ backgroundColor: "white", marginBottom: 2 }}
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Step 4
          />
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  {product && product.length > 0 ? (
                    <>
                      <TableHead>
                        <TableRow>
                          <TableCell>Product Name</TableCell>
                          <TableCell>image</TableCell>
                          <TableCell>product Weight</TableCell>
                          <TableCell>Stone Weight</TableCell>
                          <TableCell>Stone price</TableCell>
                          <TableCell>Stock</TableCell>
                          <TableCell>Product Price</TableCell>
                          <TableCell>Product Type</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Action</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {product &&
                         filterProduct(product).map((value) => (
                            <TableRow key={value._id}>
                              <TableCell> {value.name} </TableCell>
                              <TableCell>
                                <img
                                  src={value.images[0]}
                                  alt=""
                                  style={{
                                    objectFit: "cover",
                                    width: "80px",
                                    height: "80px",
                                  }}
                                />
                              </TableCell>
                              <TableCell>{value?.weight}</TableCell>
                              <TableCell>{value?.StoneWeight}</TableCell>
                              <TableCell>{value?.StonePrice}</TableCell>
                              <TableCell>{value?.stock}</TableCell>
                              <TableCell>{value?.price}</TableCell>
                              <TableCell>{value?.productType}</TableCell>
                              <TableCell>
                                <Box
                                  sx={{
                                    backgroundColor: value.isActive === "Active" ? "#6bff93" : "#fcb8b8",
                                    width: "95%",
                                    borderRadius: 1,
                                    px:0.5,
                                    py:0.3
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
                              <TableCell
                                onClick={() => DeleteHandler(value._id)}
                                sx={{ cursor: "pointer" }}
                              >
                                <DeleteIcon />
                              </TableCell>
                              <TableCell
                                onClick={() => editmodalHandler(value._id)}
                                sx={{ cursor: "pointer" }}
                              >
                                <EditIcon />
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
  );
};

export default Product;
