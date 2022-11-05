
class ProductDetailsPage {

    get productTitle() {
        return $('[itemprop="name"]')
    }

    get ratingResult() {
        return $('.rating-result')
    }

    get viewReviewsLink() {
        return $('a.view')
    }

    get addReviewLink() {
        return $('a.add')
    }

    get quantityInput() {
        return $('#qty')
    }

    get addToCartBtn() {
        return $('button.tocart')
    }

    get updateCartBtn() {
        return $('#product-updatecart-button')
    }

    get addToWishlistLink() {
        return $('a.towishlist')
    }

    get updateWishlistLink() {
        return $('a.updated')
    }

    get addToCompareLink() {
        return $('a.tocompare')
    }

    get descriptionTab() {
        return $('#tab-label-description')
    }

    get moreInfoTab() {
        return $('#tab-label-additional')
    }

    get reviewsTab() {
        return $('#tab-label-reviews')
    }

    get stockAvailabilityBlock() {
        return $('div.available')
    }

    get stockAttributeBlock() {
        return $('div.sku')
    }

    get priceInfo() {
        return $('.price')
    }

    get userReviews() {
        return $('ol.review-items')
    }

    get reviewLegend() {
        return $('.legend.review-legend')
    }

    get starsRating() {
        return $$('.radio')
    }

    get oneStarRating() {
        return $('#Rating_1_label')
    }

    get twoStarRating() {
        return $('#Rating_2_label')
    }

    get threeStarRating() {
        return $('#Rating_3_label')
    }

    get fourStarRating() {
        return $('#Rating_4_label')
    }

    get fiveStarRating() {
        return $('#Rating_5_label')
    }

    get nicknameInput() {
        return $('#nickname_field')
    }

    get summaryInput() {
        return $('#summary_field')
    }

    get reviewInput() {
        return $('#review_field')
    }

    get submitReviewBtn() {
        return $('#reviews').$('button.submit')
    }

    get blackColorOption() {
        return $('aria/Black')
    }

    get blueColorOption() {
        return $('aria/Blue')
    }

    get brownColorOption() {
        return $('aria/Brown')
    }

    get grayColorOption() {
        return $('aria/Gray')
    }

    get greenColorOption() {
        return $('aria/Green')
    }

    get orangeColorOption() {
        return $('aria/Orange')
    }

    get purpleColorOption() {
        return $('aria/Purple')
    }

    get redColorOption() {
        return $('aria/Red')
    }

    get whiteColorOption() {
        return $('[option-label="White"]')
    }

    get yellowColorOption() {
        return $('aria/Yellow')
    }

    get sizeOptions() {
        return $$('/html/body/div[2]/main/div[2]/div/div[1]/div[4]/form/div[1]/div/div/div[1]/div/div')
    }

    get colorOptions() {
        return $$('.swatch-option.color')
    }

    get xsSizeOption() {
        return $('aria/XS')
    }

    get sSizeOption() {
        return $('aria/S')
    }

    get mSizeOption() {
        return $('aria/M')
    }

    get lSizeOption() {
        return $('aria/L')
    }

    get xlSizeOption() {
        return $('aria/XL')
    }

    get relatedProductsHeading() {
        return $('#block-related-heading')
    }

    get ratingInputError() {
        return $(`aria/Please select one of each of the ratings above.`)
    }

    get nicknameFieldError() {
        return $('#nickname_field-error')
    }

    get summaryFieldError() {
        return $('#summary_field-error')
    }

    get reviewFieldError() {
        return $('#review_field-error')
    }

    get successMsg() {
        return $('div.message-success')
    }
}

export default new ProductDetailsPage()