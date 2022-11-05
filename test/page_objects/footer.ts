
class Footer {


    get footerBlock() {
        return $('div.footer')
    }

    get newsletterBlock() {
        return $('div.newsletter')
    }

    get aboutUsLink() {
        return $('a=About us')
    }

    get customerServiceLink() {
        return $('a=Customer Service')
    }

    get contactUsLink() {
        return $('a=Contact Us')
    }

    get writeUsLink() {
        return $('a=Write for Us')
    }

    get searchTermsLink() {
        return $('a=Search Terms')
    }

    get privacyPolicyLink() {
        return $('a=Privacy and Cookie Policy')
    }

    get advancedSearchLink() {
        return $('/html/body/div[2]/footer/div/ul/li[3]/a')
    }

    get ordersAndReturnsLink() {
        return $('a=Orders and Returns')
    }

    get newsletterInput() {
        return $('#newsletter')
    }

    get subscribeBtn() {
        return $('aria/Subscribe')
    }

    get newsletterError() {
        return $('#newsletter-error')
    }

    get successMsg() {
        return $('div.message-success')
    }

}

export default new Footer()