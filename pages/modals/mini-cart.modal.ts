import { Page, Locator, BrowserContext, expect } from '@playwright/test';

type miniCartModalSelectors = {
  item: string;
  basketCount: string;
  checkoutBtn: string;
};

export class MiniCartModal {
  readonly context: BrowserContext;
  readonly page: Page;
  readonly item: Locator;
  readonly basketCount: Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page, context: BrowserContext, selectors: miniCartModalSelectors) {
    this.context = context;
    this.page = page;
    this.item = this.page.getByTestId(selectors.item);
    this.basketCount = this.page.locator(selectors.basketCount);
    this.checkoutBtn = this.page.getByTestId(selectors.checkoutBtn);
  }

  async waitForItem() {
    await this.item.waitFor();
  }

  async getBasketCount() {
    return await this.basketCount.innerText();
  }

  async clickCheckout(projectName: string) {
    if (projectName === 'pl-PL') {
      await this.checkoutBtn.click();
      return this.page;
    }

    const [newPage] = await Promise.all([
      this.context.waitForEvent('page', { predicate: (page) => page.url().includes('/cart') }),
      await this.checkoutBtn.click(),
    ]);
    return newPage;
  }
}
