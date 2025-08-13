import { Page, Locator, request, expect } from '@playwright/test';

type ProductPageSelectors = {
  productContainer: string;
  addToCartBtn: string;
  linkText: string;
  links: string;
  images: string;
};

export class ProductPage {
  readonly page: Page;
  readonly productContainer: Locator;
  readonly addToCartBtn: Locator;
  readonly links: Locator;
  readonly images: Locator;

  constructor(page: Page, selectors: ProductPageSelectors) {
    this.page = page;
    this.productContainer = this.page.locator(selectors.productContainer);
    this.addToCartBtn = this.page.getByTestId(selectors.addToCartBtn);
    this.links = this.page.locator(selectors.links);
    this.images = this.productContainer.locator(selectors.images);
  }

  async addToCart() {
    await this.page.waitForTimeout(4000);
    await this.addToCartBtn.click();
  }

  async verifyLinks(baseURL: string | undefined) {
    await this.addToCartBtn.waitFor();
    const linksCount = await this.links.count();
    for (let i = 0; i < linksCount; i++) {
      const link = this.links.nth(i);
      const rawHref = await link.getAttribute('href');
      if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('javascript')) continue;
      const url = new URL(rawHref, baseURL).toString();
      const apiRequestContext = await request.newContext();
      const response = await apiRequestContext.get(url);
      expect.soft(response.ok()).toBeTruthy();
      await apiRequestContext.dispose();
    }
  }
  
  async verifyImages() {
    const count = await this.images.count();
    for (let i = 0; i < count; i++) {
      await this.images.nth(i).scrollIntoViewIfNeeded();
      const img = await this.images.nth(i).elementHandle();
      if (img) {
        await this.page.waitForFunction((el) => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0, img);
        const isLoaded = await img.evaluate((node) => {
          const image = node as HTMLImageElement;
          return image.complete && image.naturalWidth > 0;
        });
        expect.soft(isLoaded).toBeTruthy();
      } else {
        expect.soft(img).not.toBeNull();
      }
    }
  }

  async alternativeVerifyImages() {
    const count = await this.images.count();
    for (let i = 0; i < count; i++) {
      const image = this.images.nth(i);
      await image.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(700);
      expect.soft(await image.screenshot()).toMatchSnapshot({ maxDiffPixelRatio: 0.01 });
    }
  }
}
