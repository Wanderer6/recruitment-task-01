import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly container: Locator;
  readonly loadingModule: Locator;
  readonly productName: Locator;
  readonly removeItemBtn: Locator;
  readonly confirmRemove: Locator;
  readonly emptyCartText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = this.page.locator('#one-page-checkout');
    this.loadingModule = this.container.locator('.Loading-module-active-VxV5D');
    this.productName = this.page.getByTestId('main-section').locator('strong');
    this.removeItemBtn = this.container.getByTestId('cartRemoveButton');
    this.confirmRemove = this.page.getByTestId('remove-item-submit-button');
    this.emptyCartText = this.container.getByTestId('emptyCartContainer');
  }

  async waitForLoadingModule() {
    try {
      await this.container.locator('.Loading-module-active-VxV5D').waitFor();
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
