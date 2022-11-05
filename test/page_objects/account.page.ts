class AccountPage {

    get accountEditLink() {
        return $('//*[@id="maincontent"]/div[2]/div[1]/div[3]/div[2]/div[1]/div[2]/a[1]')
    }

    get changePasswordLink() {
        return $('a[href*="changepass"]')
    }

    get newsletterEditLink() {
        return $('a[href*="newsletter"]')
    }

    get manageAddressesLink() {
        return $('aria/Manage Addresses')
    }

    get editBillingAddressLink() {
        return $('a[data-ui-id="default-billing-edit-link"]')
    }

    get editShippingAddressLink() {
        return $('a[data-ui-id="default-shipping-edit-link"]')
    }

    get viewReviewsLink() {
        return $('a[href$="/review/customer/"]')
    }

}

export default new AccountPage()