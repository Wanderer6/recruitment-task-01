import { Page, Locator } from '@playwright/test';

type CartPageSelectors = {
  container: string;
  loadingModule: string;
  productName: string;
  removeItemBtn: string;
  confirmRemove: string;
  emptyCartText: string;
};

export class CartPage {
  readonly page: Page;
  readonly container: Locator;
  readonly loadingModule: Locator;
  readonly productName: Locator;
  readonly removeItemBtn: Locator;
  readonly confirmRemove: Locator;
  readonly emptyCartText: Locator;

  constructor(page: Page, selectors: CartPageSelectors) {
    this.page = page;
    this.container = this.page.locator(selectors.container);
    this.loadingModule = this.container.locator(selectors.loadingModule);
    this.productName = this.page.getByTestId(selectors.productName).locator('strong');
    this.removeItemBtn = this.container.getByTestId('cartRemoveButton');
    this.confirmRemove = this.page.getByTestId(selectors.confirmRemove);
    this.emptyCartText = this.container.getByTestId(selectors.emptyCartText);
  }

  async waitForLoadingModule() {
    try {
      await this.loadingModule.waitFor();
      await this.loadingModule.waitFor({ state: 'hidden', timeout: 5000 });
    } catch (error) {
      await this.page.reload();
    }
  }

  async getProductName() {
    return await this.productName.innerHTML();
  }

  async removeItem() {
    this.removeItemBtn.click();
    this.confirmRemove.click();
  }

  async getEmptyCartInformation() {
    return this.emptyCartText.innerHTML();
  }
}
