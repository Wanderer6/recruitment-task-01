import { Page, Locator } from '@playwright/test';

type HeaderComponentSelectors = {
  navigationItemContainer: string;
  shopText: string;
  closeMenuBtn: string;
  miniCartBtn: string;
  navigationLinkContainer: string;
};

export class HeaderComponent {
  readonly page: Page;
  readonly navigationItemContainer: Locator;
  readonly shopLink: Locator;
  readonly closeMenuBtn: Locator;
  readonly miniCartBtn: Locator;
  readonly navigationLinkContainer: Locator;

  constructor(page: Page, selectors: HeaderComponentSelectors) {
    this.page = page;
    this.navigationLinkContainer = page.locator(selectors.navigationLinkContainer);
    this.navigationItemContainer = page.locator(selectors.navigationItemContainer);
    this.shopLink = this.navigationLinkContainer.getByText(selectors.shopText);
    this.closeMenuBtn = this.navigationItemContainer.getByTestId(selectors.closeMenuBtn);
    this.miniCartBtn = this.page.getByTestId(selectors.miniCartBtn);
  }

  async gotoShop() {
    await this.shopLink.click();
    await this.closeMenuBtn.click();
  }

  async clickMiniCart() {
    await this.miniCartBtn.click();
  }
}
