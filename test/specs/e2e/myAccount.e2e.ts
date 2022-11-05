import {Header} from "../../page_objects/header";
import {Navbar} from "../../page_objects/navbar";
import AccountPage from "../../page_objects/account.page";
import AccountInformationPage from "../../page_objects/accountInformation.page";
import {
    randomEmail,
    randomName,
    randomNewPassword,
    randomPassword,
    randomSurname
} from "../../../src/constants/register.constants";
import {
    ChangeAccountInfoInterface,
    ChangePasswordInfoInterface,
    AccountInterfaces
} from "../../../src/interfaces/account.interfaces";
import LoginPage from "../../page_objects/login.page";
import HomePage from "../../page_objects/home.page";
import { faker } from '@faker-js/faker';
import AccountSidebarPage from "../../page_objects/accountSidebar.page";



describe('Account page',  () => {
    let testName;
    let fullTestName
    const header = new Header()
    const navbar = new Navbar(header)

    const registerBody: AccountInterfaces ={
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: randomPassword,
        confirmPassword: randomPassword
    }

    const changeBody: ChangeAccountInfoInterface ={
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: randomPassword,
    }


    before(async ()=>{
        await browser.url('/')
        await header.registerLink.click()
        await browser.waitPageForLoad()
        await browser.interfaceRegister(registerBody)
        await browser.waitPageForLoad()
    })

    beforeEach(async function () {
        testName = this.currentTest.title
        fullTestName = this.test.fullTitle()
        await browser.maximizeWindow()
    })


    it('should show account page My Account after registration', async function () {
        await browser.waitAccountSidebarForDisplayedAndClickable()
        await browser.waitMyAccountPageForDisplayedAndClickable()
        await browser.checkTabbablePage(`Account--${testName}`, {})
    });

    it('should open Account Info tab by clicking on Contact Info Edit button', async function () {
        await AccountPage.accountEditLink.click()
        await browser.waitPageForLoad()
        await browser.waitAccountInformationPageForDisplayedAndClickable()
        await browser.checkTabbablePage(`Account--${testName}`, {})
    });

    it('should open Account Info tab with active change password checkbox', async function () {
        await browser.back()
        await browser.waitPageForLoad()
        await AccountPage.changePasswordLink.click()
        await browser.waitPageForLoad()
        await browser.waitAccountInformationPageForDisplayedAndClickable()

        await expect(AccountInformationPage.changePasswordCheckbox).toBeChecked()
        await expect(AccountInformationPage.currentPasswordInput).toBeDisplayed()
        await expect(AccountInformationPage.newPasswordInput).toBeDisplayed()
        await expect(AccountInformationPage.confirmPasswordInput).toBeDisplayed()

        await browser.checkTabbablePage(`Account--${testName}`, {})
    });

    it('should open Newsletter Subscription by clicking on Newsletter edit button', async ()=> {
        await browser.back()
        await browser.waitPageForLoad()
        await AccountPage.newsletterEditLink.click()
        await browser.waitPageForLoad()
        await browser.waitNewsletterSubscriptionPageForDisplayedAndClickable()
        await browser.checkTabbablePage(`Account--${testName}`, {})
    });

    it('should open Address Book tab by clicking on Default Billing_&_Shipping address edit button', async function () {
        await browser.back()
        await browser.waitPageForLoad()
        await AccountPage.editBillingAddressLink.click()
        await browser.waitPageForLoad()
        await browser.waitAddressBookPageForDisplayedAndClickable()
        await browser.back()
        await browser.waitPageForLoad()
        await AccountPage.editShippingAddressLink.click()
        await browser.waitPageForLoad()
        await browser.waitAddressBookPageForDisplayedAndClickable()
        await browser.checkTabbablePage(`Account--${testName}`, {})
    });

    it('should open My Reviews page by clicking View All button', async function () {
        await browser.back()
        await browser.waitPageForLoad()
        await AccountPage.viewReviewsLink.click()
        await browser.waitPageForLoad()
        await expect($('span=My Product Reviews')).toBeDisplayed()
        await browser.checkTabbablePage(`Account--${testName}`, {})
    });

    it('should replace initials and email of the user', async function () {

        let welcomeText = await header.loggedInWelcomeMsg.getText()
        expect(welcomeText).toEqual(`Welcome, ${registerBody.firstName} ${registerBody.lastName}!`)
        await browser.checkElement(await header.loggedInWelcomeMsg,`Account--${testName}`, {})

        await AccountSidebarPage.myAccountTab.click()
        await browser.waitPageForLoad()
        await AccountPage.accountEditLink.click()
        await browser.waitPageForLoad()

        await AccountInformationPage.firstnameInput.setValue(changeBody.firstName)
        await AccountInformationPage.lastnameInput.setValue(changeBody.lastName)
        await AccountInformationPage.changeEmailCheckbox.click()
        await AccountInformationPage.emailInput.setValue(changeBody.email)
        await AccountInformationPage.currentPasswordInput.setValue(changeBody.password)
        await AccountInformationPage.saveBtn.click()

        await browser.waitPageForLoad()
        expect(await $('aria/You saved the account information')).toBeDisplayed()
        await browser.loginWithCredentials(changeBody.email, registerBody.password)
        await browser.waitPageForLoad()
        await browser.waitMyAccountPageForDisplayedAndClickable()
        await browser.waitUntil(
            async () => await header.loggedInWelcomeMsg.isDisplayed(),
            {
                timeout: 5 * 1000,
                timeoutMsg: 'Message on failure'
            }
        );

        welcomeText = await header.loggedInWelcomeMsg.getText()
        expect(welcomeText).not.toEqual(`Welcome, ${registerBody.firstName} ${registerBody.lastName}!`)
        expect(welcomeText).toEqual(`Welcome, ${changeBody.firstName} ${changeBody.lastName}!`)
        await browser.checkElement(await header.loggedInWelcomeMsg,`Account--${testName}`, {})
    });

    it('should replace password of the user', async function () {

        const changePasswordBody: ChangePasswordInfoInterface ={
            currentPassword: randomPassword,
            newPassword: randomNewPassword,
            confirmPassword: randomNewPassword
        }

        await AccountPage.changePasswordLink.click()
        await AccountInformationPage.currentPasswordInput.setValue(changePasswordBody.currentPassword)
        await AccountInformationPage.newPasswordInput.setValue(changePasswordBody.newPassword)
        await AccountInformationPage.confirmPasswordInput.setValue(changePasswordBody.confirmPassword)
        await AccountInformationPage.saveBtn.click()

        await browser.waitPageForLoad()
        await $('aria/You saved the account information').isDisplayed()
        await browser.loginWithCredentials(changeBody.email, changePasswordBody.newPassword)
        await browser.waitPageForLoad()
        await browser.waitMyAccountPageForDisplayedAndClickable()
    });


})