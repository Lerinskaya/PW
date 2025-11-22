import { SalesPortalPage } from "./salesPortal.page";

export class DeleteConfirmationModal extends SalesPortalPage{
    readonly modalId = this.page.locator(".modal-content");
    readonly uniqueElement = this.modalId;
    readonly confirmButton = this.uniqueElement.locator("button.btn-danger");
    readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");
    readonly closeButton = this.uniqueElement.locator("button.btn-close");

    async close() {
        await this.closeButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async clickConfirm() {
        await this.confirmButton.click();
    }
}