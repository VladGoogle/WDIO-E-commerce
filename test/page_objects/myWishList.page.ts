class MyWishlistPage {

    get pageTitle() {
        return $('span=My Wish List')
    }

    get shareWishListBtn() {
        return $('aria/Share Wish List')
    }

    get updateWishListBtn() {
        return $('aria/Update Wish List')
    }

    get addAllToCartBtn() {
        return $('aria/Add All to Cart')
    }

    get productItems() {
        return $$('/html/body/div[2]/main/div[2]/div[1]/form/div[1]/ol/li')
    }

    get productName() {
        return $$('.product-item-name')
    }

    get itemCommentInput() {
        return $$('.product-item-comment')
    }

    get qtyInput() {
        return $$('input[data-role="qty"]')
    }

    get addToCartBtn() {
        return $$('button.tocart')
    }

    get emailAddressesInput() {
        return $('#email_address')
    }

    get messageInput() {
        return $('#message')
    }

    get limiterSelector() {
        return $('#limiter')
    }

    get itemCounter() {
        return $$('.toolbar-number')[1]
    }

    get itemActions() {
        return $('div.product-item-actions')
    }

    get removeItemBtn() {
        return $$('a[title="Remove Item"]')
    }

    get itemTooltip() {
        return $$('div.product-item-tooltip')
    }

    get emailInputError() {
        return $('#email_address-error')
    }


}

export default new MyWishlistPage()