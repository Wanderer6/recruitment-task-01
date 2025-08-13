import { Page, Locator } from '@playwright/test';

type AlertModalSelectors = {
  acceptCookiesBtn: string;
  ageConfirmationBtn: string;
};

export class AlertModal {
    readonly page: Page;
    readonly acceptBtn: Locator;
    readonly ageConfirmationBtn: Locator;

    constructor(page: Page, selectors: AlertModalSelectors) {
        this.page = page;
        this.acceptBtn = page.getByRole('button', { name: selectors.acceptCookiesBtn });
        this.ageConfirmationBtn = page.getByText(selectors.ageConfirmationBtn);
    }

    async acceptCookiesAndAge() {
        await this.acceptBtn.click();
        await this.ageConfirmationBtn.click();
    }
}