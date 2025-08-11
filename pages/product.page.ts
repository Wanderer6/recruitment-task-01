import { Page, Locator, request, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartBtn: Locator;
  readonly links: Locator[];
  readonly imageLocators: Locator[];

  constructor(page: Page) {
    this.page = page;
    this.addToCartBtn = this.page.getByTestId('pdpAddToProduct');

    this.links = [
      this.page.locator('[data-sku="PLOOM-X-FLAVOUR BUN"] a').filter({ hasNotText: 'Buy Now' }),
      this.page.locator('[data-sku="PLOOM-X-FLAVOUR BUN"] a').filter({ hasText: 'Buy Now' }),
      this.page.locator('[data-sku="EVO-MIX-10-PACK"] a').filter({ hasNotText: 'Buy Now' }),
      this.page.locator('[data-sku="EVO-MIX-10-PACK"] a').filter({ hasText: 'Buy Now' }),
      this.page.locator('[data-sku="PLOOM-X-STARTER-BUNDLE"] a').filter({ hasNotText: 'Buy Now' }),
      this.page.locator('[data-sku="PLOOM-X-STARTER-BUNDLE"] a').filter({ hasText: 'Buy Now' }),
    ];

    this.imageLocators = [
      this.page.getByTestId('aem-carousel__thumbnail-0'),
      this.page.getByTestId('aem-carousel__thumbnail-2'),
      this.page.getByTestId('aem-carousel__thumbnail-3'),
      this.page.locator('[data-sku="PLOOM-X-FLAVOUR BUN"] img'),
      this.page.locator('[data-sku="EVO-MIX-10-PACK"] img'),
      this.page.locator('[data-sku="PLOOM-X-STARTER-BUNDLE"] img'),
      this.page.getByRole('img', { name: 'Black Ploom X Device', exact: true }),
      this.page.getByRole('img', { name: 'Opened Black Ploom X Device' }),
      this.page.getByRole('img', { name: 'Ploom X Devices in various' }),
      this.page.getByRole('img', { name: 'Ploom X Device in Black' }),
    ];
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }

  async verifyLinks(baseURL: string | undefined) {
    for (const link of this.links) {
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
    for (const locator of this.imageLocators) {
      await locator.scrollIntoViewIfNeeded();
      await this.page.waitForTimeout(500);
      expect.soft(await locator.screenshot()).toMatchSnapshot({ maxDiffPixels: 15 });
    }
  }

  async alternativeVerifyImages() {
    for (const locator of this.imageLocators) {
      await locator.scrollIntoViewIfNeeded();
      const img = await locator.elementHandle();
      if (img) {
        await this.page.waitForFunction((el) => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0, img);
        const isLoaded = await img.evaluate((node) => {
          const image = node as HTMLImageElement;
          return image.complete && image.naturalWidth > 0;
        });
        expect(isLoaded).toBeTruthy();
      } else {
        expect(img).not.toBeNull();
      }
    }
  }
}
