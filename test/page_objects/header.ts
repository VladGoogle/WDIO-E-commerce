
export class Header {

    get headerContent() {
        return $('.header')
    }

    get headerLogo() {
        return $('.logo')
    }

    get searchInput() {
        return $('#search')
    }

    get searchBtn() {
        return $('button.search')
    }

    get cartBtn() {
        return $('a.showcart')
    }

    get loginLink() {
        return $('.authorization-link')
    }

    get registerLink() {
        return $('a=Create an Account')
    }

    get navBar() {
        return $('#ui-id-2')
    }

    get compareProductsLink() {
        return $('aria/Compare Products')
    }

    get cartItemsList() {
        return $('#mini-cart')
    }

    get cartItems() {
        return $$('li[data-role="product-item"]')
    }

    get cartItemsCounter() {
        return $('span.count')
    }

    get cartProductOptions() {
        return $('div.options')
    }

    get cartProductQtyInput() {
        return $('input.cart-item-qty')
    }

    get checkoutBtn() {
        return $('#top-cart-btn-checkout')
    }

    get viewCartLink() {
        return $('a.viewcart')
    }

    get editItemBtn() {
        return $('a[title="Edit item"]')
    }

    get deleteItemBtn() {
        return $('a[title="Remove item"]')
    }

    get notLoggedInWelcomeMsg() {
        return $$('.not-logged-in')[0]
    }

    get loggedInWelcomeMsg() {
        return $$('.logged-in')[0]
    }

    get headerSwitchArrow() {
        return $$('button.switch')[0]
    }

    get headerLinks() {
        return $$('ul.header')[0]
    }

    get headerAccountLink() {
        return this.headerLinks.$$('aria/My Account')[0]
    }

    get headerWishlistLink() {
        return this.headerLinks.$$('li.wishlist')[0].$('a')
    }

    get headerSignOutLink() {
        return this.headerLinks.$$('.authorization-link')[0].$('a')
    }


}

// export default new Header()