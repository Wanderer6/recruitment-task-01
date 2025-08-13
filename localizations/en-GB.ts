const enGB = {
  baseURL: 'https://www.ploom.co.uk/en',
  testData: {
    expectedProductName: 'Ploom X Advanced Silver',
    expectedBasketCount: '1 Item',
    expectedDeletedBasketCount: '0 Items',
    expectedItemsInformation: 'You have no items in your shopping cart at the moment.',
    productTitle: 'Ploom X Advanced',
  },
  selectors: {
    alertModal: {
      acceptCookiesBtn: 'GOT IT',
      ageConfirmationBtn: 'Yes, discover more',
    },
    headerComponent: {
      navigationLinkContainer: '.navigation__linkWrapper',
      navigationItemContainer: '.navigation__item--active',
      shopText: 'Shop',
      closeMenuBtn: 'CloseShopMenu',
      miniCartBtn: 'cartIcon',
    },
    productPage: {
      productContainer: '.root.responsivegrid',
      addToCartBtn: 'pdpAddToProduct',
      linkText: 'Buy Now',
      links: '[data-testid="all_skus"] a',
      images: 'img',
    },
    miniCartModal: {
      item: 'item',
      basketCount: '.CartMiniHeader-module-count-i2EyF',
      checkoutBtn: 'miniCartCheckoutButton',
    },
    cartPage: {
      container: '#one-page-checkout',
      loadingModule: '.Loading-module-active-VxV5D',
      productName: 'main-section',
      removeItemBtn: 'cartRemoveButton',
      confirmRemove: 'remove-item-submit-button',
      emptyCartText: 'emptyCartContainer',
    },
  },
};

export default enGB;
