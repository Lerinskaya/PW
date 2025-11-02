import test, { expect } from "@playwright/test";

interface ICredentials {
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    phone: string,
    country: string,
    language: string,
    skills: string,
    year: string,
    month: string,
    day: string
    password: string,
    confirmation: string
}

enum TITLES {
    REGISTRATION_SUCCESS = "Registration Details",
}

test.describe("[Registration Form]", () => {

    const credentials: ICredentials = {
        firstName: "Tom",
        lastName: "Ford",
        address: "Some address",
        email: "tom@emailsreg.com",
        phone: "+48507507508",
        country: "UK",
        language: "English",
        skills: "JavaScript",
        year: "1990",
        month: "December",
        day: "9",
        password: "Qwerty123!",
        confirmation: "Qwerty123!"
    }

    test.beforeEach(async ({ page }) => {
        const url = "https://anatoly-karpovich.github.io/demo-registration-form/";
        await page.goto(url, { waitUntil: 'domcontentloaded' });
    });

    test("Should register with valid credentials", async ({page}) => {

        const firstNameInput = page.locator("#firstName");
        const lastNameInput = page.locator("#lastName");
        const addressInput = page.locator("#address");
        const emailInput = page.locator("#email");
        const phoneInput = page.locator("#phone");
        const countryInput = page.locator("#country");
        const maleGender = page.locator('input[name="gender"][value="male"]');
        const travellingHobbyOption = page.locator('input.hobby[value="Travelling"]');
        const languageInput = page.locator("#language");
        const skillsSelect = page.locator("#skills");
        const yearSelect = page.locator("#year");
        const monthSelect = page.locator("#month");
        const daySelect = page.locator("#day");
        const passwordInput = page.locator("#password");
        const passwordConfirmationInput = page.locator("#password-confirm");
        const submitButton = page.getByRole('button', { name: 'Submit' });
        const regDetails = page.locator('h2.text-center');
       
        await firstNameInput.fill(credentials.firstName);
        await lastNameInput.fill(credentials.lastName);
        await addressInput.fill(credentials.address);
        await emailInput.fill(credentials.email);
        await phoneInput.fill(credentials.phone);
        await countryInput.selectOption(credentials.country);
        await maleGender.click();
        await travellingHobbyOption.click();
        await languageInput.fill(credentials.language);
        await skillsSelect.selectOption(credentials.skills);
        await yearSelect.selectOption(credentials.year);
        await monthSelect.selectOption(credentials.month);
        await daySelect.selectOption(credentials.day);
        await passwordInput.fill(credentials.password);
        await passwordConfirmationInput.fill(credentials.password);
        await submitButton.click();
        await expect(regDetails).toHaveText(TITLES.REGISTRATION_SUCCESS);
    });
});