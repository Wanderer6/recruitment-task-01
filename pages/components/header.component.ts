import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly navigationItemContainer: Locator;
  readonly shopLink: Locator;
  readonly closeMenuBtn: Locator;
  readonly miniCartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigationItemContainer = page.locator('.navigation__item--active');
    this.shopLink = page.getByTestId('headerItem-0');
    this.closeMenuBtn = this.navigationItemContainer.getByTestId('CloseShopMenu');
    this.miniCartBtn = this.page.getByTestId('cartIcon');
  }

  async gotoShop() {
    await this.shopLink.click();
    await this.closeMenuBtn.click();
  }

  async clickMiniCart(){
    await this.miniCartBtn.click();
  }
}
