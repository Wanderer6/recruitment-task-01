import { test, expect } from '../fixtures/localization.fixture';
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

  test('Add product to the cart', async ({ page, context, localizationFixture }, testInfo) => {
    const alertModal = new AlertModal(page, localizationFixture.selectors.alertModal);
    const headerComponent = new HeaderComponent(page, localizationFixture.selectors.headerComponent);
    const shopPage = new ShopPage(page);
    const productPage = new ProductPage(page, localizationFixture.selectors.productPage);
    const miniCartModal = new MiniCartModal(page, context, localizationFixture.selectors.miniCartModal);

    const expectedProductName = localizationFixture.testData.expectedProductName;
    const expectedBasketCount = localizationFixture.testData.expectedBasketCount;

    await alertModal.acceptCookiesAndAge();

    await headerComponent.gotoShop();
    await shopPage.clickProductByTitle(localizationFixture.testData.productTitle);

    await productPage.addToCart();

    await miniCartModal.waitForItem();
    const basketCount = await miniCartModal.getBasketCount();
    expect.soft(basketCount).toEqual(expectedBasketCount);
    const projectName = testInfo.project.name;
    const checkoutPage = await miniCartModal.clickCheckout(projectName);

    const cartPage = new CartPage(checkoutPage, localizationFixture.selectors.cartPage);

    await cartPage.waitForLoadingModule();

    const productName = await cartPage.getProductName();
    expect.soft(productName).toEqual(expectedProductName);
  });

  test('Remove the product from the cart', async ({ page, context, localizationFixture }, testInfo) => {
    const alertModal = new AlertModal(page, localizationFixture.selectors.alertModal);
    let headerComponent = new HeaderComponent(page, localizationFixture.selectors.headerComponent);
    const shopPage = new ShopPage(page);
    const productPage = new ProductPage(page, localizationFixture.selectors.productPage);
    let miniCartModal = new MiniCartModal(page, context, localizationFixture.selectors.miniCartModal);

    const expectedProductName = localizationFixture.testData.expectedProductName;
    const expectedBasketCount = localizationFixture.testData.expectedBasketCount;
    const expectedDeletedBasketCount = localizationFixture.testData.expectedDeletedBasketCount;
    const expectedItemsInformation = localizationFixture.testData.expectedItemsInformation;
    let basketCount: string;

    await alertModal.acceptCookiesAndAge();

    await headerComponent.gotoShop();

    await shopPage.clickProductByTitle(localizationFixture.testData.productTitle);

    await productPage.addToCart();

    await miniCartModal.waitForItem();
    basketCount = await miniCartModal.getBasketCount();
    expect.soft(basketCount).toEqual(expectedBasketCount);
    const projectName = testInfo.project.name;
    const newPage = await miniCartModal.clickCheckout(projectName);

    const cartPage = new CartPage(newPage, localizationFixture.selectors.cartPage);
    await cartPage.waitForLoadingModule();
    headerComponent = new HeaderComponent(newPage, localizationFixture.selectors.headerComponent);
    miniCartModal = new MiniCartModal(newPage, context, localizationFixture.selectors.miniCartModal);

    const productName = await cartPage.getProductName();
    expect.soft(productName).toEqual(expectedProductName);
    await cartPage.removeItem();
    const itemsInformation = await cartPage.getEmptyCartInformation();
    expect.soft(itemsInformation).toEqual(expectedItemsInformation);

    await headerComponent.clickMiniCart();

    basketCount = await miniCartModal.getBasketCount();
    expect.soft(basketCount).toEqual(expectedDeletedBasketCount);
  });

  test('Verify links and images on product page', async ({ page, baseURL, localizationFixture }) => {
    const alertModal = new AlertModal(page, localizationFixture.selectors.alertModal);
    const headerComponent = new HeaderComponent(page, localizationFixture.selectors.headerComponent);
    const shopPage = new ShopPage(page);
    const productPage = new ProductPage(page, localizationFixture.selectors.productPage);

    await alertModal.acceptCookiesAndAge();

    await headerComponent.gotoShop();

    await shopPage.clickProductByTitle(localizationFixture.testData.productTitle);
    
    await productPage.verifyLinks(baseURL);
    await productPage.verifyImages();
    // await productPage.alternativeVerifyImages();
  });
});
