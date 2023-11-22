import styled from "@emotion/styled";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { PriceSchema } from "../validation/PriceSchema";
import axios from '../axios/axios'
import toast from "react-hot-toast";
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const GoldPriceChangerComponent = () => {
  const [open, setOpen] = useState(false);
  const [goldprice,setGoldPrice]=useState([])
  const modalHandler = (id) => {
    setOpen(true);
    formik.setFieldValue('id', id);
  };
  const getGoldPrice = async () => {
    try {
      const response = await axios.get("/getgoldPrice", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
      });
      if (response.data.success) {
        setGoldPrice(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGoldPrice();
  }, []);
  const formik = useFormik({
    initialValues: {
      gold22k: "",
      gold24k: "",
    },
    validationSchema: PriceSchema,
    onSubmit: async (values, helpers) => {
      try {
        const response = await axios.post("/updateGoldPrice",{values,});
        if (response.data.success) {
          toast.success(response.data.message);

          getGoldPrice();
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
  return (
    <>
      <Box
        sx={{
          width: 500,
          backgroundColor: "#cad106",
          px: 5,
          py: 3,
          borderRadius: 3,
          animation: "pulse 10s linear infinite", // Adjusted duration to one minute
          "@keyframes pulse": {
            "0%": { opacity: 0.8, transform: "scale(1)" },
            "25%": { opacity: 1, transform: "scale(1.1)" },
            "50%": { opacity: 0.8, transform: "scale(1)" },
            "75%": { opacity: 1, transform: "scale(1.1)" },
            "100%": { opacity: 0.8, transform: "scale(1)" },
          },
        }}
      >
        <Typography textAlign={"center"} variant="h5">
          Today's Gold Price
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 10, mt: 3 }}>
          <Box>
            <Typography>
              22k: <span style={{ fontWeight: 600 }}>{goldprice[0]?.gold22k}</span> per gram
            </Typography>
          </Box>
          <Box>
            <Typography>
              24k:<span style={{ fontWeight: 600 }}>{goldprice[0]?.gold24k}</span> per gram
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Button
            onClick={() => modalHandler(goldprice[0]?._id)}
            sx={{
              color: "#ffffff",
              backgroundColor: "black",
              transition: "0.5s",
              ":hover": { color: "black", backgroundColor: "white" },
            }}
            variant="contained"
          >
            Update Price
          </Button>
        </Box>
        <StyledModal
          open={open}
          onClose={(e) => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            width={450}
            height={300}
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
              Update Gold Price
            </Typography>

            <TextField
              type="number"
              fullWidth
              name="gold22k"
              margin="normal"
              size="small"
              sx={{ backgroundColor: "white" }}
              label="price for 22K"
              variant="outlined"
              value={formik.values.charge}
              error={formik.errors.charge}
              helperText={formik.errors.charge}
              onChange={formik.handleChange}
            />
            <TextField
              type="number"
              fullWidth
              name="gold24k"
              margin="normal"
              size="small"
              sx={{ backgroundColor: "white" }}
              label="price for 24K"
              variant="outlined"
              value={formik.values.charge}
              error={formik.errors.charge}
              helperText={formik.errors.charge}
              onChange={formik.handleChange}
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
    </>
  );
};

export default GoldPriceChangerComponent;
