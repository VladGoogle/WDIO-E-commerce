import {Header} from "./page_objects/header";
import LoginPage from "./page_objects/login.page";
import {Navbar} from "./page_objects/navbar";
import RegisterPage from "./page_objects/register.page";
import ForgotPasswordPage from "./page_objects/forgotPassword.page";
import HomePage from "./page_objects/home.page";
import Footer from "./page_objects/footer";
import ProductsPage from "./page_objects/products.page";
import {emailForLogin, passwordForLogin} from "../src/constants/login.constants";
import ProductDetailsPage from "./page_objects/productDetails.page";
import {
    randomEmail,
    randomMediumPassword,
    randomName, randomPassword,
    randomStrongestPassword, randomSurname
} from "../src/constants/register.constants";
import AccountPage from "./page_objects/account.page";
import AccountSidebarPage from "./page_objects/accountSidebar.page";
import AccountInformationPage from "./page_objects/accountInformation.page";
import AddressBookPage from "./page_objects/addressBook.page";
import MyProductReviewsPage from "./page_objects/myProductReviews.page";
import NewsletterSubscriptionPage from "./page_objects/newsletterSubscription.page";
import { faker } from '@faker-js/faker';
import {AccountInterfaces, AddressBookInterface} from "../src/interfaces/account.interfaces";
import CartPage from "./page_objects/cart.page";
import CheckoutPage from "./page_objects/checkout.page";


const header = new Header()
const navbar = new Navbar(header)

async function takeFullPageScreenshot(options = {}) {
    return browser.call(async () => {
        const puppeteer = await browser.getPuppeteer()
        const pages = await puppeteer.pages()
        return pages[0].screenshot({ ...options, fullPage: true })
    })
}

async function elemHasClass(elem:  WebdriverIO.Element, className: string) {
    await expect(await elem.getAttribute('class')).toContain(className)
}

async function checkSortingPriceByAscending(arr: WebdriverIO.Element[]) {
    let actualList =[]
    let tempList=[]
    let sortList =[]
    let tempFlag = true
    for(const item of arr) {
        const value = await item.getText()
        actualList.push(parseFloat(value.substring(1)));
        tempList.push(parseFloat(value.substring(1)));
    }
    tempList = tempList.filter(value => !Number.isNaN(value))
    actualList = actualList.filter(value => !Number.isNaN(value))
    sortList = actualList.sort()
    for(let i=0;i<actualList.length;i++){
        if(tempList[i]==sortList[i]) {} else {
            tempFlag = false
            break;
        }
    }

    if(tempFlag==true) {
        console.log('List in sorted order')
    } else {
        throw `List isn't in sorted order`
    }
}

async function checkSortingNameByAscending(arr: WebdriverIO.Element[]) {
    let actualList =[]
    let tempList=[]
    let sortList =[]
    let tempFlag = true
    for(const item of arr) {
        const value = await item.getText()
        actualList.push(value);
        tempList.push(value);
    }
    tempList = tempList.filter(value => !Number.isNaN(value))
    actualList = actualList.filter(value => !Number.isNaN(value))
    sortList = actualList.sort()
    for(let i=0;i<actualList.length;i++){
        if(tempList[i]==sortList[i]) {} else {
            tempFlag = false
            break;
        }
    }

    if(tempFlag==true) {
        console.log('List in sorted order')
    } else {
        throw `List isn't in sorted order`
    }
}

async function checkSortingPriceByDescending(arr: WebdriverIO.Element[]) {
    let actualList =[]
    let tempList=[]
    let sortList =[]
    let tempFlag = true
    for(const item of arr) {
        const value = await item.getText()
        actualList.push(parseFloat(value.substring(1)));
        tempList.push(parseFloat(value.substring(1)));
    }
    tempList = tempList.filter(value => !Number.isNaN(value))
    actualList = actualList.filter(value => !Number.isNaN(value))
    sortList = actualList.sort().reverse()
    for(let i=0;i<actualList.length;i++){
        if(tempList[i]==sortList[i]) {} else {
            tempFlag = false
            break;
        }
    }

    if(tempFlag==true) {
        console.log('List in sorted order')
    } else {
        throw `List isn't in sorted order`
    }
}

async function checkSortingNameByDescending(arr: WebdriverIO.Element[]) {
    let actualList =[]
    let tempList=[]
    let sortList =[]
    let tempFlag = true
    for(const item of arr) {
        const value = await item.getText()
        actualList.push(value);
        tempList.push(value);
    }
    tempList = tempList.filter(value => !Number.isNaN(value))
    actualList = actualList.filter(value => !Number.isNaN(value))
    sortList = actualList.sort().reverse()
    for(let i=0;i<actualList.length;i++){
        if(tempList[i]==sortList[i]) {} else {
            tempFlag = false
            break;
        }
    }

    if(tempFlag==true) {
        console.log('List in sorted order')
    } else {
        throw `List isn't in sorted order`
    }
}

async function elemHasColor(elem:  WebdriverIO.Element, color: string) {
    const colorVal = await elem.getCSSProperty('color')
    await expect(colorVal.parsed.hex).toEqual(color)
}

async function getBeforePseudoElementBackgroundColor(text: string) {
    return await browser.execute((selector: string) => {
        let style = document.defaultView.getComputedStyle(document.querySelector(selector),'::before');
        return style.getPropertyValue('background-color')
    }, text)
}

async function getBeforePseudoElementColor(text: string) {
    return await browser.execute((selector: string) => {
        let style = document.defaultView.getComputedStyle(document.querySelector(selector),'::before');
        return style.getPropertyValue('color')
    }, text)
}

function componentToHex (val: number){
    let hex = val.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

async function rgbToHex(val: string) {
    const rgb = val.match(/\d+/g).map(function (x) {
        return parseInt(x, 10);
    });
    return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
}

async function hoverAndCheckColor(elem: WebdriverIO.Element, colorVal: string) {
    await elem.moveTo()
    await browser.pause(500)
    const color = await elem.getCSSProperty('color')
    await expect(color.parsed.hex).toEqual(colorVal)
}

async function hoverAndCheckBackgroundColor(elem: WebdriverIO.Element, colorVal: string) {
    await elem.moveTo()
    await browser.pause(500)
    const color = await elem.getCSSProperty('background-color')
    await expect(color.parsed.hex).toEqual(colorVal)
}


async function waitForDisplayedAndClickable(elem: WebdriverIO.Element) {
    await expect(elem).toBeDisplayed()
    await expect(elem).toBeClickable()
}

async function testCommand(this: WebdriverIO.Element) {
    await this.waitForDisplayed()
    await this.waitForClickable()
}

async function waitErrorForDisplayed(elem: WebdriverIO.Element, text:string) {
    await elem.waitForDisplayed()
    await expect(elem).toHaveTextContaining(text)
}

async function waitRequiredErrorForDisplayed(elem: WebdriverIO.Element) {
    await elem.waitForDisplayed()
    await expect(elem).toHaveText('This is a required field.')
}



async function waitHeaderForDisplayedAndClickable() {
    await browser.waitForDisplayedAndClickable(await header.headerLogo)
    await browser.waitForDisplayedAndClickable(await header.searchInput)
    await browser.waitForDisplayedAndClickable(await header.loginLink)
    await browser.waitForDisplayedAndClickable(await header.registerLink)
    await browser.waitForDisplayedAndClickable(await header.cartBtn)
}

async function waitFooterForDisplayedAndClickable() {
    await browser.waitForDisplayedAndClickable(await Footer.aboutUsLink)
    await browser.waitForDisplayedAndClickable(await Footer.customerServiceLink)
    await browser.waitForDisplayedAndClickable(await Footer.writeUsLink)
    await browser.waitForDisplayedAndClickable(await Footer.searchTermsLink)
    await browser.waitForDisplayedAndClickable(await Footer.advancedSearchLink)
    await browser.waitForDisplayedAndClickable(await Footer.ordersAndReturnsLink)
    await browser.waitForDisplayedAndClickable(await Footer.newsletterInput)
    await browser.waitForDisplayedAndClickable(await Footer.subscribeBtn)
}

async function waitNavbarForDisplayedAndClickable() {
    await browser.waitForDisplayedAndClickable(await navbar.newsTab)
    await browser.waitForDisplayedAndClickable(await navbar.womanTab)
    await browser.waitForDisplayedAndClickable(await navbar.menTab)
    await browser.waitForDisplayedAndClickable(await navbar.gearTab)
    await browser.waitForDisplayedAndClickable(await navbar.trainingTab)
    await browser.waitForDisplayedAndClickable(await navbar.saleTab)
}


async function waitRegisterElemsForDisplayedAndClickable() {
    await browser.waitForDisplayedAndClickable(await RegisterPage.firstNameInput)
    await browser.waitForDisplayedAndClickable(await RegisterPage.lastNameInput)
    await browser.waitForDisplayedAndClickable(await RegisterPage.subscribeCheckbox)
    await browser.waitForDisplayedAndClickable(await RegisterPage.emailInput)
    await browser.waitForDisplayedAndClickable(await RegisterPage.passwordInput)
    await browser.waitForDisplayedAndClickable(await RegisterPage.confirmPasswordInput)
    await browser.waitForDisplayedAndClickable(await RegisterPage.submitBtn)
}

async function waitLoginElemsForDisplayedAndClickable() {
    await browser.waitForDisplayedAndClickable(await LoginPage.emailInput)
    await browser.waitForDisplayedAndClickable(await LoginPage.passwordInput)
    await browser.waitForDisplayedAndClickable(await LoginPage.forgotPasswordLink)
    await browser.waitForDisplayedAndClickable(await LoginPage.submitBtn)
    await browser.waitForDisplayedAndClickable(await LoginPage.registerLink)
}

async function waitForgotPasswordElemsForDisplayedAndClickable() {
    await browser.waitForDisplayedAndClickable(await ForgotPasswordPage.emailInput)
    await browser.waitForDisplayedAndClickable(await ForgotPasswordPage.captchaInput)
    await browser.waitForDisplayedAndClickable(await ForgotPasswordPage.submitBtn)
    await browser.waitForDisplayedAndClickable(await ForgotPasswordPage.reloadCaptchaBtn)
}

async function waitHomepageElemsForDisplayedAndClickable() {
    await browser.waitForDisplayedAndClickable(await HomePage.homeMainBlock)
    await browser.waitForDisplayedAndClickable(await HomePage.homeMainBtn)
    await browser.waitForDisplayedAndClickable(await HomePage.homePantsBlock)
    await browser.waitForDisplayedAndClickable(await HomePage.homeShirtsBlock)
    await browser.waitForDisplayedAndClickable(await HomePage.homeErinBlock)
    await browser.waitForDisplayedAndClickable(await HomePage.homePerformanceBlock)
    await browser.waitForDisplayedAndClickable(await HomePage.homeEcoBlock)
}

async function waitViewProductsItemsForDisplayedAndClickable() {
    await ProductsPage.productsTitle.waitForDisplayed()
    await browser.waitForDisplayedAndClickable(await ProductsPage.gridViewBtn)
    await browser.waitForDisplayedAndClickable(await ProductsPage.listViewBtn)
    await ProductsPage.toolbarAmountText.waitForDisplayed()
    await browser.waitForDisplayedAndClickable(await ProductsPage.sorterDropdown)
    await browser.waitForDisplayedAndClickable(await ProductsPage.sorterArrow)
    await browser.waitForDisplayedAndClickable(await ProductsPage.itemsLimiter)
    // await browser.waitForDisplayedAndClickable(await ProductsPage.nextBtn)
    // await browser.waitForDisplayedAndClickable(await ProductsPage.prevBtn)
    await browser.waitForDisplayedAndClickable(await ProductsPage.categoryDropdown)
    await browser.waitForDisplayedAndClickable(await ProductsPage.styleDropdown)
    await browser.waitForDisplayedAndClickable(await ProductsPage.sizeDropdown)
    await browser.waitForDisplayedAndClickable(await ProductsPage.priceDropdown)
    await browser.waitForDisplayedAndClickable(await ProductsPage.colorDropdown)
    await browser.waitForDisplayedAndClickable(await ProductsPage.materialDropdown)
    await browser.waitForDisplayedAndClickable(await ProductsPage.ecoDropdown)
    await browser.waitForDisplayedAndClickable(await ProductsPage.performanceDropdown)
    await browser.waitForDisplayedAndClickable(await ProductsPage.erinDropdown)
    await browser.waitForDisplayedAndClickable(await ProductsPage.newDropdown)
    await browser.waitForDisplayedAndClickable(await ProductsPage.saleDropdown)
    await browser.waitForDisplayedAndClickable(await ProductsPage.patternDropdown)
    await browser.waitForDisplayedAndClickable(await ProductsPage.climateDropdown)
}

async function waitProductDetailsItemsForDisplayedAndClickable() {
    await ProductDetailsPage.productTitle.waitForDisplayed()
    await ProductDetailsPage.ratingResult.waitForDisplayed()
    await browser.waitForDisplayedAndClickable(await ProductDetailsPage.viewReviewsLink)
    await browser.waitForDisplayedAndClickable(await ProductDetailsPage.addReviewLink)

    for(const item of await ProductDetailsPage.sizeOptions) {
        await expect(item).toBeDisplayed()
        await expect(item).toBeClickable()
    }

    for(const item of await ProductDetailsPage.colorOptions) {
        await expect(item).toBeDisplayed()
        await expect(item).toBeClickable()
    }
    await browser.waitForDisplayedAndClickable(await ProductDetailsPage.quantityInput)
    await browser.waitForDisplayedAndClickable(await ProductDetailsPage.addToCartBtn)
    await browser.waitForDisplayedAndClickable(await ProductDetailsPage.addToWishlistLink)
    await browser.waitForDisplayedAndClickable(await ProductDetailsPage.addToCompareLink)
    await ProductDetailsPage.descriptionTab.waitForDisplayed()
    await browser.waitForDisplayedAndClickable(await ProductDetailsPage.moreInfoTab)
    await browser.waitForDisplayedAndClickable(await ProductDetailsPage.reviewsTab)
    await ProductDetailsPage.stockAvailabilityBlock.waitForDisplayed()
    await ProductDetailsPage.stockAttributeBlock.waitForDisplayed()
    await ProductDetailsPage.priceInfo.waitForDisplayed()
    await ProductDetailsPage.relatedProductsHeading.waitForDisplayed()
}

async function waitReviewsModalForDisplayedAndClickable() {
    await expect(ProductDetailsPage.userReviews).toBeDisplayed()
    await expect(ProductDetailsPage.reviewLegend).toBeDisplayed()
    for(const item of await ProductDetailsPage.starsRating) {
        await expect(item).toBeDisplayed()
    }
    await browser.waitForDisplayedAndClickable(await ProductDetailsPage.nicknameInput)
    await browser.waitForDisplayedAndClickable(await ProductDetailsPage.summaryInput)
    await browser.waitForDisplayedAndClickable(await ProductDetailsPage.reviewInput)
    await browser.waitForDisplayedAndClickable(await ProductDetailsPage.submitReviewBtn)
}

async function waitAccountSidebarForDisplayedAndClickable() {
    await browser.waitForDisplayedAndClickable(await AccountSidebarPage.myAccountTab)
    await browser.waitForDisplayedAndClickable(await AccountSidebarPage.myOrdersTab)
    await browser.waitForDisplayedAndClickable(await AccountSidebarPage.myDownloadableProductsTab)
    await browser.waitForDisplayedAndClickable(await AccountSidebarPage.myWishListTab)
    await browser.waitForDisplayedAndClickable(await AccountSidebarPage.addressBookTab)
    await browser.waitForDisplayedAndClickable(await AccountSidebarPage.accountInfoTab)
    await browser.waitForDisplayedAndClickable(await AccountSidebarPage.paymentMethodsTab)
    await browser.waitForDisplayedAndClickable(await AccountSidebarPage.myProductReviewsTab)
    await browser.waitForDisplayedAndClickable(await AccountSidebarPage.newsletterSubscriptionsTab)
}

async function waitMyAccountPageForDisplayedAndClickable() {
    await browser.waitForDisplayedAndClickable(await AccountPage.accountEditLink)
    await browser.waitForDisplayedAndClickable(await AccountPage.changePasswordLink)
    await browser.waitForDisplayedAndClickable(await AccountPage.newsletterEditLink)
    await browser.waitForDisplayedAndClickable(await AccountPage.manageAddressesLink)
    await browser.waitForDisplayedAndClickable(await AccountPage.editBillingAddressLink)
    await browser.waitForDisplayedAndClickable(await AccountPage.editShippingAddressLink)
    await browser.waitForDisplayedAndClickable(await AccountPage.viewReviewsLink)
}

async function waitAccountInformationPageForDisplayedAndClickable() {
    await browser.waitForDisplayedAndClickable(await AccountInformationPage.firstnameInput)
    await browser.waitForDisplayedAndClickable(await AccountInformationPage.lastnameInput)
    await browser.waitForDisplayedAndClickable(await AccountInformationPage.changeEmailCheckbox)
    await browser.waitForDisplayedAndClickable(await AccountInformationPage.changePasswordCheckbox)
}

async function waitAddressBookPageForDisplayedAndClickable() {
    await browser.waitForDisplayedAndClickable(await AddressBookPage.firstnameInput)
    await browser.waitForDisplayedAndClickable(await AddressBookPage.lastnameInput)
    await browser.waitForDisplayedAndClickable(await AddressBookPage.companyInput)
    await browser.waitForDisplayedAndClickable(await AddressBookPage.phoneInput)
    await browser.waitForDisplayedAndClickable(await AddressBookPage.streetAddressInput)
    await browser.waitForDisplayedAndClickable(await AddressBookPage.firstAdditionalStreetAddressInput)
    await browser.waitForDisplayedAndClickable(await AddressBookPage.secondAdditionalStreetAddressInput)
    await browser.waitForDisplayedAndClickable(await AddressBookPage.cityInput)
    await browser.waitForDisplayedAndClickable(await AddressBookPage.regionDropdown)
    await browser.waitForDisplayedAndClickable(await AddressBookPage.zipInput)
    await browser.waitForDisplayedAndClickable(await AddressBookPage.countryDropdown)
    await browser.waitForDisplayedAndClickable(await AddressBookPage.saveAddressBtn)
}

async function waitNewAddressPopupForDisplayedAndClickable() {
    await browser.waitForDisplayedAndClickable(await CheckoutPage.firstnameInput)
    await browser.waitForDisplayedAndClickable(await CheckoutPage.lastnameInput)
    await browser.waitForDisplayedAndClickable(await CheckoutPage.companyInput)
    await browser.waitForDisplayedAndClickable(await CheckoutPage.phoneInput)
    await browser.waitForDisplayedAndClickable(await CheckoutPage.firstAddressInput)
    await browser.waitForDisplayedAndClickable(await CheckoutPage.secondAddressInput)
    await browser.waitForDisplayedAndClickable(await CheckoutPage.thirdAddressInput)
    await browser.waitForDisplayedAndClickable(await CheckoutPage.cityInput)
    await browser.waitForDisplayedAndClickable(await CheckoutPage.regionDropdown)
    await browser.waitForDisplayedAndClickable(await CheckoutPage.zipInput)
    await browser.waitForDisplayedAndClickable(await CheckoutPage.countryDropdown)
}

async function waitReviewsPageForDisplayedAndClickable() {
    for(const item of await MyProductReviewsPage.createdDateInfo) {
        await expect(item).toBeDisplayed()
    }

    for(const item of await MyProductReviewsPage.productNameInfo) {
        await expect(item).toBeDisplayed()
    }

    for(const item of await MyProductReviewsPage.productNameInfo) {
        await expect(item).toBeDisplayed()
    }

    for(const item of await MyProductReviewsPage.productRatingInfo) {
        await expect(item).toBeDisplayed()
    }

    for(const item of await MyProductReviewsPage.productReviewInfo) {
        await expect(item).toBeDisplayed()
    }

    for(const item of await MyProductReviewsPage.moreLink) {
        await expect(item).toBeDisplayed()
    }
    await browser.waitForDisplayedAndClickable(await MyProductReviewsPage.itemsLimiter)
    await expect(MyProductReviewsPage.reviewsCounter).toBeDisplayed()

}

async function waitNewsletterSubscriptionPageForDisplayedAndClickable() {
    await expect(NewsletterSubscriptionPage.pageTitle).toBeDisplayed()
    await browser.waitForDisplayedAndClickable(await NewsletterSubscriptionPage.subscriptionCheckbox)
    await browser.waitForDisplayedAndClickable(await NewsletterSubscriptionPage.saveBtn)
}

async function waitCartPageForDisplayedAndClickable() {
    await expect(CartPage.cartItems).toBeClickable()
    await browser.waitForDisplayedAndClickable(await CartPage.checkoutBtn)
    await browser.waitForDisplayedAndClickable(await CartPage.updateCartBtn)
    await browser.waitForDisplayedAndClickable(await CartPage.discountToggle)
    await browser.waitForDisplayedAndClickable(await CartPage.multiAddressCheckout)
    await browser.waitForDisplayedAndClickable(await CartPage.estimateShippingToggle)
}


async function typeAndSearch(query: string) {
    await header.searchInput.setValue(query)
    await header.searchBtn.click()
}

async function login() {
    await LoginPage.emailInput.setValue(emailForLogin)
    await LoginPage.passwordInput.setValue(passwordForLogin)
    await LoginPage.submitBtn.click()
}

async function loginWithCredentials(email: string, password: string) {
    await LoginPage.emailInput.setValue(email)
    await LoginPage.passwordInput.setValue(password)
    await LoginPage.submitBtn.click()
}

async function register() {
    await RegisterPage.firstNameInput.setValue(faker.name.firstName())
    await RegisterPage.lastNameInput.setValue(faker.name.lastName())
    await RegisterPage.emailInput.setValue(faker.internet.email())
    await RegisterPage.passwordInput.setValue(randomPassword)
    await RegisterPage.confirmPasswordInput.setValue(randomPassword)
    await RegisterPage.submitBtn.click()
    await browser.waitPageForLoad()
}

async function interfaceRegister(obj: AccountInterfaces) {
    await RegisterPage.firstNameInput.setValue(obj.firstName)
    await RegisterPage.lastNameInput.setValue(obj.lastName)
    await RegisterPage.emailInput.setValue(obj.email)
    await RegisterPage.passwordInput.setValue(obj.password)
    await RegisterPage.confirmPasswordInput.setValue(obj.confirmPassword)
    await RegisterPage.submitBtn.click()
    await browser.waitPageForLoad()
}

async function waitPageForLoad() {
    await browser.waitUntil(
        async () => await browser.execute(() => document.readyState === 'complete'),
        {
            timeout: 6 * 1000, // 5 seconds
            timeoutMsg: 'Message on failure'
        }
    );
}

async function checkHeaderHover() {
    await browser.hoverAndCheckColor(await navbar.newsTab, '#333333')
    await browser.hoverAndCheckColor(await navbar.womanTab, '#333333')

    await browser.hoverAndCheckBackgroundColor(await navbar.womanTopsCategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.womanJacketsSubcategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.womanHoodiesSubcategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.womanTeesSubcategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.womanBrasSubcategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.womanBottomsCategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.womanPantsSubcategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.womanShortsSubcategory, '#e8e8e8')

    await browser.hoverAndCheckColor(await navbar.menTab, '#333333')
    await browser.hoverAndCheckBackgroundColor(await navbar.manTopsCategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.manJacketsSubcategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.manHoodiesSubcategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.manTeesSubcategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.manTanksSubcategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.manBottomsCategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.manPantsSubcategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.manShortsSubcategory, '#e8e8e8')

    await browser.hoverAndCheckColor(await navbar.gearTab, '#333333')
    await browser.hoverAndCheckBackgroundColor(await navbar.bagsCategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.fitnessEquipmentCategory, '#e8e8e8')
    await browser.hoverAndCheckBackgroundColor(await navbar.watchesCategory, '#e8e8e8')

    await browser.hoverAndCheckColor(await navbar.trainingTab, '#333333')
    await browser.hoverAndCheckBackgroundColor(await navbar.videoCategory, '#e8e8e8')

    await browser.hoverAndCheckColor(await navbar.saleTab, '#333333')
}

async function enterUserAddress(obj: AddressBookInterface) {
    await AddressBookPage.countryDropdown.selectByVisibleText(obj.country)
    await AddressBookPage.firstnameInput.setValue(obj.firstName)
    await AddressBookPage.lastnameInput.setValue(obj.lastName)
    await AddressBookPage.companyInput.setValue(obj.company)
    await AddressBookPage.phoneInput.setValue(obj.phone)
    await AddressBookPage.streetAddressInput.setValue(obj.firstStreetAddress)
    await AddressBookPage.firstAdditionalStreetAddressInput.setValue(obj.secondStreetAddress)
    await AddressBookPage.secondAdditionalStreetAddressInput.setValue(obj.thirdStreetAddress)
    await AddressBookPage.cityInput.setValue(obj.city)
    await AddressBookPage.regionInput.setValue(obj.state)
    await AddressBookPage.zipInput.setValue(obj.zip)
}

async function enterUserAddressCheckoutPopup(obj: AddressBookInterface) {
    await CheckoutPage.countryDropdown.selectByVisibleText(obj.country)
    await CheckoutPage.firstnameInput.setValue(obj.firstName)
    await CheckoutPage.lastnameInput.setValue(obj.lastName)
    await CheckoutPage.companyInput.setValue(obj.company)
    await CheckoutPage.phoneInput.setValue(obj.phone)
    await CheckoutPage.firstAddressInput.setValue(obj.firstStreetAddress)
    await CheckoutPage.secondAddressInput.setValue(obj.secondStreetAddress)
    await CheckoutPage.thirdAddressInput.setValue(obj.thirdStreetAddress)
    await CheckoutPage.cityInput.setValue(obj.city)
    await CheckoutPage.regionInput.setValue(obj.state)
    await CheckoutPage.zipInput.setValue(obj.zip)
}

async function shouldReturnBoolean(element: WebdriverIO.Element): Promise <boolean> {
    if(element === undefined){
        return true;
    }
}






export {
    takeFullPageScreenshot,
    elemHasClass,
    elemHasColor,
    getBeforePseudoElementColor,
    getBeforePseudoElementBackgroundColor,
    rgbToHex,
    hoverAndCheckColor,
    hoverAndCheckBackgroundColor,
    checkSortingPriceByAscending,
    checkSortingPriceByDescending,
    checkSortingNameByAscending,
    checkSortingNameByDescending,
    waitErrorForDisplayed,
    waitRequiredErrorForDisplayed,
    checkHeaderHover,
    waitHeaderForDisplayedAndClickable,
    waitFooterForDisplayedAndClickable,
    waitNavbarForDisplayedAndClickable,
    waitRegisterElemsForDisplayedAndClickable,
    waitLoginElemsForDisplayedAndClickable,
    waitForgotPasswordElemsForDisplayedAndClickable,
    waitHomepageElemsForDisplayedAndClickable,
    waitViewProductsItemsForDisplayedAndClickable,
    waitProductDetailsItemsForDisplayedAndClickable,
    waitReviewsModalForDisplayedAndClickable,
    waitAccountSidebarForDisplayedAndClickable,
    waitMyAccountPageForDisplayedAndClickable,
    waitAccountInformationPageForDisplayedAndClickable,
    waitAddressBookPageForDisplayedAndClickable,
    waitReviewsPageForDisplayedAndClickable,
    waitNewsletterSubscriptionPageForDisplayedAndClickable,
    typeAndSearch,
    login,
    register,
    interfaceRegister,
    waitPageForLoad,
    waitForDisplayedAndClickable,
    testCommand,
    enterUserAddress,
    shouldReturnBoolean,
    waitCartPageForDisplayedAndClickable,
    waitNewAddressPopupForDisplayedAndClickable,
    enterUserAddressCheckoutPopup,
    loginWithCredentials
}