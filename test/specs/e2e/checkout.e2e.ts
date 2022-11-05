import {Header} from "../../page_objects/header";
import {Navbar} from "../../page_objects/navbar";
import ProductsPage from "../../page_objects/products.page";
import ProductDetailsPage from "../../page_objects/productDetails.page";
import Cart from "../../page_objects/cart";
import CartPage from "../../page_objects/cart.page";
import MyWishListPage from "../../page_objects/myWishList.page";
import {AddressBookInterface} from "../../../src/interfaces/account.interfaces";
import {faker} from "@faker-js/faker";
import AccountSidebarPage from "../../page_objects/accountSidebar.page";
import AddressBookPage from "../../page_objects/addressBook.page";
import CheckoutPage from "../../page_objects/checkout.page";

describe('Checkout', async function () {
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


    it('should show new address popup if there no addresses in account', async function() {
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
        await browser.checkScreen(`Checkout--${testName}`, {})
    });

    it('should show address widgets witch active addresses in account', async function () {
        const firstAddressBody: AddressBookInterface ={
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

        const secondAddressBody: AddressBookInterface ={
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

        await expect(await CheckoutPage.selectShippingAddressBtn.length).toEqual(0)
        await header.headerLogo.click()
        await browser.waitPageForLoad()
        await header.headerSwitchArrow.click()
        await header.headerWishlistLink.click()
        await browser.waitPageForLoad()
        await AccountSidebarPage.addressBookTab.click()
        await browser.waitPageForLoad()
        await browser.enterUserAddress(firstAddressBody)
        await AddressBookPage.saveAddressBtn.click()
        await browser.waitPageForLoad()
        await AddressBookPage.addNewAddressBtn.waitForClickable()
        await AddressBookPage.addNewAddressBtn.click()
        await browser.waitPageForLoad()
        await browser.enterUserAddress(secondAddressBody)
        await AddressBookPage.saveAddressBtn.click()
        await browser.waitPageForLoad()

        await Cart.cartBtn.waitForClickable()
        await Cart.cartBtn.click()
        await Cart.checkoutBtn.click()
        await browser.waitPageForLoad()
        await browser.pause(1000)
        await expect(await CheckoutPage.shippingItems.length).toEqual(2)
        await browser.checkScreen(`Checkout--${testName}`, {})
    });

    it('should switch shipping addresses', async function () {
        await expect(CheckoutPage.shippingItems[0]).toHaveElementClassContaining('selected-item')
        await expect(CheckoutPage.shippingItems[1]).toHaveElementClassContaining('not-selected-item')
        await CheckoutPage.selectShippingAddressBtn[0].click()
        await expect(CheckoutPage.shippingItems[0]).toHaveElementClassContaining('not-selected-item')
        await expect(CheckoutPage.shippingItems[1]).toHaveElementClassContaining('selected-item')
        await CheckoutPage.selectShippingAddressBtn[0].click()
        await expect(CheckoutPage.shippingItems[0]).toHaveElementClassContaining('selected-item')
        await expect(CheckoutPage.shippingItems[1]).toHaveElementClassContaining('not-selected-item')
    });

    it('should open new address popup', async function () {
        await CheckoutPage.newAddressBtn.click()
        await browser.waitNewAddressPopupForDisplayedAndClickable()
    });

    it('should close popup and not add new address by clicking on Cancel button', async function () {
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

        await browser.enterUserAddressCheckoutPopup(addressBody)
        await CheckoutPage.cancelBtn.click()
        await expect(CheckoutPage.firstAddressInput).not.toBeDisplayed()
        await expect(await CheckoutPage.shippingItems.length).toEqual(2)
    });

    it('should not save newly created address to Address Book page', async function () {
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

        await CheckoutPage.newAddressBtn.waitForClickable()
        await CheckoutPage.newAddressBtn.click()
        await browser.enterUserAddressCheckoutPopup(addressBody)
        await expect(CheckoutPage.saveShippingAddressCheckbox).toBeChecked()
        await CheckoutPage.saveShippingAddressCheckbox.click()
        await expect(CheckoutPage.saveShippingAddressCheckbox).not.toBeChecked()
        await CheckoutPage.saveAddressBtn.click()
        await expect(await CheckoutPage.shippingItems.length).toEqual(3)

        await header.headerLogo.waitForClickable()
        await header.headerLogo.click()
        await browser.waitPageForLoad()
        await header.headerSwitchArrow.waitForClickable()
        await header.headerSwitchArrow.click()
        await header.headerAccountLink.waitForClickable()
        await header.headerAccountLink.click()
        await browser.waitPageForLoad()
        await AccountSidebarPage.addressBookTab.click()
        await browser.waitPageForLoad()
        await expect(await AddressBookPage.firstNameColumn.length).toEqual(1)
    });

    it('should save newly created address as Address Book', async function () {
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

        await Cart.cartBtn.waitForClickable()
        await Cart.cartBtn.click()
        await Cart.checkoutBtn.waitForClickable()
        await Cart.checkoutBtn.click()
        await browser.waitPageForLoad()


        await CheckoutPage.newAddressBtn.waitForClickable()
        await CheckoutPage.newAddressBtn.click()
        await browser.enterUserAddressCheckoutPopup(addressBody)
        await expect(CheckoutPage.saveShippingAddressCheckbox).toBeChecked()
        await CheckoutPage.saveAddressBtn.click()
        await expect(await CheckoutPage.shippingItems.length).toEqual(3)
        await expect(CheckoutPage.shippingItems[2]).toHaveElementClassContaining('selected-item')
        await expect(CheckoutPage.newAddressBtn).not.toBeDisplayed()
    });

    // it('should display products in cart by opening a toggle', async function () {
    //     await CheckoutPage.itemsInCartToggle.scrollIntoView({block:"center"})
    //
    //     await CheckoutPage.itemsInCartToggle.waitForClickable()
    //     await CheckoutPage.itemsInCartToggle.click()
    //     await expect(CheckoutPage.cartItems[0]).not.toBeDisplayed()
    //
    //     await CheckoutPage.itemsInCartToggle.waitForClickable()
    //     await CheckoutPage.itemsInCartToggle.click()
    //     await expect(CheckoutPage.cartItems[0]).toBeDisplayed()
    // });

    it('should redirect to the payments review', async function () {
        await CheckoutPage.nextBtn.waitForClickable()
        await CheckoutPage.nextBtn.click()
        await browser.waitPageForLoad()
        await browser.waitUntil(
            async () => await CheckoutPage.editAddressBtn.isClickable(),
            {
                timeout: 6 * 1000, // 5 seconds
                timeoutMsg: 'Message on failure'
            }
        );
        await CheckoutPage.billingAddressDetails.isDisplayed()
        await CheckoutPage.placeOrderBtn.isDisplayed()
        await CheckoutPage.shipToDetails.isDisplayed()
        await CheckoutPage.shipViaDetails.isDisplayed()
        await CheckoutPage.shippingProgressCompleteLink.isClickable()
        await browser.checkScreen(`Checkout--${testName}`, {})
    });

    it('should return to the shipping stage', async function () {
        await CheckoutPage.shippingProgressCompleteLink.waitForClickable()
        await CheckoutPage.shippingProgressCompleteLink.click()
        await expect(CheckoutPage.shippingItems).toBeDisplayed()
    });

    it('should hide Edit button with active same address checkbox', async function () {
        await CheckoutPage.nextBtn.waitForClickable()
        await CheckoutPage.nextBtn.click()
        await browser.waitPageForLoad()
        await browser.waitUntil(
            async () => await CheckoutPage.editAddressBtn.isClickable(),
            {
                timeout: 6 * 1000, // 6 seconds
                timeoutMsg: 'Message on failure'
            }
        );
        await CheckoutPage.editAddressBtn.isDisplayed()
        await CheckoutPage.sameAddressesCheckbox.waitForClickable()
        await CheckoutPage.sameAddressesCheckbox.click()
        await CheckoutPage.sameAddressesCheckbox.isSelected()
        await expect(CheckoutPage.editAddressBtn).not.toBeDisplayed()
        await browser.checkScreen(`Checkout--${testName}`, {})
    });

    it('should not change billing address after clicking on Cancel button', async function () {
        await CheckoutPage.sameAddressesCheckbox.waitForClickable()
        await CheckoutPage.sameAddressesCheckbox.click()
        await CheckoutPage.billingAddressDropdown.selectByIndex(2)
        await CheckoutPage.billingCancelBtn.click()
        await browser.waitUntil(
            async () => await CheckoutPage.sameAddressesCheckbox.isClickable(),
            {
                timeout: 6 * 1000, // 6 seconds
                timeoutMsg: 'Message on failure'
            }
        );
        await CheckoutPage.sameAddressesCheckbox.isSelected()
        await expect(CheckoutPage.editAddressBtn).not.toBeDisplayed()
        await browser.checkScreen(`Checkout--${testName}`, {})
    });

    it('should open new address popup by selecting New Address option', async function () {
        await CheckoutPage.sameAddressesCheckbox.waitForClickable()
        await CheckoutPage.sameAddressesCheckbox.click()
        await CheckoutPage.billingAddressDropdown.selectByVisibleText('New Address')
        await browser.waitNewAddressPopupForDisplayedAndClickable()
        await browser.checkScreen(`Checkout--${testName}`, {})
    });

    it('should add new address and make him active', async function () {
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

        await browser.enterUserAddressCheckoutPopup(addressBody)
        await CheckoutPage.billingUpdateBtn.waitForClickable()
        await CheckoutPage.billingUpdateBtn.click()
        await browser.waitUntil(
            async () => await CheckoutPage.sameAddressesCheckbox.isClickable(),
            {
                timeout: 6 * 1000, // 6 seconds
                timeoutMsg: 'Message on failure'
            }
        );
        await expect(CheckoutPage.billingAddressDetails).toHaveTextContaining(addressBody.phone)
    });

    it('should redirect to the shipping stage by clicking on Ship To edit button', async function () {
        await CheckoutPage.shipToDetails.scrollIntoView({block:"center"})
        await CheckoutPage.shipToEditBtn.waitForClickable()
        await CheckoutPage.shipToEditBtn.click()
        await expect(CheckoutPage.shippingItems).toBeDisplayed()
    });

    it('should redirect to the shipping stage by clicking on Ship Via edit button', async function () {
        await CheckoutPage.nextBtn.waitForClickable()
        await CheckoutPage.nextBtn.click()
        await browser.waitPageForLoad()
        await browser.waitUntil(
            async () => await CheckoutPage.editAddressBtn.isClickable(),
            {
                timeout: 6 * 1000, // 6 seconds
                timeoutMsg: 'Message on failure'
            }
        );
        await CheckoutPage.shipViaDetails.scrollIntoView({block:"center"})
        await CheckoutPage.shipViaEditBtn.waitForClickable()
        await CheckoutPage.shipViaEditBtn.click()
        await expect(CheckoutPage.shippingItems).toBeDisplayed()
    });

    it('should successfully confirm order', async function () {
        await CheckoutPage.nextBtn.waitForClickable()
        await CheckoutPage.nextBtn.click()
        await browser.waitPageForLoad()
        await browser.waitUntil(
            async () => await CheckoutPage.editAddressBtn.isClickable(),
            {
                timeout: 6 * 1000, // 6 seconds
                timeoutMsg: 'Message on failure'
            }
        );
        await CheckoutPage.placeOrderBtn.waitForClickable()
        await CheckoutPage.placeOrderBtn.click()
        await browser.waitPageForLoad()
        await $('aria/Thank you for your purchase!').isDisplayed()
        await CheckoutPage.orderNumberLink.isDisplayed()
        await CheckoutPage.continueShoppingBtn.isDisplayed()
        await CheckoutPage.printBtn.isDisplayed()
        await browser.checkScreen(`Checkout--${testName}`, {})
    });

    it('should remove item from the cart after confirming order', async function () {
        await Cart.cartBtn.waitForClickable()
        await Cart.cartBtn.click()
        await expect(await CartPage.cartItems.length).toEqual(0)
    });

    it('should display homepage after clicking on Continue Shipping button', async function () {
        await Cart.closeBtn.waitForClickable()
        await Cart.closeBtn.click()
        await CheckoutPage.continueShoppingBtn.waitForClickable()
        await CheckoutPage.continueShoppingBtn.click()
        await browser.waitPageForLoad()
        await browser.waitHomepageElemsForDisplayedAndClickable()
    });


})