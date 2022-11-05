import {Header} from "../../page_objects/header";
import {Navbar} from "../../page_objects/navbar";
import AccountSidebarPage from "../../page_objects/accountSidebar.page";
import MyWishListPage from "../../page_objects/myWishList.page";
import ProductsPage from "../../page_objects/products.page";
import myWishListPage from "../../page_objects/myWishList.page";
import ProductDetailsPage from "../../page_objects/productDetails.page";
import productDetailsPage from "../../page_objects/productDetails.page";
import { faker } from '@faker-js/faker';
import {randomText} from "../../../src/constants/register.constants";



describe('My Wishlist page',  () => {
    let testName;
    let fullTestName
    const header = new Header()
    const navbar = new Navbar(header)


    before(async ()=>{
        await browser.url('/')
        await header.registerLink.click()
        await browser.waitPageForLoad()
        await browser.register()
        await browser.waitPageForLoad()
    })

    beforeEach(async function () {
        testName = this.currentTest.title
        fullTestName = this.test.fullTitle()
        await browser.maximizeWindow()
    })


    it('should open My Wishlist tab', async ()=> {
        await AccountSidebarPage.myWishListTab.click()
        await browser.waitPageForLoad()
        await MyWishListPage.pageTitle.isDisplayed()
        await browser.checkTabbablePage(`Account--${testName}`, {})
    });

    it('should add items to My Wishlist tab', async ()=> {
        await $('aria/You have no items in your wish list').isDisplayed()
        await browser.checkTabbablePage(`Account--${testName}`, {})
        await header.headerLogo.scrollIntoView({block: "center"})
        await navbar.womanTab.moveTo()
        await navbar.womanTopsCategory.click()
        await browser.waitPageForLoad()

        await ProductsPage.productNames[0].scrollIntoView({block: "center"})
        await ProductsPage.productNames[0].moveTo()
        await ProductsPage.addToWishlistButton[0].click()
        await browser.waitPageForLoad()

        expect (await $('aria/You have no items in your wish list')).not.toBeDisplayed()
        await $('aria/has been added to your Wish List. Click here to continue shopping').isDisplayed()
        expect(await MyWishListPage.productItems.length).toEqual(1)
        await browser.checkTabbablePage(`Account--${testName}`, {})
    });

    it('should return back to the products page by clicking on Here link', async ()=> {
        await $('a=here').click()
        await browser.waitPageForLoad()
        await browser.waitViewProductsItemsForDisplayedAndClickable()
    });

    it('should increase product qty at 1 on secondary adding to wishlist', async ()=> {
        await ProductsPage.productNames[0].scrollIntoView({block: "center"})
        await ProductsPage.productNames[0].moveTo()
        await ProductsPage.addToWishlistButton[0].click()
        await browser.waitPageForLoad()
        await $('aria/has been added to your Wish List. Click here to continue shopping').isDisplayed()
        expect(await MyWishListPage.productItems.length).toEqual(1)
        await MyWishListPage.productItems[0].scrollIntoView({block: "center"})
        await MyWishListPage.productItems[0].moveTo()
        await expect(MyWishListPage.qtyInput[0]).toHaveAttr('value', '2')
    });

    it('should redirect to the product details page by clicking on items edit button', async ()=> {
        await MyWishListPage.productItems[0].scrollIntoView({block: "center"})
        await MyWishListPage.productItems[0].moveTo()
        await MyWishListPage.removeItemBtn[0].click({x: -33})
        await browser.waitPageForLoad()
        await browser.waitProductDetailsItemsForDisplayedAndClickable()
    });

    it('should update item info by clicking on Update wishlist button', async ()=> {
        await ProductDetailsPage.xlSizeOption.click()
        await ProductDetailsPage.yellowColorOption.click()
        await ProductDetailsPage.quantityInput.setValue(9)
        await ProductDetailsPage.updateWishlistLink.click()
        await browser.waitPageForLoad()
        await $('aria/has been updated in your Wish List').isDisplayed()
        await MyWishListPage.productItems[0].scrollIntoView({block: "center"})
        await MyWishListPage.productItems[0].moveTo()
        await expect(MyWishListPage.qtyInput[0]).toHaveAttr('value', '9')
        await MyWishListPage.itemTooltip[0].moveTo()
        await $('aria/XL').isDisplayed()
        await $('aria/Yellow').isDisplayed()
    });

    it('should not save the item changes after refreshing the page ', async ()=> {
        await MyWishListPage.productName[0].moveTo()
        await MyWishListPage.itemCommentInput[0].setValue(randomText)
        await MyWishListPage.qtyInput[0].setValue(25)
        await browser.refresh()
        await MyWishListPage.productName[0].moveTo()
        await expect(MyWishListPage.itemCommentInput[0]).not.toHaveValue(randomText)
        await expect(MyWishListPage.qtyInput[0]).not.toHaveAttr('value', '25')
    });

    it('should save the item changes after clicking on Update wishlist button', async ()=> {
        await MyWishListPage.itemCommentInput[0].setValue(randomText)
        await MyWishListPage.qtyInput[0].setValue(25)
        await MyWishListPage.addAllToCartBtn.moveTo()
        await MyWishListPage.updateWishListBtn.click()
        await browser.waitPageForLoad()
        await $('aria/has been updated in your Wish List').isDisplayed()
        await MyWishListPage.productItems[0].scrollIntoView({block: "center"})
        await MyWishListPage.productItems[0].moveTo()
        await expect(MyWishListPage.itemCommentInput[0]).toHaveValue(randomText)
        await expect(MyWishListPage.qtyInput[0]).toHaveAttr('value', '25')
    });

    it('should open Wish List Sharing', async ()=> {
        await MyWishListPage.addAllToCartBtn.moveTo()
        await MyWishListPage.shareWishListBtn.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await MyWishListPage.emailAddressesInput)
        await browser.waitForDisplayedAndClickable(await MyWishListPage.messageInput)
        await browser.waitForDisplayedAndClickable(await MyWishListPage.shareWishListBtn)
    });

    it('should show required error with empty email field', async ()=> {
        await MyWishListPage.shareWishListBtn.click()
        await MyWishListPage.emailInputError.isDisplayed()
        await expect(MyWishListPage.emailInputError).toHaveText('This is a required field.')
        await browser.checkScreen(`Account--${testName}`, {})
    });

    it('should show invalid email error with invalid emails', async ()=> {
        await MyWishListPage.emailAddressesInput.setValue(`${faker.name.firstName()},${faker.name.firstName()},${faker.name.firstName()}`)
        await MyWishListPage.shareWishListBtn.click()
        await MyWishListPage.emailInputError.isDisplayed()
        await expect(MyWishListPage.emailInputError).toHaveText('Please enter valid email addresses, separated by commas. For example, johndoe@domain.com, johnsmith@domain.com.')
        await browser.checkScreen(`Account--${testName}`, {})
    });

    it('should show max validation error with more than 255 characters in Message field', async ()=> {
        await MyWishListPage.emailAddressesInput.setValue(`${faker.internet.email()},${faker.internet.email()},${faker.internet.email()}`)
        await MyWishListPage.messageInput.setValue(`${faker.datatype.string(256)}`)
        await MyWishListPage.shareWishListBtn.click()
        await browser.waitPageForLoad()
        await $('aria/Message length must not exceed 255 symbols').isDisplayed()
        await browser.checkScreen(`Account--${testName}`, {})
    });

    it('should share wishlist ', async ()=> {
        await MyWishListPage.emailAddressesInput.setValue(`${faker.internet.email()},${faker.internet.email()},${faker.internet.email()}`)
        await MyWishListPage.messageInput.setValue(`${faker.lorem.sentence()}`)
        await MyWishListPage.shareWishListBtn.click()
        await browser.waitPageForLoad()
        await $('aria/Your wish list has been shared').isDisplayed()
        await browser.checkScreen(`Account--${testName}`, {})
    });

    it('should remove item by clicking on item delete button', async ()=> {
        await MyWishListPage.productItems[0].moveTo()
        await MyWishListPage.removeItemBtn[0].click()
        await browser.waitPageForLoad()
        expect(await MyWishListPage.productItems.length).toEqual(0)
        await $('aria/You have no items in your wish list').isDisplayed()
        await browser.checkScreen(`Account--${testName}`, {})
    });

    it('should add all items to cart by clicking on Add All to Cart button', async ()=> {
        await header.headerLogo.scrollIntoView({block: "center"})
        await navbar.womanTab.moveTo()
        await navbar.womanTopsCategory.click()
        await browser.waitPageForLoad()
        await ProductsPage.productItems[0].click()
        await browser.waitPageForLoad()
        await ProductDetailsPage.mSizeOption.click()
        await ProductDetailsPage.purpleColorOption.click()
        await ProductDetailsPage.addToWishlistLink.click()
        await browser.waitPageForLoad()

        await header.headerLogo.scrollIntoView({block: "center"})
        await navbar.womanTab.moveTo()
        await navbar.womanTopsCategory.click()
        await browser.waitPageForLoad()
        await ProductsPage.productItems[1].click()
        await browser.waitPageForLoad()
        await ProductDetailsPage.xsSizeOption.click()
        await ProductDetailsPage.blackColorOption.click()
        await ProductDetailsPage.addToWishlistLink.click()
        await browser.waitPageForLoad()

        await header.headerLogo.scrollIntoView({block: "center"})
        await navbar.womanTab.moveTo()
        await navbar.womanTopsCategory.click()
        await browser.waitPageForLoad()
        await ProductsPage.productItems[2].click()
        await browser.waitPageForLoad()
        await ProductDetailsPage.xlSizeOption.click()
        await ProductDetailsPage.whiteColorOption.click()
        await ProductDetailsPage.addToWishlistLink.click()
        await browser.waitPageForLoad()

        await MyWishListPage.addAllToCartBtn.click()
        await browser.waitPageForLoad()
        await $('aria/3 product(s) have been added to shopping cart').isDisplayed()
        expect(await MyWishListPage.productItems.length).toEqual(0)
        await header.cartBtn.click()
        await browser.waitUntil(async() =>(await header.cartItems[0].isDisplayed()),
            {
                timeout: 5000,
                timeoutMsg: 'expected items to be visible after 5s'
            }
        )
        expect(await header.cartItems.length).toEqual(3)
        await expect(header.cartItemsCounter).toHaveText(`3`)
        await browser.checkScreen(`Account--${testName}`, {})
    });


})