import * as Yup from "yup";
export const ProductSchema = Yup.object().shape({
    name:Yup.string().required("Please enter a collection name"),
    weight:Yup.string().required("Please enter a collection weight"),
})