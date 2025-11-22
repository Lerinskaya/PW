import { ITableRowData } from "data/types/products";
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "data/enums";
import { DetailsModal } from "../details.modal";
import { DeleteConfirmationModal } from "../confirmDelete.modal";

export class ProdustsListPage extends SalesPortalPage {
    readonly detailsModal = new DetailsModal(this.page);
    readonly deleteConfirmationModal = new DeleteConfirmationModal(this.page);
    readonly productsPageTitle = this.page.locator("h2.fw-bold");
    readonly addProductButton = this.page.locator("[name=add-button]");
    readonly uniqueElement = this.productsPageTitle;
    readonly firstTableRow = this.page.locator("table tbody tr").first();
    readonly tableRow = this.page.locator("table tbody tr");
    readonly cells = this.firstTableRow.locator('td');

    readonly tableRowByName = (productName: string) =>
        this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName })});
    readonly tableRowByIndex = (index: number) => this.page.locator("table tbody tr").nth(index);

    readonly nameCell = (nameOrIndex: string | number) =>
        typeof nameOrIndex === "string"
            ? this.tableRowByName(nameOrIndex).locator("td").nth(0)
            : this.tableRowByIndex(nameOrIndex).locator("td").nth(0);
    readonly priceCell = (nameOrIndex: string | number) =>
        typeof nameOrIndex === "string"
            ? this.tableRowByName(nameOrIndex).locator("td").nth(1)
            : this.tableRowByIndex(nameOrIndex).locator("td").nth(1);
    readonly manufacturerCell = (nameOrIndex: string | number) =>
        typeof nameOrIndex === "string"
            ? this.tableRowByName(nameOrIndex).locator("td").nth(2)
            : this.tableRowByIndex(nameOrIndex).locator("td").nth(2);
    readonly createdOnCell = (nameOrIndex: string | number) =>
        typeof nameOrIndex === "string"
            ? this.tableRowByName(nameOrIndex).locator("td").nth(3)
            : this.tableRowByIndex(nameOrIndex).locator("td").nth(3);

    readonly editButton = (productName: string) => this.tableRowByName(productName).getByTitle("Edit");
    readonly detailsButton = (productName: string) => this.tableRowByName(productName).getByTitle("Details");
    readonly deleteButton = (productName: string) => this.tableRowByName(productName).getByTitle("Delete");

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

    async getTableData(): Promise<ITableRowData[]>{
        const data: ITableRowData[] = [];
        const rows = await this.tableRow.all();

        for(const row of rows) {
            const cells = await row.locator("td").allInnerTexts();
            const [name, price, manufacturer] = cells;

            if (cells.length === 1 && cells[0]!.includes("No records created yet")) {
                return [];
            }

            data.push({
                name: name!,
                price: +price!.replace("$",""),
                manufacturer: manufacturer! as MANUFACTURERS
            });
        }
        return data;
    }
}