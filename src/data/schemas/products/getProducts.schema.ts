import { obligatoryFieldsSchema, obligatoryRequiredFieldsSchema } from "../core.schema";
import { productSchema } from "./product.schema";

export const getProductsSchema = {
  type: "object",
  properties: {
    ...obligatoryFieldsSchema.properties,

    Products: {
      type: "array",
      items: productSchema,
    },
  },
  required: ["Products", ...obligatoryRequiredFieldsSchema],
  additionalProperties: false,
};