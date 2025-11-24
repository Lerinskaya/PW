import Ajv from "ajv";
import { expect } from "@playwright/test";

export function validateJsonSchema(body: object, schema: object) {
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const isValid = validate(body);

    expect.soft(isValid, `Response body should match JSON schema`).toBe(true);
}