import * as Yup from "yup";
export const CollectionSchema = Yup.object().shape({
    name:Yup.string().required("Please enter a collection name"),
})