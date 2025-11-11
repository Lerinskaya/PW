import test, { expect } from "@playwright/test";
import {userData, invalidUserData, invalidLoginData, NOTIFICATIONS} from "data/demo-login-form/register.data";

test.describe("[Form]", () => {

    test.beforeEach(async ({ page }) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/";
        await page.goto(url, { waitUntil: 'domcontentloaded' });
    });

    for (const { credentials, message, title } of userData) {
        test(title, async ({page}) => {

        const registerOnLoginButton = page.locator("#registerOnLogin");
        const usernameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const registrationMessage = page.locator("#errorMessageOnRegister");
        const registrationFormTitle = page.locator("#registerForm");

        await expect(registerOnLoginButton).toBeVisible();
        await registerOnLoginButton.click();
        await expect(registrationFormTitle).toBeVisible();
        const {username, password} = credentials;
        await usernameInputOnRegister.fill(username);
        await passwordInputOnRegister.fill(password);
        await registerButton.click();
        await expect(registrationMessage).toHaveText(message);
    });
    }

    for (const { credentials, message, title } of invalidUserData) {
        test(title, async ({page}) => {

        const registerOnLoginButton = page.locator("#registerOnLogin");
        const usernameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const registrationMessage = page.locator("#errorMessageOnRegister");
        const {username, password} = credentials;

        await registerOnLoginButton.click();
        await usernameInputOnRegister.fill(username);
        await passwordInputOnRegister.fill(password);
        await registerButton.click();
        await expect(registrationMessage).toHaveText(message);
    });
    }

    for (const { credentials, loginCredentials, message, title } of invalidLoginData) {
        test(title, async ({page}) => {

        const registerOnLoginButton = page.locator("#registerOnLogin");
        const usernameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const backButtonOnRegister = page.locator("#backOnRegister");
        const usernameInput = page.locator("#userName");
        const passwordInput = page.locator("#password");
        const submitButton = page.locator("#submit");
        const registrationMessage = page.locator("#errorMessageOnRegister");
        const loginErrorMessage = page.locator("#errorMessage");
        const {username, password} = credentials;

        await registerOnLoginButton.click();
        await usernameInputOnRegister.fill(username);
        await passwordInputOnRegister.fill(password);
        await registerButton.click();
        await expect(registrationMessage).toHaveText(NOTIFICATIONS.REGISTRATION_SUCCESS);
        await backButtonOnRegister.click();
       
        await usernameInput.fill(loginCredentials!.username);
        await passwordInput.fill(loginCredentials!.password);
        await submitButton.click();
        await expect(loginErrorMessage).toHaveText(message);
    });
    }
});