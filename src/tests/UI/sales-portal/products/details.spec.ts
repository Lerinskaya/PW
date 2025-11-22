import { test, expect } from "fixtures/pages.fixtures";
import { credentials } from "data/credentials";
import { NOTIFICATIONS } from "data/enums";
import { generateProductData } from "data/products/productDataGenerator";
import _ from "lodash";

test.describe("[Sales Portal][Products][Open Details]", () => {
    test("Open product details", async ({ loginPage, homePage, productsListPage, addNewProductPage}) => {
        const productData = generateProductData();
        
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

        await productsListPage.detailsButton(productData.name).click();
        
        const { detailsModal } = productsListPage;
        await detailsModal.waitForPageOpened();
        const actualModalData = await detailsModal.getData();
        expect(_.omit(actualModalData, ["createdOn"])).toEqual(productData);

    });
})