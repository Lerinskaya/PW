import { test as base, expect } from "@playwright/test";
import { DeleteConfirmationModal } from "ui/pages/confirmDelete.modal";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProdustsListPage } from "ui/pages/products/productsList.page";

interface IPages {
    loginPage: LoginPage,
    homePage: HomePage,
    productsListPage: ProdustsListPage,
    addNewProductPage: AddNewProductPage
}

const test = base.extend<IPages>({
    loginPage: async({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async({ page }, use) => {
        await use(new HomePage(page));
    },
    productsListPage: async({ page }, use) => {
        await use(new ProdustsListPage(page));
    },
    addNewProductPage: async({ page }, use) => {
        await use(new AddNewProductPage(page));
    }
});

export { test, expect };