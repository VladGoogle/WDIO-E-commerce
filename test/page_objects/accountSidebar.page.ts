class AccountSidebar {

    get myAccountTab() {
        return $('ul.items').$('aria/My Account')
    }

    get myOrdersTab() {
        return $('ul.items').$('aria/My Orders')
    }

    get myDownloadableProductsTab() {
        return $('ul.items').$('aria/My Downloadable Products')
    }

    get myWishListTab() {
        return $('ul.items').$('aria/My Wish List')
    }

    get addressBookTab() {
        return $('ul.items').$('aria/Address Book')
    }

    get accountInfoTab() {
        return $('ul.items').$('aria/Account Information')
    }

    get paymentMethodsTab() {
        return $('ul.items').$('aria/Stored Payment Methods')
    }

    get myProductReviewsTab() {
        return $('ul.items').$('aria/My Product Reviews')
    }

    get newsletterSubscriptionsTab() {
        return $('ul.items').$('aria/Newsletter Subscriptions')
    }

    get wishlistSidebar() {
        return $('#wishlist-sidebar')
    }
}

export default new AccountSidebar()