import {Header} from "../../page_objects/header";
import LoginPage from "../../page_objects/login.page";
import {
    passwordForLogin,
    randomInvalidEmail,
    emailForLogin, randomInvalidPassword
} from "../../../src/constants/login.constants";


describe('Login page', () => {

    let testName;
    let fullTestName
    const header = new Header()

    beforeEach(async function()  {
        testName = this.currentTest.title
        fullTestName = this.test.fullTitle()
        await browser.maximizeWindow()
    })


    it('should check login page elements to be visible and clickable', async () => {
        await browser.url('/')
        await header.loginLink.click()
        await browser.waitPageForLoad()
        await browser.waitLoginElemsForDisplayedAndClickable()
        await browser.checkScreen(`Login--${testName}`, {})
    });
    

    it('should redirect to the register page', async () => {
        await LoginPage.registerLink.click()
        await browser.waitPageForLoad()
        await browser.waitRegisterElemsForDisplayedAndClickable()
        await browser.checkScreen(`Login--${testName}`, {})
    });

    it('should  redirect to the forgot password page', async ()=> {
        await header.loginLink.click()
        await browser.waitLoginElemsForDisplayedAndClickable()
        await LoginPage.forgotPasswordLink.click()
        await browser.waitForgotPasswordElemsForDisplayedAndClickable()
        await browser.checkScreen(`Login--${testName}`, {})
    });

    it('should show required errors on empty fields', async () => {
        await header.loginLink.click()
        await LoginPage.submitBtn.click()
        await browser.waitRequiredErrorForDisplayed(await LoginPage.emailError)
        await browser.waitRequiredErrorForDisplayed(await LoginPage.passwordError)
        await browser.checkScreen(`Login--${testName}`, {})
    });

    it('should show invalid error on invalid email input', async function() {
        await browser.loginWithCredentials(randomInvalidEmail, passwordForLogin)
        await browser.waitErrorForDisplayed(await LoginPage.emailError, 'Please enter a valid email address (Ex: johndoe@domain.com).')
        await browser.checkScreen(`Login--${testName}`, {})
    });

    it('should show incorrect sign-in with invalid email and invalid password', async function() {
        await browser.loginWithCredentials(randomInvalidEmail, randomInvalidPassword)
        await browser.waitPageForLoad()
        await browser.waitErrorForDisplayed(await LoginPage.emailError, 'Please enter a valid email address (Ex: johndoe@domain.com).')
        await browser.checkScreen(`Login--${testName}`, {})
    });

    it('should show incorrect sign-in with valid email and invalid password', async function() {
        await browser.loginWithCredentials(emailForLogin, randomInvalidPassword)
        await browser.waitPageForLoad()
        await LoginPage.incorrectSignInError.waitForDisplayed()
        await browser.checkScreen(`Login--${testName}`, {})
    });

    it('should login and redirect to the account page', async function () {
        await browser.loginWithCredentials(emailForLogin, passwordForLogin)
        await browser.waitPageForLoad()
        await browser.waitMyAccountPageForDisplayedAndClickable()
    });



})