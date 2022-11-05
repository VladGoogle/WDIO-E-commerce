class MyProductReviewsPage {

    get createdDateInfo() {
        return $$('td[data-th="Created"]')
    }

    get productNameInfo() {
        return $$('td[data-th="Product Name"]')
    }

    get productRatingInfo() {
        return $$('.rating-result')
    }

    get productReviewInfo() {
        return $$('td[data-th="Review"]')
    }

    get moreLink() {
        return $$('a.more')
    }

    get itemsLimiter() {
        return $('#limiter')
    }

    get reviewsCounter() {
        return $('.toolbar-number')
    }

}

export default new MyProductReviewsPage()