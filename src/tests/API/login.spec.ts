import test, { expect } from "@playwright/test";
import { baseURL, endpoints } from "config/apiConfig";
import { credentials } from "data/credentials";
import { loginResponseSchema } from "data/schemas/login.schema";
import { STATUS_CODES } from "data/types/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponse";

test.describe("[API][Sales Portal][Login]", () => {
    let token = "";

    test("Login", async ({ request }) => {
        const loginResponse = await request.post(baseURL + endpoints.login, {
            data: credentials,
            headers: {
                "content-type": "application/json",
            }
        });
        const loginBody = await loginResponse.json();
        await validateResponse(loginResponse, { status: STATUS_CODES.OK, schema: loginResponseSchema, IsSuccess: true, ErrorMessage: null });
        expect(loginBody.User.username).toBe(credentials.username);

        const headers = loginResponse.headers();
        token = headers["authorization"]!;
        expect(token).toBeTruthy();
    });
});

            