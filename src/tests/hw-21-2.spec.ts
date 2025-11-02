import test, { expect, Page } from "@playwright/test";
import { expectedData } from "data/heroku/table.data";

test.describe("[Table]", () => {
    
    async function getTableRow(page: Page, email: string) {
        const table = page.locator("#table2");

        const headersLocator = await table.locator("th").all();
        headersLocator.pop();
        const headers = await Promise.all(headersLocator.map((el) => el.innerText()));

        const tableRow = table.locator("tbody tr").filter({hasText: email});
            
        const cellsLocator = tableRow.locator("td").filter({ hasNot: page.locator("a") });
        const cells = await cellsLocator.allInnerTexts();

        const rowData = headers.reduce<Record<string, string>>((result, header, i) => {
            result[header] = cells[i]!;
            return result;
        }, {});

        return rowData;
    };

    test.beforeEach(async ({ page }) => {
        const url = "https://the-internet.herokuapp.com/tables";
        await page.goto(url, { waitUntil: 'domcontentloaded' });
    });

    for(const {Email} of expectedData) {
        test(`Parse table data by email ${Email}`, async ({page}) => {
            const actualUserData = await getTableRow(page, Email);
            const expectedUserData = expectedData.find(row => row.Email === Email)
            expect(actualUserData, `Should show user data by email`).toStrictEqual(expectedUserData);
    }); 
    };
});