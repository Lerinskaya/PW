import { obligatoryFieldsSchema, obligatoryRequiredFieldsSchema } from "../core.schema";
import { productSchema } from "./product.schema";

export const createProductSchema = {
    type: "object",
    properties: {
        Product: {
        ...productSchema
        },
        ...obligatoryFieldsSchema.properties,
    },
    required: [
        "Product",
        ...obligatoryRequiredFieldsSchema,
    ],
    additionalProperties: false,
};