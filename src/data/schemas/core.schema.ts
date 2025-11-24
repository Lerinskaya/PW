export const obligatoryFieldsSchema = {
    type: "object",
    properties: {
        IsSuccess: {
            type: "boolean"
        },
        ErrorMessage: {
            type: ["string", "null"]
        }
    }
}

export const obligatoryRequiredFieldsSchema = ["IsSuccess", "ErrorMessage"];