import Page from "../../page_objects/page";
import LoginPage from "../../page_objects/login.page";
import {headerScreenshotsPath} from "../../../src/constants/filePath.constants";
import {Header} from "../../page_objects/header";
import {Navbar} from "../../page_objects/navbar";
import {randomEmail, randomName, randomPassword, randomSurname} from "../../../src/constants/register.constants";
import {AccountInterfaces} from "../../../src/interfaces/account.interfaces";

describe('Header', () => {

    const header = new Header();
    const navbar = new Navbar(header)
    let testName;
    let fullTestName

    beforeEach(async function()  {
        testName = this.currentTest.title
        fullTestName = this.test.fullTitle()
        await browser.maximizeWindow()
    })

    it('should check header to be visible and clickable', async () => {
        await browser.url('/')
        await browser.waitHeaderForDisplayedAndClickable()
        await browser.waitNavbarForDisplayedAndClickable()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
    })

    it('should disable search button with empty search field', async function () {
        await expect(header.searchBtn).not.toBeClickable()
        await header.searchInput.setValue('a')
        await expect(header.searchBtn).toBeClickable()
        await header.searchInput.moveTo()
        await browser.keys('Backspace')
        await expect(header.searchBtn).not.toBeClickable()
    });


    it('should change color of navbar elems after hover', async function () {
        await browser.checkHeaderHover()
    });

    it('should redirect to the login page', async function () {
        await header.loginLink.click()
        await browser.waitPageForLoad()
        await browser.waitLoginElemsForDisplayedAndClickable()
        await browser.checkFullPageScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the register page', async function () {
        await header.registerLink.click()
        await browser.waitPageForLoad()
        await browser.waitRegisterElemsForDisplayedAndClickable()
        await browser.checkFullPageScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Whats New page', async function () {
        await navbar.newsTab.click()
        await browser.waitPageForLoad()
        await $("aria/What's New").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Women page', async function () {
        await navbar.womanTab.click()
        await browser.waitPageForLoad()
        await $("aria/Women").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Men page', async function () {
        await navbar.menTab.click()
        await browser.waitPageForLoad()
        await $("aria/Men").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Gear page', async function () {
        await navbar.gearTab.click()
        await browser.waitPageForLoad()
        await $("aria/Gear").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Training page', async function () {
        await browser.waitPageForLoad()
        await navbar.trainingTab.click()
        await browser.waitPageForLoad()
        await $("aria/Training").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Sale page', async function () {
        await navbar.saleTab.click()
        await browser.waitPageForLoad()
        await $("aria/Sale").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Women tops page', async function () {
        await navbar.womanTab.moveTo()
        await navbar.womanTopsCategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Women"))
        await $("strong=Tops").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Women bottoms page', async function () {
        await navbar.womanTab.moveTo()
        await navbar.womanBottomsCategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Women"))
        await $("strong=Bottoms").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Men tops page', async function () {
        await navbar.menTab.moveTo()
        await navbar.manTopsCategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Men"))
        await $("strong=Tops").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Men bottoms page', async function () {
        await navbar.menTab.moveTo()
        await navbar.manBottomsCategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Men"))
        await $("strong=Bottoms").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Bags page', async function () {
        await navbar.gearTab.moveTo()
        await navbar.bagsCategory.click()
        await browser.waitPageForLoad()
        await $("strong=Bags").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Fitness equipment page', async function () {
        await navbar.gearTab.moveTo()
        await navbar.fitnessEquipmentCategory.click()
        await browser.waitPageForLoad()
        await $("strong=Fitness Equipment").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Watches page', async function () {
        await navbar.gearTab.moveTo()
        await navbar.watchesCategory.click()
        await browser.waitPageForLoad()
        await $("strong=Watches").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Video Download page', async function () {
        await navbar.trainingTab.moveTo()
        await navbar.videoCategory.click()
        await browser.waitPageForLoad()
        await $("strong=Video Download").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Women Jackets page', async function () {
        await navbar.womanTab.moveTo()
        await navbar.womanTopsCategory.moveTo()
        await navbar.womanJacketsSubcategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Women"))
        await $("strong=Jackets").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Women Hoodies & Sweatshirts page', async function () {
        await navbar.womanTab.moveTo()
        await navbar.womanTopsCategory.moveTo()
        await navbar.womanHoodiesSubcategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Women"))
        await $("strong=Hoodies & Sweatshirts").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Women Tees page', async function () {
        await navbar.womanTab.moveTo()
        await navbar.womanTopsCategory.moveTo()
        await navbar.womanTeesSubcategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Women"))
        await $("strong=Tees").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Women Bras & Tanks page', async function () {
        await navbar.womanTab.moveTo()
        await navbar.womanTopsCategory.moveTo()
        await navbar.womanBrasSubcategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Women"))
        await $("strong=Bras & Tanks").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Women Pants page', async function () {
        await navbar.womanTab.moveTo()
        await navbar.womanBottomsCategory.moveTo()
        await navbar.womanPantsSubcategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Women"))
        await $("strong=Pants").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Women Shorts page', async function () {
        await navbar.womanTab.moveTo()
        await navbar.womanBottomsCategory.moveTo()
        await navbar.womanShortsSubcategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Women"))
        await $("strong=Shorts").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Men Jackets page', async function () {
        await navbar.menTab.moveTo()
        await navbar.manTopsCategory.moveTo()
        await navbar.manJacketsSubcategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Men"))
        await $("strong=Jackets").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Men Hoodies & Sweatshirts page', async function () {
        await navbar.menTab.moveTo()
        await navbar.manTopsCategory.moveTo()
        await navbar.manHoodiesSubcategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Men"))
        await $("strong=Hoodies & Sweatshirts").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Men Tees page', async function () {
        await navbar.menTab.moveTo()
        await navbar.manTopsCategory.moveTo()
        await navbar.manTeesSubcategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Men"))
        await $("strong=Tees").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Men Tanks page', async function () {
        await navbar.menTab.moveTo()
        await navbar.manTopsCategory.moveTo()
        await navbar.manTanksSubcategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Men"))
        await $("strong=Tanks").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Men Pants page', async function () {
        await navbar.menTab.moveTo()
        await navbar.manBottomsCategory.moveTo()
        await navbar.manPantsSubcategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Men"))
        await $("strong=Pants").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Men Shorts page', async function () {
        await navbar.menTab.moveTo()
        await navbar.manBottomsCategory.moveTo()
        await navbar.manShortsSubcategory.click()
        await browser.waitPageForLoad()
        await browser.waitForDisplayedAndClickable(await $("a=Men"))
        await $("strong=Shorts").waitForDisplayed()
        await browser.checkScreen(`Header--${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the My Account page by clicking on header element', async function () {
        const registerBody: AccountInterfaces ={
            firstName: randomName,
            lastName: randomSurname,
            email: randomEmail,
            password: randomPassword,
            confirmPassword: randomPassword
        }

        await header.registerLink.click()
        await browser.waitPageForLoad()
        await browser.interfaceRegister(registerBody)
        await header.headerSwitchArrow.waitForClickable()
        await header.headerSwitchArrow.click()
        await header.headerAccountLink.click()
        await browser.waitPageForLoad()
        await browser.waitMyAccountPageForDisplayedAndClickable()
    });

    it('should redirect to My Wishlist page', async function () {
        await header.headerLogo.click()
        await browser.waitPageForLoad()
        await header.headerSwitchArrow.waitForClickable()
        await header.headerSwitchArrow.click()
        await header.headerWishlistLink.click()
        await browser.waitPageForLoad()
        await $('aria/My Wish List').isDisplayed()
    });

    it('should log out after clicking on sign out ', async function () {
        await header.headerSwitchArrow.waitForClickable()
        await header.headerSwitchArrow.click()
        await header.headerSignOutLink.click()
        await browser.waitPageForLoad()
        await $('aria/You are signed out').waitForDisplayed({timeout:7500,reverse: true})
        await browser.waitPageForLoad()
        await browser.waitHomepageElemsForDisplayedAndClickable()
    });

})