import test, { expect } from "@playwright/test";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { ProdustsListPage } from "ui/pages/products/productsList.page";
import { credentials } from "data/credentials";
import { IProduct } from "data/types/products";
import { MANUFACTURERS, NOTIFICATIONS } from "data/enums";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";

const productData: IProduct = {
    name: "Product 1",
    manufacturer: MANUFACTURERS.APPLE,
    price: 499,
    amount: 30,
    note: "text"
}

test.describe("[Sales Portal][Products]", () => {
    test("Add new product", async ({page}) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const productsListPage = new ProdustsListPage(page);
        const addNewProductPage = new AddNewProductPage(page);
        
        await loginPage.open();
        await loginPage.fillForm(credentials);
        await loginPage.clickloginButton();
        await homePage.waitForPageOpened();
        await homePage.clickOnViewModule("products");
        await productsListPage.waitForPageOpened();
        await productsListPage.clickAddNewProduct();
        await addNewProductPage.waitForPageOpened();
        await addNewProductPage.fillForm(productData);
        await addNewProductPage.clickSaveButton();
        await productsListPage.waitForPageOpened();
        await expect(productsListPage.notification).toContainText(NOTIFICATIONS.PRODUCT_ADDED_MESSAGE);
        const firstRow = await productsListPage.getFirstTableRowData();
        expect(firstRow.name).toEqual(productData.name);
        expect(firstRow.price).toEqual(productData.price);
        expect(firstRow.manufacturer).toEqual(productData.manufacturer);
    });
})