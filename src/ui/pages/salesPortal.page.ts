import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { SALES_PORTAL_URL } from "config/env";

export abstract class SalesPortalPage extends BasePage{
    readonly spinner = this.page.locator(".spinner-border");
    readonly toast = this.page.locator(".d-flex:has(.toast-body)");
    readonly notification = this.toast.locator(".toast-body");
    readonly closeNotificationButton = this.toast.locator("button.btn-close");
    abstract readonly uniqueElement: Locator;

    async waitForPageOpened() {
        await expect(this.uniqueElement).toBeVisible();
        await this.waitForSpinners();
    }

    async waitForSpinners() {
        await expect(this.spinner).toHaveCount(0);
    }

    async open() {
        await this.page.goto(SALES_PORTAL_URL);
    }

    async closeNotification() {
        await this.closeNotificationButton.click();
    }
}