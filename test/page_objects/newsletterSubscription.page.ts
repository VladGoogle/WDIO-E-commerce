class NewsletterSubscriptionPage {

    get pageTitle() {
        return $('span=Newsletter Subscription')
    }

    get subscriptionCheckbox() {
        return $('#subscription')
    }

    get saveBtn() {
        return $('button.save')
    }
}

export default new NewsletterSubscriptionPage()