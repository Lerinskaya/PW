import { IProduct } from "data/types/products";
import { SalesPortalPage } from "../salesPortal.page";

export class AddNewProductPage extends SalesPortalPage {
    readonly addProductPageTitle = this.page.locator(".page-title-text");
    readonly nameInput = this.page.locator("#inputName");
    readonly manufacturerSelect = this.page.locator("#inputManufacturer");
    readonly priceInput = this.page.locator("#inputPrice");
    readonly amountInput = this.page.locator("#inputAmount");
    readonly noteInput = this.page.locator("#textareaNotes");
    readonly saveNewProductButton = this.page.locator("#save-new-product");
    readonly uniqueElement = this.addProductPageTitle;

    async fillForm(productData: Partial<IProduct>) {
        if(productData.name) await this.nameInput.fill(productData.name);
        if(productData.manufacturer) await this.manufacturerSelect.selectOption(productData.manufacturer);
        if(productData.price) await this.priceInput.fill(productData.price.toString());
        if(productData.amount) await this.amountInput.fill(productData.amount.toString());
        if(productData.note) await this.noteInput.fill(productData.note);    
    }
    
    async clickSaveButton() {
        await this.saveNewProductButton.click();
    }
}