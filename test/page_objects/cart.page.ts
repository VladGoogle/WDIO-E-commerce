class CartPage {

    get cartItems() {
        return $$('tbody.item')
    }

    get qtyInput() {
        return $$('input.qty')
    }

    get itemEditBtn() {
        return $$('a.action-edit')
    }

    get itemDeleteBtn() {
        return $$('a.action-delete')
    }

    get estimateShippingToggle() {
        return $('//*[@id="block-shipping"]/div[1]')
    }

    get countryDropdown() {
        return $('select[name="country_id"]')
    }

    get regionInput() {
        return $('input[name="region"]')
    }

    get regionDropdown() {
        return $('select[name="region_id"]')
    }

    get zipInput() {
        return $('input[name="postcode"]')
    }

    get totalItemPrice() {
        return $$('//*[@id="shopping-cart-table"]/tbody/tr[1]/td[4]/span/span/span')
    }

    get discountToggle() {
        return $('#block-discount').$('div.title')
    }

    get discountCodeInput() {
        return $('#coupon_code')
    }

    get applyDiscountBtn() {
        return $('button[value="Apply Discount"]')
    }

    get bestWayRadio() {
        return $('#s_method_tablerate_bestway')
    }

    get flatRateRadio() {
        return $('#s_method_flatrate_flatrate')
    }

    get orderTotalPrice() {
        return $('//*[@id="cart-totals"]/div/table/tbody/tr[3]/td/strong/span')
    }

    get multiAddressCheckout() {
        return $('a.multicheckout')
    }

    get checkoutBtn() {
        return $$('button.checkout')[1]
    }

    get updateCartBtn() {
        return $$('button[name="update_cart_action"]')[1]
    }

    get moveToWishlistLink() {
        return $$('a.action-towishlist')
    }

    get itemPrice() {
        return $$('//*[@id="shopping-cart-table"]/tbody/tr[1]/td[2]/span/span/span')
    }

    get successMsg() {
        return $('div.message-success')
    }
}

export default new CartPage()





