import { SALES_PORTAL_API_URL } from "./env";

export const baseURL = SALES_PORTAL_API_URL;
export const endpoints = {
    login: "/api/login",
    products: "/api/products",
    allProducts: "/api/products/all"
};