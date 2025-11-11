import { SalesPortalPage } from "./salesPortal.page";
import { ICredentials } from "data/types/credentials";

export class LoginPage extends SalesPortalPage{
    readonly emailInput = this.page.locator("#emailinput");
    readonly passwordInput = this.page.locator("#passwordinput");
    readonly loginButton = this.page.locator(".loginBtn");
    uniqueElement = this.loginButton;

    async fillForm(credentials: Partial<ICredentials>) {
        if(credentials.username) await this.emailInput.fill(credentials.username);
        if(credentials.password) await this.passwordInput.fill(credentials.password); 
    }

    async clickloginButton() {
        await this.loginButton.click();
    }
}