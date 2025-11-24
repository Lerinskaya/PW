import { obligatoryFieldsSchema, obligatoryRequiredFieldsSchema } from "./core.schema";

export const loginResponseSchema = {
    type: "object",
    properties: {
        ...obligatoryFieldsSchema.properties,
        User: {
            type: "object",
            properties: {
                _id: { type: "string" },
                username: { type: "string"},
                firstName: { type: "string" },
                lastName: { type: "string" },
                roles: {
                    type: "array",
                    items: { type: "string" },
                },
                createdOn: { type: "string" },
            },
        required: ["_id", "username", "firstName", "lastName", "roles", "createdOn"],
        additionalProperties: false,
        },
    },
    required: ["User", ...obligatoryRequiredFieldsSchema],
    additionalProperties: false,
};