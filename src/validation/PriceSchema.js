import * as Yup from "yup";
export const PriceSchema = Yup.object().shape({
    gold22k:Yup.string().required("Please enter a collection name"),
    gold24k:Yup.string().required("Please enter a collection name"),
})