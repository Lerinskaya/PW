import test, { expect } from "@playwright/test";

interface ICredentials {
    username: string,
    password: string
}

enum NOTIFICATIONS {
    REGISTRATION_SUCCESS = "Successfully registered! Please, click Back to return on login page",
    REGISTRATION_FAIL = "Password should contain at least 8 characters",
    LOGIN_FAIL = "Invalid credentials",
    EMPTY_REGISTER_FORM = "Please, provide valid data"
}

enum TITLES {
    REGISTRATION_FORM = "Registration",
    LOGIN_FORM = "Login"
}


test.describe("[Form]", () => {

    const credentials: ICredentials = {
        username: "user",
        password: "Qwerty123!"
    }

    const invalidCredentials: ICredentials[] = [
        { 
            username: "user",
            password: "Qwerty123"
        },
        {
            username: "user",
            password: "Qwerty"
        },
        {
            username: "",
            password: ""
        }
    ]

    test.beforeEach(async ({ page }) => {
        const url = "https://anatoly-karpovich.github.io/demo-login-form/";
        await page.goto(url, { waitUntil: 'domcontentloaded' });
    });

    test("Register button should open registration form", async ({page}) => {

        const registerOnLoginButton = page.locator("#registerOnLogin");
        const registrationFormTitle = page.locator("#registerForm");
       
        await registerOnLoginButton.click();
        await expect(registrationFormTitle).toHaveText(TITLES.REGISTRATION_FORM);
    });

    test("Back button should open login form", async ({page}) => {

        const registerOnLoginButton = page.locator("#registerOnLogin");
        const loginFormTitle = page.locator("#loginForm");
        const backButtonOnRegister = page.locator("#backOnRegister");
       
        await registerOnLoginButton.click();
        await backButtonOnRegister.click();
        await expect(loginFormTitle).toHaveText(TITLES.LOGIN_FORM);
    });

    test("Should register with valid credentials", async ({page}) => {

        const registerOnLoginButton = page.locator("#registerOnLogin");
        const usernameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const registrationMessage = page.locator("#errorMessageOnRegister");
       
        await registerOnLoginButton.click();
        await usernameInputOnRegister.fill(credentials.username);
        await passwordInputOnRegister.fill(credentials.password);
        await registerButton.click();
        await expect(registrationMessage).toHaveText(NOTIFICATIONS.REGISTRATION_SUCCESS);
    });

    test("Should login with valid credentials", async ({page}) => {

        const registerOnLoginButton = page.locator("#registerOnLogin");
        const usernameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const backButtonOnRegister = page.locator("#backOnRegister");
        const usernameInput = page.locator("#userName");
        const passwordInput = page.locator("#password");
        const submitButton = page.locator("#submit");
        const loginSuccessMessage = page.locator("#successMessage");
    
        await registerOnLoginButton.click();
        await usernameInputOnRegister.fill(credentials.username);
        await passwordInputOnRegister.fill(credentials.password);
        await registerButton.click();
        await backButtonOnRegister.click();
       
        await usernameInput.fill(credentials.username);
        await passwordInput.fill(credentials.password);
        await submitButton.click();
        await expect(loginSuccessMessage).toContainText(`${credentials.username}`);
    });

    test("Should logout after login", async ({page}) => {

        const registerOnLoginButton = page.locator("#registerOnLogin");
        const usernameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const backButtonOnRegister = page.locator("#backOnRegister");
        const usernameInput = page.locator("#userName");
        const passwordInput = page.locator("#password");
        const submitButton = page.locator("#submit");
        const logoutButton = page.locator("#backButton");
        const loginFormTitle = page.locator("#loginForm");
    
        await registerOnLoginButton.click();
        await usernameInputOnRegister.fill(credentials.username);
        await passwordInputOnRegister.fill(credentials.password);
        await registerButton.click();
        await backButtonOnRegister.click();
       
        await usernameInput.fill(credentials.username);
        await passwordInput.fill(credentials.password);
        await submitButton.click();

        await logoutButton.click();
        await expect(loginFormTitle).toHaveText(TITLES.LOGIN_FORM);
    });

    test("Should not register with invalid credentials", async ({page}) => {

        const registerOnLoginButton = page.locator("#registerOnLogin");
        const usernameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const registrationMessage = page.locator("#errorMessageOnRegister");
        const creds = invalidCredentials[1]!;
       
        await registerOnLoginButton.click();
        await usernameInputOnRegister.fill(creds.username);
        await passwordInputOnRegister.fill(creds.password);
        await registerButton.click();
        await expect(registrationMessage).toHaveText(NOTIFICATIONS.REGISTRATION_FAIL);
    });

    test("Should not register with empty credentials", async ({page}) => {

        const registerOnLoginButton = page.locator("#registerOnLogin");
        const usernameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const registrationMessage = page.locator("#errorMessageOnRegister");
        const creds = invalidCredentials[2]!;
       
        await registerOnLoginButton.click();
        await usernameInputOnRegister.fill(creds.username);
        await passwordInputOnRegister.fill(creds.password);
        await registerButton.click();
        await expect(registrationMessage).toHaveText(NOTIFICATIONS.EMPTY_REGISTER_FORM);
    });

    test("Should not login with invalid credentials", async ({page}) => {

        const registerOnLoginButton = page.locator("#registerOnLogin");
        const usernameInputOnRegister = page.locator("#userNameOnRegister");
        const passwordInputOnRegister = page.locator("#passwordOnRegister");
        const registerButton = page.locator("#register");
        const backButtonOnRegister = page.locator("#backOnRegister");
        const usernameInput = page.locator("#userName");
        const passwordInput = page.locator("#password");
        const submitButton = page.locator("#submit");
        const loginErrorMessage = page.locator("#errorMessage");
        const creds = invalidCredentials[0]!;

        await registerOnLoginButton.click();
        await usernameInputOnRegister.fill(credentials.username);
        await passwordInputOnRegister.fill(credentials.password);
        await registerButton.click();
        await backButtonOnRegister.click();
       
        await usernameInput.fill(creds.username);
        await passwordInput.fill(creds.password);
        await submitButton.click();
        await expect(loginErrorMessage).toHaveText(NOTIFICATIONS.LOGIN_FAIL);
    });
});