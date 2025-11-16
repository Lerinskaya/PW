import { ITableRowData } from "data/types/products";
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "data/enums";

export class ProdustsListPage extends SalesPortalPage {
    readonly productsPageTitle = this.page.locator("h2.fw-bold");
    readonly addProductButton = this.page.locator("[name=add-button]");
    readonly uniqueElement = this.productsPageTitle;
    readonly firstTableRow = this.page.locator("table tbody tr").first();
    readonly cells = this.firstTableRow.locator('td');

    async clickAddNewProduct() {
        await this.addProductButton.click();
    }

    async getFirstTableRowData():Promise<ITableRowData>{
    const texts = await this.cells.allInnerTexts();
    const [name, rawPrice, manufacturer] = texts.slice(0, 3) as [string, string, MANUFACTURERS];
    const price = Number(rawPrice.replace(/[^0-9.]/g, ''));

    return {
        name,
        price,
        manufacturer
    };
}
}