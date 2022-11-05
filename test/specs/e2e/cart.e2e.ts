import {Header} from "../../page_objects/header";
import {Navbar} from "../../page_objects/navbar";
import ProductsPage from "../../page_objects/products.page";
import ProductDetailsPage from "../../page_objects/productDetails.page";
import Cart from "../../page_objects/cart";
import CartPage from "../../page_objects/cart.page";
import MyWishListPage from "../../page_objects/myWishList.page";
import CheckoutPage from "../../page_objects/checkout.page";

describe('Cart', async function () {
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


    it('should show message with no items in cart', async function() {
        await Cart.cartBtn.click()
        await $('aria/You have no items in your shopping cart').isDisplayed()
        await browser.checkScreen(`Cart--${testName}`, {})
    });

    it('should close cart by clicking on cross button', async function () {
        await Cart.closeBtn.click()
        expect(await Cart.closeBtn).not.toBeDisplayed()
    });

    it('should add new product to the cart', async function () {
        await header.headerLogo.scrollIntoView({block: "center"})
        await navbar.womanTab.moveTo()
        await navbar.womanTopsCategory.click()
        await browser.waitPageForLoad()
        await ProductsPage.productItems[0].click()
        await browser.waitPageForLoad()
        await ProductDetailsPage.mSizeOption.click()
        await ProductDetailsPage.purpleColorOption.click()
        await ProductDetailsPage.addToCartBtn.click()
        await browser.waitPageForLoad()
        await ProductDetailsPage.successMsg.waitForDisplayed()
        await ProductDetailsPage.successMsg.scrollIntoView({block: 'center'})
        await browser.waitForDisplayedAndClickable(await $('aria/shopping cart'))

        await Cart.cartBtn.click()
        expect(await Cart.cartItems.length).toEqual(1)
        await browser.checkScreen(`Cart--${testName}`, {})
    });

    it('should change total price after adding 2 more products', async function () {

        expect(parseFloat((await Cart.totalSum.getText()).substring(1))).toEqual(parseFloat((await Cart.itemPrice[0].getText()).substring(1)))
        await browser.back()
        await browser.waitPageForLoad()
        await ProductsPage.productItems[1].click()
        await browser.waitPageForLoad()
        await ProductDetailsPage.xsSizeOption.click()
        await ProductDetailsPage.blackColorOption.click()
        await ProductDetailsPage.addToCartBtn.click()
        await browser.waitPageForLoad()
        await ProductDetailsPage.successMsg.waitForDisplayed()

        await browser.back()
        await browser.waitPageForLoad()
        await ProductsPage.productItems[2].click()
        await browser.waitPageForLoad()
        await ProductDetailsPage.xlSizeOption.click()
        await ProductDetailsPage.whiteColorOption.click()
        await ProductDetailsPage.addToCartBtn.click()
        await browser.waitPageForLoad()
        await ProductDetailsPage.successMsg.waitForDisplayed()
        await Cart.cartBtn.click()
        expect(await Cart.cartItems.length).toEqual(3)
        expect(parseFloat((await Cart.totalSum.getText()).substring(1))).toEqual(
            parseFloat((await Cart.itemPrice[0].getText()).substring(1))
                    + parseFloat((await Cart.itemPrice[1].getText()).substring(1))
                    + parseFloat((await Cart.itemPrice[2].getText()).substring(1))
        )
        await browser.checkScreen(`Cart--${testName}`, {})
    });

    it('should not delete product after clicking on Cancel button', async function () {
        await Cart.deleteItemBtn[2].click()
        await Cart.cancelBtn.click()
        expect(await Cart.cartItems.length).toEqual(3)
    });

    it('should delete product after clicking on OK button', async function () {
        await Cart.deleteItemBtn[2].click()
        await Cart.okBtn.click()
        await browser.waitUntil(async() =>(await browser.shouldReturnBoolean(await Cart.cartItems[2])),
            {
                timeout: 15000,
                timeoutMsg: 'item still exist after 15s'
            }
        )
        await Cart.deleteItemBtn[1].click()
        await Cart.okBtn.click()
        await browser.waitUntil(async() =>(await browser.shouldReturnBoolean(await Cart.cartItems[1])),
            {
                timeout: 15000,
                timeoutMsg: 'item still exist after 15s'
            }
        )
        expect(await Cart.cartItems.length).toEqual(1)
        await browser.checkScreen(`Cart--${testName}`, {})
    });

    it('should change total price after changing quantity value', async function () {
        await Cart.cartProductQtyInput[0].doubleClick()
        await browser.keys('Delete')
        await Cart.cartProductQtyInput[0].setValue('5')
        await Cart.updateCartItemBtn[0].isDisplayed()
        await Cart.updateCartItemBtn[0].click()
        await Cart.updateCartItemBtn[0].waitForDisplayed({reverse: true})
        await browser.pause(1000)
        expect(parseFloat((await Cart.totalSum.getText()).substring(1))).toEqual(
            parseFloat((await Cart.itemPrice[0].getText()).substring(1))
            * parseFloat((await Cart.cartProductQtyInput[0].getValue()))
        )
        await browser.checkScreen(`Cart--${testName}`, {})
    });

    it('should update product info after clicking on edit button', async function () {
        await Cart.editItemBtn[0].click()
        await browser.waitPageForLoad()
        // await browser.waitProductDetailsItemsForDisplayedAndClickable()
        await ProductDetailsPage.xsSizeOption.click()
        await ProductDetailsPage.yellowColorOption.click()
        await ProductDetailsPage.quantityInput.clearValue()
        await ProductDetailsPage.quantityInput.setValue(3)
        await ProductDetailsPage.updateCartBtn.click()
        await browser.waitPageForLoad()
        await $('aria/was updated in your shopping cart').isDisplayed()
        await Cart.cartBtn.click()
        await Cart.toggleDropdown[0].click()
        await expect($('aria/XS')).toBeDisplayed()
        await expect($('aria/Yellow')).toBeDisplayed()
        await Cart.toggleDropdown[0].click()
        await expect(Cart.cartProductQtyInput[0]).toHaveValue('3')
    });

    it('should redirect to the cart page by clicking on View Cart link', async function () {
        await header.headerLogo.click()
        await browser.waitPageForLoad()
        await Cart.cartBtn.click()
        await Cart.viewCartLink.click()
        await browser.waitPageForLoad()
        await browser.waitCartPageForDisplayedAndClickable()
    });

    it('should update product total price after changing quantity', async function () {
        await CartPage.qtyInput[0].doubleClick()
        await browser.keys('Delete')
        await CartPage.qtyInput[0].setValue('10')
        await CartPage.updateCartBtn.click()
        await browser.pause(2000)
        await browser.waitPageForLoad()
        await expect(parseFloat((await CartPage.totalItemPrice[0].getText()).substring(1))).toEqual(
            parseFloat((await CartPage.itemPrice[0].getText()).substring(1))
            * parseFloat((await CartPage.qtyInput[0].getValue()))
        )
    });

    it('should move product to wishlist', async function () {
        await navbar.womanTab.moveTo()
        await navbar.womanTopsCategory.click()
        await browser.waitPageForLoad()
        await ProductsPage.productItems[3].click()
        await browser.waitPageForLoad()
        await ProductDetailsPage.mSizeOption.click()
        await ProductDetailsPage.redColorOption.click()
        await ProductDetailsPage.addToCartBtn.click()
        await browser.waitPageForLoad()
        await ProductDetailsPage.successMsg.waitForDisplayed()

        await Cart.cartBtn.click()
        await Cart.viewCartLink.click()
        await browser.waitPageForLoad()
        await expect(await CartPage.cartItems.length).toEqual(2)
        await CartPage.moveToWishlistLink[1].click()
        await browser.waitPageForLoad()
        await expect(CartPage.successMsg).toBeDisplayed()
        await expect(await CartPage.cartItems.length).toEqual(1)
        await header.headerSwitchArrow.click()
        await header.headerWishlistLink.click()
        await browser.waitPageForLoad()
        await expect(await MyWishListPage.productItems.length).toEqual(1)
    });


    it('should display coupon code on opening discount toggle', async function () {
        await Cart.cartBtn.click()
        await Cart.viewCartLink.click()
        await browser.waitPageForLoad()

        await CartPage.discountToggle.click()
        await expect(CartPage.discountCodeInput).toBeDisplayed()
        await expect(CartPage.applyDiscountBtn).toBeDisplayed()

        await CartPage.discountToggle.click()
        await expect(CartPage.discountCodeInput).not.toBeDisplayed()
        await expect(CartPage.applyDiscountBtn).not.toBeDisplayed()
    });

    it('should display destination inputs on opening estimate tax toggle', async function () {
        await CartPage.estimateShippingToggle.click()
        await expect(CartPage.countryDropdown).toBeDisplayed()
        await expect(CartPage.regionDropdown).toBeDisplayed()
        await expect(CartPage.zipInput).toBeDisplayed()

        await CartPage.estimateShippingToggle.click()
        await expect(CartPage.countryDropdown).not.toBeDisplayed()
        await expect(CartPage.regionDropdown).not.toBeDisplayed()
        await expect(CartPage.zipInput).not.toBeDisplayed()
    });

    it('should change tag type on input with country other than USA', async function () {
        await CartPage.estimateShippingToggle.click()
        await expect(CartPage.regionDropdown).toBeDisplayed()
        await expect(CartPage.regionInput).not.toBeDisplayed()

        await CartPage.countryDropdown.selectByVisibleText('Ukraine')

        await expect(CartPage.regionDropdown).not.toBeDisplayed()
        await expect(CartPage.regionInput).toBeDisplayed()
    });

    it('should delete product by clicking on delete button', async function () {
        await header.headerLogo.scrollIntoView({block:"center"})
        await navbar.womanTab.moveTo()
        await navbar.womanTopsCategory.click()
        await browser.waitPageForLoad()
        await ProductsPage.productItems[3].click()
        await browser.waitPageForLoad()
        await ProductDetailsPage.mSizeOption.click()
        await ProductDetailsPage.redColorOption.click()
        await ProductDetailsPage.addToCartBtn.click()
        await browser.waitPageForLoad()
        await ProductDetailsPage.successMsg.waitForDisplayed()

        await Cart.cartBtn.click()
        await Cart.viewCartLink.click()
        await browser.waitPageForLoad()
        await expect(await CartPage.cartItems.length).toEqual(2)
        await CartPage.itemDeleteBtn[1].click()
        await browser.waitPageForLoad()
        await expect(await CartPage.cartItems.length).toEqual(1)
    });

    it('should redirect to Checkout Page by clicking on Checkout button', async function () {
        await header.headerLogo.click()
        await browser.waitPageForLoad()
        await Cart.cartBtn.click()
        await Cart.checkoutBtn.click()
        await browser.waitPageForLoad()
        await CheckoutPage.progressBar.isDisplayed()
    });

})