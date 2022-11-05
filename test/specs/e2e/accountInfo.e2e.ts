import {Header} from "../../page_objects/header";
import {Navbar} from "../../page_objects/navbar";
import AccountSidebarPage from "../../page_objects/accountSidebar.page";;
import { faker } from '@faker-js/faker';
import {
    randomConfirmPassword,
    randomEmail,
    randomInvalidEmail, randomMediumPassword, randomMinClassesInvalidPassword,
    randomMinInvalidPassword, randomName,
    randomPassword, randomStrongestPassword, randomStrongPassword, randomSurname,
    randomText
} from "../../../src/constants/register.constants";
import AddressBookPage from "../../page_objects/addressBook.page";
import {AccountInterfaces, AddressBookInterface} from "../../../src/interfaces/account.interfaces";
import AccountInformationPage from "../../page_objects/accountInformation.page";
import RegisterPage from "../../page_objects/register.page";



describe('Account Info page',  () => {
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


    it('should open Account Info page', async ()=> {
        await AccountSidebarPage.accountInfoTab.click()
        await browser.waitPageForLoad()
        await browser.waitAccountInformationPageForDisplayedAndClickable()
        await browser.checkTabbablePage(`Account--${testName}`, {})
    });

    it('should autofill firstName, lastName and  inputs by values in register', async ()=> {
        await AccountInformationPage.changeEmailCheckbox.click()
        await expect(AccountInformationPage.firstnameInput).toHaveValue(registerBody.firstName)
        await expect(AccountInformationPage.lastnameInput).toHaveValue(registerBody.lastName)
        await expect(AccountInformationPage.emailInput).toHaveValue(registerBody.email)
    });

    it('should show required errors', async ()=> {
        await AccountInformationPage.firstnameInput.clearValue()
        await AccountInformationPage.lastnameInput.clearValue()
        await AccountInformationPage.emailInput.clearValue()
        await AccountInformationPage.changePasswordCheckbox.click()
        await AccountInformationPage.saveBtn.click()
        await browser.waitRequiredErrorForDisplayed(await AccountInformationPage.firstNameError)
        await browser.waitRequiredErrorForDisplayed(await AccountInformationPage.lastNameError)
        await browser.waitRequiredErrorForDisplayed(await AccountInformationPage.emailError)
        await browser.waitRequiredErrorForDisplayed(await AccountInformationPage.currentPasswordError)
        await browser.waitRequiredErrorForDisplayed(await AccountInformationPage.newPasswordError)
        await browser.waitRequiredErrorForDisplayed(await AccountInformationPage.confirmPasswordError)
        await browser.checkFullPageScreen(`Account--${testName}`, {})
    });

    it('should show invalid email address error', async ()=> {
        await AccountInformationPage.changePasswordCheckbox.click()
        await AccountInformationPage.firstnameInput.setValue(registerBody.firstName)
        await AccountInformationPage.lastnameInput.setValue(registerBody.lastName)
        await AccountInformationPage.emailInput.setValue(randomInvalidEmail)
        await AccountInformationPage.saveBtn.click()
        await expect(AccountInformationPage.emailError).toHaveText('Please enter a valid email address.')
        await browser.checkScreen(`Account--${testName}`, {})
    });

    it('should show invalid current password error', async ()=> {
        const pass = faker.internet.password(11, false, /[a-zA-Z0-9]/)

        await AccountInformationPage.changeEmailCheckbox.click()
        await AccountInformationPage.changePasswordCheckbox.click()
        await AccountInformationPage.currentPasswordInput.setValue(faker.internet.password(8))
        await AccountInformationPage.newPasswordInput.setValue(pass)
        await AccountInformationPage.confirmPasswordInput.setValue(pass)
        await AccountInformationPage.saveBtn.click()
        await browser.waitPageForLoad()
        await expect($(`div.message-error`).$('div')).toHaveText("The password doesn't match this account. Verify the password and try again.")
        await browser.checkScreen(`Account--${testName}`, {})
    });

    it('should show invalid min new password error', async ()=> {
        await AccountInformationPage.changePasswordCheckbox.click()
        await AccountInformationPage.currentPasswordInput.setValue(randomPassword)
        await AccountInformationPage.newPasswordInput.setValue(randomMinInvalidPassword)
        await AccountInformationPage.confirmPasswordInput.setValue(randomMinInvalidPassword)
        await $('aria/Minimum length of this field must be equal or greater than 8 symbols.').isDisplayed()
        const hexColor = await browser.rgbToHex(await browser.getBeforePseudoElementBackgroundColor('#password-strength-meter'))
        expect(hexColor).toEqual('#ffafae')
        await expect(AccountInformationPage.passwordStrengthMeter).toHaveText('Password Strength: Weak')
        await browser.checkScreen( `Account--${testName}`, { /* some options */ })
    });

    it('should show invalid min classes new password error', async ()=> {
        await AccountInformationPage.newPasswordInput.setValue(randomMinClassesInvalidPassword)
        await AccountInformationPage.confirmPasswordInput.setValue(randomMinClassesInvalidPassword)
        await $('aria/Minimum of different classes of characters in password is 3.').isDisplayed()
        const hexColor = await browser.rgbToHex(await browser.getBeforePseudoElementBackgroundColor('#password-strength-meter'))
        expect(hexColor).toEqual('#ffafae')
        await expect(AccountInformationPage.passwordStrengthMeter).toHaveText('Password Strength: Weak')
        await browser.checkScreen( `Account--${testName}`, { /* some options */ })
    });

    it('should change color and show medium strength with 8 long password ', async ()=> {
        await AccountInformationPage.newPasswordInput.setValue(randomMediumPassword)
        const hexColor = await browser.rgbToHex(await browser.getBeforePseudoElementBackgroundColor('#password-strength-meter'))
        expect(hexColor).toEqual('#ffd6b3')
        await expect(AccountInformationPage.passwordStrengthMeter).toHaveText('Password Strength: Medium')
        await browser.checkScreen( `Account--${testName}`, { /* some options */ })
    });

    it('should change color and show strong strength with 9 long password ', async ()=> {
        await AccountInformationPage.newPasswordInput.setValue(randomStrongPassword)
        const hexColor = await browser.rgbToHex(await browser.getBeforePseudoElementBackgroundColor('#password-strength-meter'))
        expect(hexColor).toEqual('#c5eeac')
        await expect(AccountInformationPage.passwordStrengthMeter).toHaveText('Password Strength: Strong')
        await browser.checkScreen( `Account--${testName}`, { /* some options */ })
    });

    it('should change color and show very strong strength with 11 long password ', async ()=> {
        await AccountInformationPage.newPasswordInput.setValue(randomStrongestPassword)
        const hexColor = await browser.rgbToHex(await browser.getBeforePseudoElementBackgroundColor('#password-strength-meter'))
        expect(hexColor).toEqual('#81b562')
        await expect(AccountInformationPage.passwordStrengthMeter).toHaveText('Password Strength: Very Strong')
        await browser.checkScreen( `Account--${testName}`, { /* some options */ })
    });

    it('should show confirm password error with different passwords', async ()=> {
        await AccountInformationPage.newPasswordInput.setValue(randomStrongestPassword)
        await AccountInformationPage.confirmPasswordInput.setValue(faker.internet.password(8))
        await AccountInformationPage.saveBtn.click()
        await $('aria/Please enter the same value again.').isDisplayed()
        await browser.checkScreen (`Account--${testName}`, { /* some options */ })
    });


})