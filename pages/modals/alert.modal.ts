import { Page, Locator } from '@playwright/test';

export class AlertModal {
    readonly page: Page;
    readonly acceptBtn: Locator;
    readonly ageConfirmationBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.acceptBtn = page.getByRole('button', { name: 'GOT IT' });
        this.ageConfirmationBtn = page.getByText('Yes, discover more');
    }

    async acceptCookiesAndAge() {
        await this.acceptBtn.click();
        await this.ageConfirmationBtn.click();
    }
}