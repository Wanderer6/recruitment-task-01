import { test, expect, request } from '@playwright/test';
import { AlertModal } from '../pages/modals/alert.modal';
import { HeaderComponent } from '../pages/components/header.component';
import { ShopPage } from '../pages/shop.page';
import { ProductPage } from '../pages/product.page';
import { MiniCartModal } from '../pages/modals/mini-cart.modal';
import { CartPage } from '../pages/cart.page';

test.describe('Product tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('Add product to the cart', async ({ page, context }) => {
    const alertModal = new AlertModal(page);
    const headerComponent = new HeaderComponent(page);
    const shopPage = new ShopPage(page);
    const productPage = new ProductPage(page);
    const miniCartModal = new MiniCartModal(page, context);

    const expectedProductName = 'Ploom X Advanced Silver';
    const expectedBasketCount = '1 Item';

    await alertModal.acceptCookiesAndAge();

    await headerComponent.gotoShop();

    await shopPage.clickProductByTitle('Ploom X Advanced');

    await productPage.addToCart();

    await miniCartModal.waitForItem();
    const basketCount = await miniCartModal.getBasketCount();
    expect.soft(basketCount).toEqual(expectedBasketCount);
    const newPage = await miniCartModal.clickCheckout();

    const cartPage = new CartPage(newPage);

    await cartPage.waitForLoadingModule();

    const productName = await cartPage.getProductName();
    expect.soft(productName).toEqual(expectedProductName);
  });

  test('Remove the product from the cart', async ({ page, context }) => {
    const alertModal = new AlertModal(page);
    let headerComponent = new HeaderComponent(page);
    const shopPage = new ShopPage(page);
    const productPage = new ProductPage(page);
    let miniCartModal = new MiniCartModal(page, context);

    const expectedProductName = 'Ploom X Advanced Silver';
    const expectedBasketCount = '1 Item';
    const expectedDeletedBasketCount = '0 Items';
    const expectedItemsInformation = 'You have no items in your shopping cart at the moment.';
    let basketCount: string;

    await alertModal.acceptCookiesAndAge();

    await headerComponent.gotoShop();

    await shopPage.clickProductByTitle('Ploom X Advanced');

    await productPage.addToCart();

    await miniCartModal.waitForItem();
    basketCount = await miniCartModal.getBasketCount();
    expect.soft(basketCount).toEqual(expectedBasketCount);
    const newPage = await miniCartModal.clickCheckout();

    const cartPage = new CartPage(newPage);
    await cartPage.waitForLoadingModule();
    headerComponent = new HeaderComponent(newPage);
    miniCartModal = new MiniCartModal(newPage, context);

    const productName = await cartPage.getProductName();
    expect.soft(productName).toEqual(expectedProductName);
    await cartPage.removeItem();
    const itemsInformation = await cartPage.getEmptyCartInformation();
    expect.soft(itemsInformation).toEqual(expectedItemsInformation);

    await headerComponent.clickMiniCart();

    basketCount = await miniCartModal.getBasketCount();
    expect.soft(basketCount).toEqual(expectedDeletedBasketCount);
  });

  test('Verify links and images on product page', async ({ page, baseURL, context }) => {
    const alertModal = new AlertModal(page);
    const headerComponent = new HeaderComponent(page);
    const shopPage = new ShopPage(page);
    const productPage = new ProductPage(page);

    await alertModal.acceptCookiesAndAge();

    await headerComponent.gotoShop();

    await shopPage.clickProductByTitle('Ploom X Advanced');
    
    await productPage.verifyLinks(baseURL);
    await productPage.verifyImages();
    // await productPage.alternativeVerifyImages();
  });
});
