import { IProductDetails } from "data/types/products";
import { SalesPortalPage } from "./salesPortal.page";
import { MANUFACTURERS } from "data/enums";

export class DetailsModal extends SalesPortalPage{
    readonly modalId = this.page.locator("#ProductDetailsModal");
    readonly uniqueElement = this.modalId;
    readonly title = this.uniqueElement.locator("h5");
    readonly productValue = this.uniqueElement.locator("p");
    readonly closeButton = this.uniqueElement.locator("button.btn-close");
    readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");
    readonly editButton = this.uniqueElement.locator("button.btn-primary");

    async close() {
        await this.closeButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async clickEdit() {
        await this.editButton.click();
    }

    async getData(): Promise<IProductDetails> {
        const [name, amount, price, manufacturer, createdOn, note] = await this.productValue.allInnerTexts();
        return {
            name: name!,
            amount: +amount!,
            price: +price!.replace("$",""),
            manufacturer: manufacturer! as MANUFACTURERS,
            createdOn: createdOn!,
            notes: note! === "-" ? "" : note!
        };
    }
}