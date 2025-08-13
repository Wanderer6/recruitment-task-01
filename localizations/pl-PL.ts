const plPL = {
  baseURL: 'https://www.ploom.pl/pl',
  testData: {
    expectedProductName: 'Ploom X Advanced Silver',
    expectedBasketCount: '1 produkt',
    expectedDeletedBasketCount: 'Ilość produktów: 0',
    expectedItemsInformation: 'W tym momencie Twój koszyk jest pusty.',
    productTitle: 'Ploom X Advanced Silver',
  },
  selectors: {
    alertModal: {
      acceptCookiesBtn: 'Akceptuj wszystkie pliki cookie',
      ageConfirmationBtn: 'Potwierdź',
    },
    headerComponent: {
      navigationLinkContainer: '[class^="Navigation_listItem"]',
      navigationItemContainer: '.navigation__item--active',
      shopText: 'Sklep',
      closeMenuBtn: 'CloseShopMenu',
      miniCartBtn: 'cartIcon',
    },
    productPage: {
      productContainer: '.root.responsivegrid',
      addToCartBtn: 'pdpAddToProduct',
      linkText: 'Kup teraz',
      links: '[data-testid="all_skus"] a',
      images: 'img',
    },
    miniCartModal: {
      item: 'item',
      basketCount: '.CartMiniHeader-module-count-i2EyF',
      checkoutBtn: 'miniCartCheckoutButton',
    },
    cartPage: {
      container: '#aem-checkout',
      loadingModule: '.Loading-module-active-VxV5D',
      productName: 'main-section',
      removeItemBtn: 'cartRemoveButton',
      confirmRemove: 'remove-item-submit-button',
      emptyCartText: 'emptyCartContainer',
    },
  },
};

export default plPL;
