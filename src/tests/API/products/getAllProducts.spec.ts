import test, { expect } from "@playwright/test";
import { baseURL, endpoints } from "config/apiConfig";
import { credentials } from "data/credentials";
import { generateProductData } from "data/products/productDataGenerator";
import { loginResponseSchema } from "data/schemas/login.schema";
import { createProductSchema } from "data/schemas/products/create.schema";
import { getProductsSchema } from "data/schemas/products/getProducts.schema";
import { IProductFromResponse } from "data/types/products";
import { STATUS_CODES } from "data/types/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponse";

test.describe("[API][Sales Portal][Get Product]", () => {
    let token = "";
    let id = "";

    test.afterEach(async({ request }) => {
        const response = await request.delete(`${baseURL}${endpoints.products}/${id}`, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        expect(response.status()).toBe(STATUS_CODES.DELETED);
    });

    test("Get all products", async ({ request }) => {
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

        const getProductsResponse = await request.get(`${baseURL}${endpoints.allProducts}`, {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        
        const productsResponseData = await getProductsResponse.json();
        await validateResponse(getProductsResponse, { status: STATUS_CODES.OK, schema: getProductsSchema, IsSuccess: true, ErrorMessage: null });

        const actualAllProductsData = productsResponseData.Products as IProductFromResponse[];
        const createdProduct = actualAllProductsData.find(p => p._id === actualProductData._id);
     
        expect(_.omit(createdProduct, ["_id", "createdOn"])).toEqual(productData);
    });
});

            