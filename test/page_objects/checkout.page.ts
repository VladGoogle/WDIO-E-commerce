class CheckoutPage {

    get shippingItems() {
        return $$('div.shipping-address-item')
    }

    get selectShippingAddressBtn() {
        return $$('button.action-select-shipping-item')
    }

    get newAddressBtn() {
        return $('button.action-show-popup')
    }

    get firstnameInput() {
        return $('input[name="firstname"]')
    }

    get lastnameInput() {
        return $('input[name="lastname"]')
    }

    get companyInput() {
        return $('input[name="company"]')
    }

    get firstAddressInput() {
        return $('input[name="street[0]"]')
    }

    get secondAddressInput() {
        return $('input[name="street[1]"]')
    }

    get thirdAddressInput() {
        return $('input[name="street[2]"]')
    }

    get cityInput() {
        return $('input[name="city"]')
    }

    get regionDropdown() {
        return $('select[name="region_id"]')
    }

    get regionInput() {
        return $('input[name="region"]')
    }

    get zipInput() {
        return $('input[name="postcode"]')
    }

    get countryDropdown() {
        return $('select[name="country_id"]')
    }

    get phoneInput() {
        return $('input[name="telephone"]')
    }

    get tooltipSpan() {
        return $('#tooltip')
    }

    get tooltipContent() {
        return $('aria/For delivery questions')
    }

    get saveShippingAddressCheckbox() {
        return $('#shipping-save-in-address-book')
    }

    get nextBtn() {
        return $('button.continue')
    }

    get continueShoppingBtn() {
        return $('a.continue')
    }

    get orderNumberLink() {
        return $('.order-number')
    }

    get printBtn() {
        return $('a.print')
    }

    get saveAddressBtn() {
        return $('button.action-save-address')
    }

    get cancelBtn() {
        return $('button.action-hide-popup')
    }

    get itemsInCartToggle() {
        return $('div.items-in-cart')
    }

    get cartItems() {
        return $$('.product-item')
    }

    get itemOptions() {
        return $$('div.options')
    }

    get shippingProgressCompleteLink() {
        return $('li._complete')
    }

    get progressBar() {
        return $('.opc-progress-bar')
    }

    get billingAddressDetails() {
        return $('.billing-address-details')
    }

    get editAddressBtn() {
        return $('button.action-edit-address')
    }

    get placeOrderBtn() {
        return $('button[title="Place Order"]')
    }

    get shipToDetails() {
        return $('.ship-to')
    }

    get shipToEditBtn() {
        return this.shipToDetails.$('button.action-edit')
    }

    get shipViaDetails() {
        return $('.ship-via')
    }

    get shipViaEditBtn() {
        return this.shipViaDetails.$('button.action-edit')
    }

    get billingAddressDropdown() {
        return $('select[name="billing_address_id"]')
    }

    get billingCancelBtn() {
        return $('button.action-cancel')
    }

    get billingUpdateBtn() {
        return $('button.action-update')
    }

    get sameAddressesCheckbox() {
        return $('input[name="billing-address-same-as-shipping"]')
    }

}

export default new CheckoutPage()