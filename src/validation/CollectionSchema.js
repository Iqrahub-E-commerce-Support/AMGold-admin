import * as Yup from "yup";
export const CollectionSchema = Yup.object().shape({
    name:Yup.string().required("Please enter a collection name"),
    // description:Yup.string().required("Please enter the field"),
    // price:Yup.string().required("Please enter the price"),
    // discription:Yup.string().required("Please enter the discription")
})