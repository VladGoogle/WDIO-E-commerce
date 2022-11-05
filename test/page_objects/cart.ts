
class Cart {

    get cartBtn() {
        return $('a.showcart')
    }

    get cartItemsList() {
        return $('#mini-cart')
    }

    get cartItems() {
        return $$('li[data-role="product-item"]')
    }

    get updateCartItemBtn() {
        return $$('.update-cart-item')
    }

    get cartItemsCounter() {
        return $('span.count')
    }

    get totalSum() {
        return $('div.subtotal').$('span.price')
    }

    get itemPrice() {
        return this.cartItemsList.$$('span.price')
    }

    get cartProductOptions() {
        return $('div.options')
    }

    get cartProductQtyInput() {
        return $$('input.cart-item-qty')
    }

    get toggleDropdown() {
        return $$('span.toggle')
    }

    get checkoutBtn() {
        return $('#top-cart-btn-checkout')
    }

    get viewCartLink() {
        return $('a.viewcart')
    }

    get editItemBtn() {
        return $$('a[title="Edit item"]')
    }

    get deleteItemBtn() {
        return $$('a[title="Remove item"]')
    }

    get closeBtn() {
        return $('#btn-minicart-close')
    }

    get cancelBtn() {
        return $('button.action-dismiss')
    }

    get okBtn() {
        return $('button.action-accept')
    }



}

 export default new Cart()