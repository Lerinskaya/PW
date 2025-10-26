import test, { expect } from "@playwright/test";

test.describe("[Dynamic Controls]", () => {

    test.beforeEach(async ({ page }) => {
        const url = "https://the-internet.herokuapp.com/";
        await page.goto(url, { waitUntil: 'domcontentloaded' });
    });

    test("Dynamic Controls test", async ({page}) => {

        const dynamicControlsLink = page.getByRole('link', { name: 'Dynamic Controls' });
        const removeButton = page.getByRole('button', { name: 'Remove' });
        const addButton = page.getByRole('button', { name: 'Add' });
        const header = page.locator('h4').first();
        const description = page.locator('p')
        const checkbox = page.locator('input[label="blah"]');
        const message = page.locator("#message");
        const checkboxSecond = page.locator('#checkbox');
       
        await dynamicControlsLink.click();
        await removeButton.waitFor({ state: 'visible' });
        await checkbox.waitFor({ state: 'visible' });
        await expect(header).toHaveText('Dynamic Controls');
        await expect(description).toHaveText('This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.');
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        await removeButton.click();
        await checkbox.waitFor({ state: 'detached' });
        await addButton.waitFor({ state: 'visible' });
        await message.waitFor({ state: 'visible' });
        await expect(message).toHaveText("It's gone!");
        await addButton.click();
        await checkboxSecond.waitFor({ state: 'visible' });
        await expect(message).toHaveText("It's back!");
    });
});
