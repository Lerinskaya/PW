import {Locator, Page} from "@playwright/test";
import { SalesPortalPage } from "./salesPortal.page";

type HomeModuleButton = "products" | "customers" | "orders";

export class HomePage extends SalesPortalPage{
    readonly mainPageTitle = this.page.locator(".welcome-text");
    readonly productsButton = this.page.locator("#products-from-home");
    readonly customersButton = this.page.locator("#customers-from-home");
    readonly ordersButton = this.page.locator("#orders-from-home");
    readonly uniqueElement = this.mainPageTitle;

    async clickOnViewModule(module: HomeModuleButton) {
        const moduleButtons: Record<HomeModuleButton, Locator> = {
            products: this.productsButton,
            customers: this.customersButton,
            orders: this.ordersButton
        }

        await moduleButtons[module].click();
    }
}