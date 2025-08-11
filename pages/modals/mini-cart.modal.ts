import { Page, Locator, BrowserContext } from '@playwright/test';

export class MiniCartModal {
  readonly context: BrowserContext;
  readonly page: Page;
  readonly item: Locator;
  readonly basketCount: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.context = context;
    this.page = page;
    this.item = this.page.getByTestId('item');
    this.basketCount = this.page.locator('.CartMiniHeader-module-count-i2EyF');
    this.checkoutBtn = this.page.getByTestId('miniCartCheckoutButton');
  }

  async waitForItem() {
    await this.item.waitFor();
  }

  async getBasketCount() {
    return await this.basketCount.innerText();
  }

  async clickCheckout() {
    const [newPage] = await Promise.all([this.context.waitForEvent('page'), await this.checkoutBtn.click()]);
    return newPage;
  }
}
