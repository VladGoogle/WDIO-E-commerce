import Footer from "../../page_objects/footer";
import {randomEmail, randomInvalidEmail} from "../../../src/constants/login.constants";

describe('Footer', () => {

    let testName;
    let fullTestName

    beforeEach(async function()  {
        testName = this.currentTest.title
        fullTestName = this.test.fullTitle()
        await browser.maximizeWindow()
    })

    it('should check footer to be visible and clickable', async () => {
        await browser.url('/')
        await browser.waitFooterForDisplayedAndClickable()
        await browser.checkScreen(`Footer--${testName}`, { /* some options */ })
    });

    it('should redirect to the About Us page', async function () {
        await Footer.aboutUsLink.click()
        await browser.waitPageForLoad()
        await $('aria/About Us')
        await browser.checkFullPageScreen(`Footer--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Customer Service page', async function () {
        await Footer.customerServiceLink.click()
        await browser.waitPageForLoad()
        await $('aria/Customer Service')
        await browser.checkFullPageScreen(`Footer--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Contact Us page', async function () {
        await Footer.contactUsLink.click()
        await browser.waitPageForLoad()
        await $('aria/Contact Us')
        await browser.checkFullPageScreen(`Footer--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Write for us page', async function () {
        await Footer.writeUsLink.click()
        await browser.waitPageForLoad()
        await $('aria/Write For Us')
        await browser.checkFullPageScreen(`Footer--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Search Terms page', async function () {
        await Footer.searchTermsLink.click()
        await browser.waitPageForLoad()
        await $('aria/Popular Search Terms')
        await browser.checkFullPageScreen(`Footer--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Privacy and Cookie policy page', async function () {
        await Footer.privacyPolicyLink.click()
        await browser.waitPageForLoad()
        await $('aria/Privacy Policy')
        await browser.checkFullPageScreen(`Footer--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Advanced Search page', async function () {
        await browser.waitForDisplayedAndClickable(await Footer.advancedSearchLink)
        await Footer.advancedSearchLink.click()
        await browser.waitPageForLoad()
        await $('aria/Advanced Search')
        await browser.checkFullPageScreen(`Footer--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Orders and Returns page', async function () {
        await Footer.ordersAndReturnsLink.click()
        await browser.waitPageForLoad()
        await $('aria/Orders and Returns')
        await browser.checkFullPageScreen(`Footer--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should show required error message for empty email subscribe field', async function () {
        await Footer.subscribeBtn.scrollIntoView({block:"center"})
        await Footer.subscribeBtn.click()
        await browser.waitRequiredErrorForDisplayed(await Footer.newsletterError)
        await browser.checkScreen(`Footer--${testName}`, { /* some options */ })
    });

    it('should show invalid email message for invalid email value', async function () {
        await Footer.newsletterInput.setValue(randomInvalidEmail)
        await Footer.subscribeBtn.click()
        await browser.waitErrorForDisplayed(await Footer.newsletterError, 'Please enter a valid email address (Ex: johndoe@domain.com).')
        await browser.checkScreen(`Footer--${testName}`, { /* some options */ })
    });

    it('should show invalid success message for valid email value', async function () {
        await Footer.newsletterInput.setValue(randomEmail)
        await Footer.subscribeBtn.click()
        await browser.waitPageForLoad()
        await Footer.successMsg.waitForDisplayed()
        await browser.checkElement(await Footer.successMsg,`Footer--${testName}`, { /* some options */ })
    });

})