import {Header} from "../../page_objects/header";
import {Navbar} from "../../page_objects/navbar";
import AccountSidebarPage from "../../page_objects/accountSidebar.page";;
import { faker } from '@faker-js/faker';
import {randomPassword, randomText} from "../../../src/constants/register.constants";
import AddressBookPage from "../../page_objects/addressBook.page";
import {AccountInterfaces, AddressBookInterface} from "../../../src/interfaces/account.interfaces";



describe('Address Book page',  () => {
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


    it('should open Address Book page', async ()=> {
        await AccountSidebarPage.addressBookTab.click()
        await browser.waitPageForLoad()
        await browser.waitAddressBookPageForDisplayedAndClickable()
        await browser.checkTabbablePage(`Account--${testName}`, {})
    });

    it('should autofill firstName and lastName inputs by values in register', async ()=> {
        await expect(AddressBookPage.firstnameInput).toHaveValue(registerBody.firstName)
        await expect(AddressBookPage.lastnameInput).toHaveValue(registerBody.lastName)
    });

    it('should show required errors with empty inputs', async ()=> {
        await AddressBookPage.firstnameInput.setValue('')
        await AddressBookPage.lastnameInput.setValue('')
        await AddressBookPage.countryDropdown.selectByIndex(0)
        await AddressBookPage.saveAddressBtn.click()
        await browser.waitRequiredErrorForDisplayed(await AddressBookPage.firstNameError)
        await browser.waitRequiredErrorForDisplayed(await AddressBookPage.lastNameError)
        await browser.waitRequiredErrorForDisplayed(await AddressBookPage.telephoneError)
        await browser.waitRequiredErrorForDisplayed(await AddressBookPage.streetAddressError)
        await browser.waitRequiredErrorForDisplayed(await AddressBookPage.cityError)
        await browser.waitRequiredErrorForDisplayed(await AddressBookPage.zipError)
        await expect(AddressBookPage.countryError).toHaveText(`Please select an option.`)
        await browser.checkFullPageScreen(`Account--${testName}`, {})
    });

    it('should add new address', async ()=> {

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

        await browser.enterUserAddress(addressBody)
        await AddressBookPage.saveAddressBtn.click()
        await browser.waitPageForLoad()
        await $('aria/You saved the address').isDisplayed()
        await expect(AddressBookPage.addressBlock[0].$('a')).toHaveText(`${addressBody.phone}`)
        await browser.checkFullPageScreen(`Account--${testName}`, {})
    });

    it('should add additional address', async ()=> {

        const additionalAddressBody: AddressBookInterface ={
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

        await AddressBookPage.addNewAddressBtn.click()
        await browser.waitPageForLoad()
        await browser.enterUserAddress(additionalAddressBody)
        await AddressBookPage.saveAddressBtn.click()
        await browser.waitPageForLoad()
        await $('aria/You saved the address').isDisplayed()
        await expect(AddressBookPage.firstNameColumn[0]).toHaveText(`${additionalAddressBody.firstName}`)
        await expect(AddressBookPage.lastNameColumn[0]).toHaveText(`${additionalAddressBody.lastName}`)
        await expect(AddressBookPage.cityColumn[0]).toHaveText(`${additionalAddressBody.city}`)
        await expect(AddressBookPage.countryColumn[0]).toHaveText(`${additionalAddressBody.country}`)
        await expect(AddressBookPage.stateColumn[0]).toHaveText(`${additionalAddressBody.state}`)
        await expect(AddressBookPage.zipColumn[0]).toHaveText(`${additionalAddressBody.zip}`)
        await expect(AddressBookPage.phoneColumn[0]).toHaveText(`${additionalAddressBody.phone}`)
        await browser.checkFullPageScreen(`Account--${testName}`, {})
    });

    it('should replace billing address by clicking primary billing checkbox', async ()=> {

        const billingAddressBody: AddressBookInterface ={
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

        await AddressBookPage.addNewAddressBtn.click()
        await browser.waitPageForLoad()
        await browser.enterUserAddress(billingAddressBody)
        await AddressBookPage.billingCheckbox.click()
        await AddressBookPage.saveAddressBtn.click()
        await browser.waitPageForLoad()
        await $('aria/You saved the address').isDisplayed()
        await expect(AddressBookPage.addressBlock[0].$('a')).toHaveText(`${billingAddressBody.phone}`)
        await browser.checkFullPageScreen(`Account--${testName}`, {})
    });

    it('should replace shipping address by clicking primary shipping checkbox', async ()=> {

        const shippingAddressBody: AddressBookInterface ={
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

        await AddressBookPage.addNewAddressBtn.click()
        await browser.waitPageForLoad()
        await browser.enterUserAddress(shippingAddressBody)
        await AddressBookPage.shippingCheckbox.click()
        await AddressBookPage.saveAddressBtn.click()
        await browser.waitPageForLoad()
        await $('aria/You saved the address').isDisplayed()
        await expect(AddressBookPage.addressBlock[1].$('a')).toHaveText(`${shippingAddressBody.phone}`)
        await browser.checkFullPageScreen(`Account--${testName}`, {})
    });


    it('should change additional address', async ()=> {

        const changeAdditionalAddressBody: AddressBookInterface ={
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

        await AddressBookPage.actionsBlock[0].$('aria/Edit').click()
        await browser.waitPageForLoad()
        await browser.enterUserAddress(changeAdditionalAddressBody)
        await AddressBookPage.saveAddressBtn.click()
        await browser.waitPageForLoad()
        await $('aria/You saved the address').isDisplayed()
        await expect(AddressBookPage.firstNameColumn[0]).toHaveText(`${changeAdditionalAddressBody.firstName}`)
        await expect(AddressBookPage.lastNameColumn[0]).toHaveText(`${changeAdditionalAddressBody.lastName}`)
        await expect(AddressBookPage.cityColumn[0]).toHaveText(`${changeAdditionalAddressBody.city}`)
        await expect(AddressBookPage.countryColumn[0]).toHaveText(`${changeAdditionalAddressBody.country}`)
        await expect(AddressBookPage.stateColumn[0]).toHaveText(`${changeAdditionalAddressBody.state}`)
        await expect(AddressBookPage.zipColumn[0]).toHaveText(`${changeAdditionalAddressBody.zip}`)
        await expect(AddressBookPage.phoneColumn[0]).toHaveText(`${changeAdditionalAddressBody.phone}`)
        await browser.checkFullPageScreen(`Account--${testName}`, {})
    });

    it('should not delete additional address after clicking Cancel button', async ()=> {
        await AddressBookPage.deleteButton[0].click()
        await $('button.action-dismiss').click()
        await browser.waitPageForLoad()
        expect(await AddressBookPage.tableRows.length).toEqual(3)
    });

    it('should delete additional address after clicking OK button', async ()=> {
        await AddressBookPage.deleteButton[0].click()
        await $('aria/OK').click()
        await browser.waitPageForLoad()
        await AddressBookPage.deleteButton[0].click()
        await $('aria/OK').click()
        await browser.waitPageForLoad()
        expect(await AddressBookPage.tableRows.length).toEqual(0)
    });


})