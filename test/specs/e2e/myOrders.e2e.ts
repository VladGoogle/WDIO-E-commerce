import {Header} from "../../page_objects/header";
import {Navbar} from "../../page_objects/navbar";
import ProductsPage from "../../page_objects/products.page";
import ProductDetailsPage from "../../page_objects/productDetails.page";
import Cart from "../../page_objects/cart";
import {AddressBookInterface} from "../../../src/interfaces/account.interfaces";
import {faker} from "@faker-js/faker";
import AccountSidebarPage from "../../page_objects/accountSidebar.page";
import CheckoutPage from "../../page_objects/checkout.page";
import OrdersPage from "../../page_objects/orders.page";
import CartPage from "../../page_objects/cart.page";

describe('Checkout', async function () {
    let testName;
    let fullTestName
    const header = new Header()
    const navbar = new Navbar(header)


    before(async () => {
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


    it('should save order', async function () {

        const addressBody: AddressBookInterface = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            company: faker.company.name(),
            phone: faker.phone.number(),
            firstStreetAddress: faker.address.streetAddress(true),
            secondStreetAddress: faker.address.streetAddress(true),
            thirdStreetAddress: faker.address.streetAddress(true),
            city: faker.address.city(),
            state: faker.address.state(),
            zip: faker.address.zipCode(),
            country: 'Ukraine'
        }


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

        await Cart.cartBtn.waitForClickable()
        await Cart.cartBtn.click()
        await Cart.checkoutBtn.click()
        await browser.waitPageForLoad()
        await browser.waitNewAddressPopupForDisplayedAndClickable()
        await browser.enterUserAddressCheckoutPopup(addressBody)
        await CheckoutPage.nextBtn.click()
        await browser.waitPageForLoad()
        await browser.waitUntil(
            async () => await CheckoutPage.sameAddressesCheckbox.isClickable(),
            {
                timeout: 6 * 1000, // 6 seconds
                timeoutMsg: 'Message on failure'
            }
        );
        await CheckoutPage.placeOrderBtn.click()
        await browser.waitPageForLoad()
        const orderId = await CheckoutPage.orderNumberLink.$('strong').getText()
        await header.headerSwitchArrow.click()
        await header.headerAccountLink.click()
        await browser.waitPageForLoad()
        await AccountSidebarPage.myOrdersTab.click()
        await browser.waitPageForLoad()
        await expect(await OrdersPage.tableItems.length).toEqual(2)
        await expect(OrdersPage.orderIdColumn).toHaveText(orderId)
        await browser.checkScreen(`Checkout--${testName}`, {})
    });

    it('should open order details', async function () {
        await OrdersPage.viewOrderBtn[0].click()
        await browser.waitPageForLoad()
        await OrdersPage.orderPageTitle.isDisplayed()
        await OrdersPage.orderStatus.isDisplayed()
        await OrdersPage.orderDate.isDisplayed()
        await browser.checkScreen(`Checkout--${testName}`, {})
    });

    it('should redirect to the cart page after clicking on Reorder button', async function () {
        await OrdersPage.reorderBtn[0].click()
        await browser.waitPageForLoad()
        await browser.waitUntil(
            async () => await CartPage.qtyInput[0].isDisplayed(),
            {
                timeout: 7 * 1000, // 6 seconds
                timeoutMsg: 'Message on failure'
            }
        );
        // await browser.waitCartPageForDisplayedAndClickable()
    });

    it('should change order info', async function () {
        const addressBody: AddressBookInterface ={
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            company: faker.company.name(),
            phone: faker.phone.number(),
            firstStreetAddress: faker.address.streetAddress(true),
            secondStreetAddress: faker.address.streetAddress(true),
            thirdStreetAddress: faker.address.streetAddress(true),
            city: faker.address.city(),
            state: faker.address.state(),
            zip: faker.address.zipCode(),
            country: 'Ukraine'
        }


        await CartPage.qtyInput[0].setValue(10)
        const qtyValue = await CartPage.qtyInput[0].getValue()
        await CartPage.updateCartBtn.click()
        await browser.waitUntil(
            async () => await CartPage.checkoutBtn.isClickable(),
            {
                timeout: 7 * 1000, // 6 seconds
                timeoutMsg: 'Message on failure'
            }
        );
        await CartPage.checkoutBtn.click()
        await browser.waitPageForLoad()
        await CheckoutPage.newAddressBtn.click()
        await browser.enterUserAddressCheckoutPopup(addressBody)
        await CheckoutPage.saveAddressBtn.click()
        await browser.waitPageForLoad()
        await CheckoutPage.nextBtn.waitForClickable()
        await CheckoutPage.nextBtn.click()
        await browser.waitPageForLoad()
        await browser.waitUntil(
            async () => await CheckoutPage.placeOrderBtn.isClickable(),
            {
                timeout: 6 * 1000, // 6 seconds
                timeoutMsg: 'Message on failure'
            }
        );
        await CheckoutPage.placeOrderBtn.click()
        await browser.waitPageForLoad()
        const orderId = await CheckoutPage.orderNumberLink.$('strong').getText()
        await CheckoutPage.orderNumberLink.click()
        await browser.waitPageForLoad()
        await expect(OrdersPage.orderPageTitle).toHaveText(`Order # ${orderId}`)
        await expect(OrdersPage.orderItemQty[0]).toHaveText(`Ordered ${qtyValue}`)
        await browser.checkScreen(`Checkout--${testName}`, {})
    });
})
