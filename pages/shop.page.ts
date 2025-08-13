import { Page } from '@playwright/test';

export class ShopPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickProductByTitle(title: string) {
    await this.page.getByTitle(title).scrollIntoViewIfNeeded();
    await this.page.getByTitle(title).click();
  }
}
