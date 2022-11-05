import {Header} from "../../page_objects/header";
import {Navbar} from "../../page_objects/navbar";
import ProductsPage from "../../page_objects/products.page";
import ProductDetailsPage from "../../page_objects/productDetails.page";
import productDetailsPage from "../../page_objects/productDetails.page";
import {randomName} from "../../../src/constants/register.constants";
import { faker } from '@faker-js/faker';

describe('Product details', async () => {
    let testName;
    let fullTestName
    const header = new Header()
    const navbar = new Navbar(header)


    before(async ()=>{
        await browser.url('/')
        await header.registerLink.click()
        await browser.waitPageForLoad()
        await browser.register()
        await header.headerLogo.click()
        await browser.waitPageForLoad()
    })

    beforeEach(async function () {
        testName = this.currentTest.title
        fullTestName = this.test.fullTitle()
        await browser.maximizeWindow()
    })


    it('should show product details elements', async ()=> {
        await browser.url('/')
        await navbar.womanTab.moveTo()
        await navbar.womanTopsCategory.click()
        await browser.waitPageForLoad()
        await ProductsPage.productItems[0].click()
        await browser.waitPageForLoad()
        await browser.waitProductDetailsItemsForDisplayedAndClickable()
        await browser.checkFullPageScreen(`ProductDetails--${testName}`, {})
    });

    it('should change each size option', async ()=>{
        const arr = await ProductDetailsPage.sizeOptions
        await productDetailsPage.priceInfo.scrollIntoView({block: "center"})
        await arr[0].click()
        for(let i=0; i<= arr.length; i++) {
            await expect(arr[i]).toHaveAttr('aria-checked', 'true')
            if(arr[i+1] === undefined) {
                break
            } else {
                await arr[i+1].click()
            }
        }
    })

    it('should change each color option', async ()=>{
        const arr = await ProductDetailsPage.colorOptions
        await arr[0].click()
        for(let i=0; i<= arr.length; i++) {
            await expect(arr[i]).toHaveAttr('aria-checked', 'true')
            if(arr[i+1] === undefined) {
                break
            } else {
                await arr[i+1].click()
            }
        }
    })

    it('should open More Info tab ', async ()=>{
        await ProductDetailsPage.moreInfoTab.click()
        await expect(ProductDetailsPage.moreInfoTab).toHaveAttr('aria-selected', 'true')
        await browser.checkElement(await $('#additional'), `ProductDetails--${testName}`, {})
    })

    it('should open Details tab', async ()=> {
        await ProductDetailsPage.descriptionTab.click()
        await expect(ProductDetailsPage.descriptionTab).toHaveAttr('aria-selected', 'true')
        await browser.checkElement(await $('#description'), `ProductDetails--${testName}`, {})
    });

    it('should open Reviews tab bu clicking on the tab', async ()=> {
        await ProductDetailsPage.reviewsTab.click()
        await expect(ProductDetailsPage.reviewsTab).toHaveAttr('aria-selected', 'true')
        await browser.waitReviewsModalForDisplayedAndClickable()
    });

    it('should open Reviews tab by clicking on Add review button', async ()=> {
        await ProductDetailsPage.descriptionTab.click()
        await ProductDetailsPage.addReviewLink.click()
        await expect(ProductDetailsPage.reviewsTab).toHaveAttr('aria-selected', 'true')
        await browser.waitReviewsModalForDisplayedAndClickable()
    });

    it('should open Reviews tab by clicking on View reviews link', async ()=> {
        await ProductDetailsPage.descriptionTab.click()
        await ProductDetailsPage.viewReviewsLink.click()
        await expect(ProductDetailsPage.reviewsTab).toHaveAttr('aria-selected', 'true')
        await browser.waitReviewsModalForDisplayedAndClickable()
    });

    it('should show required errors with empty review inputs', async ()=> {
        await ProductDetailsPage.nicknameInput.clearValue()
        await ProductDetailsPage.submitReviewBtn.click()
        await expect(ProductDetailsPage.ratingInputError).toBeDisplayed()
        await browser.waitRequiredErrorForDisplayed(await ProductDetailsPage.nicknameFieldError)
        await browser.waitRequiredErrorForDisplayed(await ProductDetailsPage.summaryFieldError)
        await browser.waitRequiredErrorForDisplayed(await ProductDetailsPage.reviewFieldError)
        await browser.checkElement(await $('#reviews'), `ProductDetails--${testName}`, {})
    });

    it('should leave review comment', async ()=> {
        await ProductDetailsPage.oneStarRating.click()
        await ProductDetailsPage.nicknameInput.setValue(randomName)
        await ProductDetailsPage.summaryInput.setValue(faker.lorem.text())
        await ProductDetailsPage.reviewInput.setValue(faker.lorem.text())
        await ProductDetailsPage.submitReviewBtn.click()
        await browser.waitPageForLoad()
        await expect(ProductDetailsPage.successMsg).toBeDisplayed()
        await ProductDetailsPage.successMsg.scrollIntoView({block: 'center'})
        await browser.checkScreen(`ProductDetails--${testName}`, {})
    });

    it('should add product to compare table by clicking Add to compare button', async ()=> {
        await ProductDetailsPage.addToCompareLink.click()
        await browser.waitPageForLoad()
        await expect(ProductDetailsPage.successMsg).toBeDisplayed()
        await browser.waitForDisplayedAndClickable(await header.compareProductsLink)
        await ProductDetailsPage.successMsg.scrollIntoView({block: 'center'})
        await browser.waitForDisplayedAndClickable(await $('aria/comparison list'))
        await $('aria/comparison list').click()
        await browser.waitPageForLoad()
        await expect($('aria/Compare Products')).toBeDisplayed()
        await expect($('td[data-th="Product"]')).toBeDisplayed()
        await browser.checkFullPageScreen(`ProductDetails--${testName}`, {})
    });

    it('should add product to wishlist', async ()=> {
        await browser.back()
        await browser.waitPageForLoad()
        await ProductDetailsPage.addToWishlistLink.click()
        await browser.waitPageForLoad()
        await expect($('span=My Wish List')).toBeDisplayed()
        await browser.checkFullPageScreen(`ProductDetails--${testName}`, {})
    });

    it('should add product to cart', async ()=> {
        await header.headerLogo.click()
        await navbar.womanTab.moveTo()
        await navbar.womanTopsCategory.click()
        await browser.waitPageForLoad()
        await ProductsPage.productItems[0].click()
        await browser.waitPageForLoad()
        await ProductDetailsPage.xsSizeOption.click()
        await ProductDetailsPage.whiteColorOption.click()
        await ProductDetailsPage.quantityInput.setValue(5)
        await ProductDetailsPage.addToCartBtn.click()
        await ProductDetailsPage.successMsg.waitForDisplayed()
        await ProductDetailsPage.successMsg.scrollIntoView({block: 'center'})
        await browser.waitForDisplayedAndClickable(await $('aria/shopping cart'))
        await header.cartBtn.click()
        await expect(await header.cartItems.length).toEqual(1)
        await expect(header.cartProductQtyInput).toHaveValue('5')
        await browser.checkScreen(`ProductDetails--${testName}`, {})
    });



})