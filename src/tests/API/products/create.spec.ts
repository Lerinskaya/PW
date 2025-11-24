import test, { expect } from "@playwright/test";
import { baseURL, endpoints } from "config/apiConfig";
import { credentials } from "data/credentials";
import { generateProductData } from "data/products/productDataGenerator";
import { createProductSchema } from "data/schemas/products/create.schema";
import { getProductSchema } from "data/schemas/products/get.schema";
import { IProductFromResponse } from "data/types/products";
import { STATUS_CODES } from "data/types/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponse";

test.describe("[API][Sales Portal][Products]", () => {
    let id = "";
    let token = "";

    test.afterEach(async({ request }) => {
        const response = await request.delete(`${baseURL}${endpoints.products}/${id}`, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        expect(response.status()).toBe(STATUS_CODES.DELETED);
    });

    test("Create a product", async ({ request }) => {
        const loginResponse = await request.post(baseURL + endpoints.login, {
            data: credentials,
            headers: {
                "content-type": "application/json",
            }
        });
        const loginBody = await loginResponse.json();
        expect(loginResponse.status()).toBe(STATUS_CODES.OK);
        expect(loginBody.IsSuccess).toBe(true);
        expect(loginBody.ErrorMessage).toBe(null);
        expect(loginBody.User.username).toBe(credentials.username);

        const headers = loginResponse.headers();
        token = headers["authorization"]!;
        expect(token).toBeTruthy();

        const productData = generateProductData();
        const createProductResponse = await request.post(baseURL + endpoints.products, {
            data: productData,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const productResponseBody = await createProductResponse.json();
        await validateResponse(createProductResponse, { status: STATUS_CODES.CREATED, schema: createProductSchema, IsSuccess: true, ErrorMessage: null });

        const actualProductData = productResponseBody.Product as IProductFromResponse;
        expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);

        id = actualProductData._id;

        const getProductResponse = await request.get(`${baseURL}${endpoints.products}/${actualProductData._id}`, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const productResponseData = await getProductResponse.json();
        await validateResponse(getProductResponse, { status: STATUS_CODES.OK, schema: getProductSchema, IsSuccess: true, ErrorMessage: null });

        expect(_.omit(productResponseData.Product, ["_id", "createdOn"])).toEqual(productData);
    });
});

            