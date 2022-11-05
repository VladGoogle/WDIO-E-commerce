import Page from "../../page_objects/page";
import {registerScreenshotsPath} from "../../../src/constants/filePath.constants";
import {Header} from "../../page_objects/header";
import RegisterPage from "../../page_objects/register.page";
import {
    randomConfirmPassword,
    randomEmail, randomInvalidEmail, randomMediumPassword, randomMinClassesInvalidPassword,
    randomMinInvalidPassword,
    randomName,
    randomPassword, randomStrongestPassword, randomStrongPassword,
    randomSurname
} from "../../../src/constants/register.constants";
import {AccountInterfaces} from "../../../src/interfaces/account.interfaces";
import {faker} from "@faker-js/faker";
import HomePage from "../../page_objects/home.page";
import CheckoutPage from "../../page_objects/checkout.page";

describe('Register page', () => {

    let testName;
    let fullTestName
    const header = new Header()

    beforeEach(async function()  {
        testName = this.currentTest.title
        fullTestName = this.test.fullTitle()
        await browser.maximizeWindow()
    })

    it('should check register page to be visible and clickable', async function ()  {
        await browser.url('/')
        await header.registerLink.click()
        await browser.waitPageForLoad()
        await browser.waitRegisterElemsForDisplayedAndClickable()
        await browser.checkFullPageScreen( `Register--${testName}`, { /* some options */ })
    });

    it('should click on news checkbox', async function () {
        await RegisterPage.subscribeCheckbox.click()
        await expect(RegisterPage.subscribeCheckbox).toBeChecked()
        await RegisterPage.subscribeCheckbox.click()
        await expect(RegisterPage.subscribeCheckbox).not.toBeChecked()
    });

    it('should show required errors on empty fields', async function () {
        await RegisterPage.submitBtn.click()
        await browser.waitRequiredErrorForDisplayed(await RegisterPage.firstNameError)
        await browser.waitRequiredErrorForDisplayed(await RegisterPage.lastNameError)
        await browser.waitRequiredErrorForDisplayed(await RegisterPage.emailError)
        await browser.waitRequiredErrorForDisplayed(await RegisterPage.passwordError)
        await browser.waitRequiredErrorForDisplayed(await RegisterPage.confirmPasswordError)
        await browser.checkElement(await RegisterPage.registerForm,`Register--${testName}`, { /* some options */ })
    });


    it('should show invalid email error on email field', async function () {
        const registerBody: AccountInterfaces ={
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: randomInvalidEmail,
            password: randomPassword,
            confirmPassword: randomPassword
        }
        await browser.interfaceRegister(registerBody)
        await browser.waitErrorForDisplayed(await RegisterPage.emailError, 'Please enter a valid email address (Ex: johndoe@domain.com).')
        await RegisterPage.emailError.scrollIntoView({block: "center"})
        await browser.checkScreen(`Register--${testName}`, { /* some options */ })
    });

    it('should show invalid min password error on password field', async function () {
        const registerBody: AccountInterfaces ={
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: randomMinInvalidPassword,
            confirmPassword: randomMinInvalidPassword
        }
        await browser.interfaceRegister(registerBody)
        await browser.waitErrorForDisplayed(await RegisterPage.passwordError, 'Minimum length of this field must be equal or greater than 8 symbols.')
        const hexColor = await browser.rgbToHex(await browser.getBeforePseudoElementBackgroundColor('#password-strength-meter'))
        await expect(hexColor).toEqual('#ffafae')
        await expect(RegisterPage.passwordStrengthMeter).toHaveText('Password Strength: Weak')
        await browser.checkElement(await RegisterPage.passwordBlock, `Register--${testName}`, { /* some options */ })
    });

    it('should show invalid min classes password error on password field', async function () {
        const registerBody: AccountInterfaces ={
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: randomMinClassesInvalidPassword,
            confirmPassword: randomMinClassesInvalidPassword
        }
        await browser.interfaceRegister(registerBody)
        await browser.waitErrorForDisplayed(await RegisterPage.passwordError, 'Minimum of different classes of characters in password is 3.')
        const hexColor = await browser.rgbToHex(await browser.getBeforePseudoElementBackgroundColor('#password-strength-meter'))
        await expect(hexColor).toEqual('#ffafae')
        await expect(RegisterPage.passwordStrengthMeter).toHaveText('Password Strength: Weak')
        await browser.checkElement(await RegisterPage.passwordBlock, `Register--${testName}`, { /* some options */ })
    });


    it('should show confirm password error with different passwords', async function () {
        const registerBody: AccountInterfaces ={
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: randomPassword,
            confirmPassword: randomConfirmPassword
        }
        await browser.interfaceRegister(registerBody)
        await browser.waitErrorForDisplayed(await RegisterPage.confirmPasswordError, 'Please enter the same value again.')
        await browser.checkElement(await RegisterPage.confirmPasswordBlock, `Register--${testName}`, { /* some options */ })
    });


    it('should change color and show medium strength with 8 long password ', async function () {
        await RegisterPage.passwordInput.setValue(randomMediumPassword)
        const hexColor = await browser.rgbToHex(await browser.getBeforePseudoElementBackgroundColor('#password-strength-meter'))
        await expect(hexColor).toEqual('#ffd6b3')
        await expect(RegisterPage.passwordStrengthMeter).toHaveText('Password Strength: Medium')
        await browser.checkElement(await RegisterPage.passwordBlock, `Register--${testName}`, { /* some options */ })
    });


    it('should change color and show strong strength with 9 long password ', async function () {
        await RegisterPage.passwordInput.setValue(randomStrongPassword)
        const hexColor = await browser.rgbToHex(await browser.getBeforePseudoElementBackgroundColor('#password-strength-meter'))
        await expect(hexColor).toEqual('#c5eeac')
        await expect(RegisterPage.passwordStrengthMeter).toHaveText('Password Strength: Strong')
        await browser.checkElement(await RegisterPage.passwordBlock, `Register--${testName}`, { /* some options */ })
    });


    it('should change color and show very strong strength with 11 long password ', async function () {
        await RegisterPage.passwordInput.setValue(randomStrongestPassword)
        const hexColor = await browser.rgbToHex(await browser.getBeforePseudoElementBackgroundColor('#password-strength-meter'))
        await expect(hexColor).toEqual('#81b562')
        await expect(RegisterPage.passwordStrengthMeter).toHaveText('Password Strength: Very Strong')
        await browser.checkElement(await RegisterPage.passwordBlock, `Register--${testName}`, { /* some options */ })
    });


    it('should register user and redirect him to the account page', async function () {
        const registerBody: AccountInterfaces ={
            firstName: randomName,
            lastName: randomSurname,
            email: randomEmail,
            password: randomPassword,
            confirmPassword: randomPassword
        }
        await browser.interfaceRegister(registerBody)
        await browser.waitPageForLoad()
        await browser.waitMyAccountPageForDisplayedAndClickable()
        await browser.checkFullPageScreen( `Register--${testName}`, { /* some options */ })
    });

    it('should login user with newly registered credentials', async function () {
        await header.headerSwitchArrow.click()
        await header.headerSignOutLink.click()
        await browser.waitPageForLoad()
        await $('aria/You are signed out').waitForDisplayed({timeout:7500,reverse: true})
        await browser.waitPageForLoad()
        await browser.waitHomepageElemsForDisplayedAndClickable()
        await expect(header.notLoggedInWelcomeMsg).toBeDisplayed()
        await header.registerLink.isClickable()
        await header.loginLink.isClickable()
        await header.loginLink.click()
        await browser.waitPageForLoad()
        await browser.loginWithCredentials(randomEmail, randomPassword)
        await browser.waitPageForLoad()
        await browser.waitUntil(
            async () => await header.headerSwitchArrow.isClickable(),
            {
                timeout: 6 * 1000, // 6 seconds
                timeoutMsg: 'Message on failure'
            }
        );
        await browser.waitUntil(
            async () => await header.loggedInWelcomeMsg.isDisplayed(),
            {
                timeout: 3 * 1000, // 3 seconds
                timeoutMsg: 'Message on failure'
            }
        );
        await expect(header.registerLink).not.toBeDisplayed()
        await expect(header.loginLink).not.toBeDisplayed()
    });


})