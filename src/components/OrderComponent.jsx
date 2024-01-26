import {
  Box,
  styled,
  Button,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
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
const OrderComponent = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const getOrders = async () => {
    try {
      const response = await axios.get("/getAllOrder", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
        },
      });
      if (response.data.success) {
        setOrder(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("admintoken")) {
      navigate("/login");
    }
  });
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.post("/updateOrderStatus", {
        orderId: orderId,
        newStatus: newStatus,
      });

      if (response.data.success) {
        getOrders();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const modalHandler = (productId) => {
    const orders = order.find((item) => item._id === productId);
    if (orders) {
      console.log("here");
      setSelectedOrder(orders);
      setOpen(true);
    }
  };
  const filterOrder = (data) => {
    return data.filter((item) =>
      item.transactionid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userid.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moment(item.date).format("Do MMMM YYYY").toLowerCase().includes(searchTerm.toLowerCase()) 

    );
  };
  return (
    <>
      <Box
        sx={{ display: "flex", height: "110vh", backgroundColor: "#098B20" }}
      >
        <AdminSidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography
            variant="h5"
            sx={{ marginBottom: 5, fontWeight: 600, color: "#ffffff" }}
          >
            Order List
          </Typography>
          <TextField
            type="text"
            fullWidth
            margin="normal"
            size="small"
            sx={{ backgroundColor: "white", marginBottom: 2 }}
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Step 4
          />
          <Box sx={{ paddingBottom: 5 }}>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  {order && order?.length > 0 ? (
                    <>
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Customer Name</TableCell>
                          <TableCell>TransactionId</TableCell>
                          <TableCell>Address</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Total Price</TableCell>
                          <TableCell>Products</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order &&
                          filterOrder(order).map((value) => (
                            <TableRow
                               key={value._id}
                            >
                              <TableCell>
                                <Typography>
                               
                                  {moment(value.date).format("Do MMMM YYYY")}
                                </Typography>
                              </TableCell>
                              <TableCell>{value.userid.name}</TableCell>
                              <TableCell>{value.transactionid}</TableCell>
                              <TableCell>
                                <Box>
                                  <Typography>
                                    {value.address.name},{value.address.addName}
                                    ,<br />
                                    {value.address.Area},{value.address.city},
                                    {value.address.state},<br />
                                    {value.address.pincode},
                                    {value.address.phone}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={value.status}
                                  onChange={(event) => {
                                    const newStatus = event.target.value;
                                    handleStatusChange(value._id, newStatus);
                                  }}
                                >
                                  <MenuItem value={"Placed"}>Placed</MenuItem>
                                  <MenuItem value={"Confirmed"}>
                                    Confirmed
                                  </MenuItem>
                                  <MenuItem value="Shipped">Shipped</MenuItem>
                                  <MenuItem value="Delivered">
                                    Delivered
                                  </MenuItem>
                                  <MenuItem value="Delivered">
                                    Cancelled
                                  </MenuItem>
                                </Select>
                              </TableCell>
                              
                              <TableCell>
                                {value.total}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  // color="#098B20"
                                  sx={{
                                    backgroundColor: "#098B20",
                                    ":hover": {
                                      color: "#098B20",
                                      backgroundColor: "#ffffff",
                                      transition: ".8s",
                                    },
                                  }}
                                  onClick={() => modalHandler(value._id)}
                                >
                                  View Products
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                      <StyledModal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          width={350}
                          sx={{ scrollBehavior: "auto" }}
                          bgcolor={"background.default"}
                          color={"text.primary"}
                          p={3}
                          borderRadius={5}
                        >
                          <Typography
                            variant="h6"
                            textAlign="center"
                            sx={{
                              marginBottom: 3,
                              color: "#000000",
                              fontWeight: 600,
                            }}
                          >
                            Products
                          </Typography>

                          {selectedOrder &&
                          selectedOrder.products &&
                          selectedOrder.products.length > 0 ? (
                            selectedOrder.products.map((productInfo) => {
                              const product = productInfo.productId;
                              return (
                                <Box
                                  key={product._id}
                                  sx={{ display: "flex", gap: 5 }}
                                >
                                  <Box
                                    component="img"
                                    sx={{
                                      height: 233,
                                      width: 350,
                                      maxHeight: 100,
                                      maxWidth: 100,
                                    }}
                                    alt="Product Image"
                                    src={product.images && product.images[0]}
                                  />
                                  <Box>
                                    <Typography
                                      sx={{ fontWeight: 600, fontSize: 20 }}
                                    >
                                      {product.name}
                                    </Typography>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        gap: 2,
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontWeight: "medium",
                                          fontSize: 18,
                                        }}
                                      >
                                        {product.weight} gm
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontWeight: "medium",
                                          fontSize: 18,
                                        }}
                                      >
                                        Qty: {productInfo.qty}
                                      </Typography>
                                    
                                    </Box>
                                    <Typography
                                        sx={{
                                          fontWeight: "medium",
                                          fontSize: 18,
                                          marginTop:2
                                        }}
                                      >
                                        Price: {productInfo.productPrice}
                                      </Typography>
                                  </Box>
                                </Box>
                              );
                            })
                          ) : (
                            <Typography variant="body2">
                              No products available for this order.
                            </Typography>
                          )}
                        </Box>
                      </StyledModal>
                    </>
                  ) : (
                    <Box display={"flex"} justifyContent={"center"}>
                      <Typography fontWeight={400} variant="h6">
                        Currently there is no orders
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
  );
};

export default OrderComponent;
