import HomePage from "../../page_objects/home.page";
import {Header} from "../../page_objects/header";
const header = new Header()



describe('Homepage', () => {

    let testName;
    let fullTestName

    beforeEach(async function()  {
        testName = this.currentTest.title
        fullTestName = this.test.fullTitle()
        await browser.maximizeWindow()
    })


    it('should check homepage elements to be visible and clickable', async () => {
        await browser.url('/')
        await browser.waitPageForLoad()
        await browser.waitHomepageElemsForDisplayedAndClickable()
        await browser.checkFullPageScreen(`${testName}`, { /* some options */ })
    });


    it('should show additional buttons after hover on product item', async ()=>{
        await $('[title="Push It Messenger Bag"]').scrollIntoView({block:"end"})
        await HomePage.hoverAndShowButtons()
    })

    it('should redirect to the Yoga collection page ', async function () {
        await HomePage.homeMainBlock.scrollIntoView({block:"end"})
        await HomePage.homeMainBlock.click()
        await browser.waitPageForLoad()
        await $('span=New Luma Yoga Collection').waitForDisplayed()
        await browser.checkFullPageScreen(`${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Pants page ', async function () {
        await HomePage.homePantsBlock.scrollIntoView({block:"center"})
        await HomePage.homePantsBlock.click()
        await browser.waitPageForLoad()
        await $('.base').waitForDisplayed()
        await browser.checkFullPageScreen(`${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Tees page', async function () {
        await HomePage.homeShirtsBlock.scrollIntoView({block:"center"})
        await HomePage.homeShirtsBlock.click()
        await browser.waitPageForLoad()
        await $('.base').waitForDisplayed()
        await browser.checkFullPageScreen(`${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Erin recommends page', async function () {
        await HomePage.homeErinBlock.scrollIntoView({block:"center"})
        await HomePage.homeErinBlock.click()
        await browser.waitPageForLoad()
        await $('.base').waitForDisplayed()
        await browser.checkFullPageScreen(`${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Performance Fabrics page', async function () {
        await HomePage.homePerformanceBlock.scrollIntoView({block:"center"})
        await HomePage.homePerformanceBlock.click()
        await browser.waitPageForLoad()
        await $('.base').waitForDisplayed()
        await browser.checkFullPageScreen(`${testName}`, { /* some options */ })
        await browser.back()
    });

    it('should redirect to the Eco Friendly page', async function () {
        await HomePage.homeEcoBlock.scrollIntoView({block:"center"})
        await HomePage.homeEcoBlock.click()
        await browser.waitPageForLoad()
        await $('.base').waitForDisplayed()
        await browser.checkFullPageScreen(`${testName}`, { /* some options */ })
        await browser.back()
    });



})