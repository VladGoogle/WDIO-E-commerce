
class HomePage {

    get homeMainBlock() {
        return $('a.home-main')
    }

    get homeMainBtn() {
        return $('span=Shop New Yoga')
    }

    get homePantsBlock() {
        return $('a.home-pants')
    }

    get homeShirtsBlock() {
        return $('a.home-t-shirts')
    }

    get homeErinBlock() {
        return $('a.home-erin')
    }

    get homePerformanceBlock() {
        return $('a.home-performance')
    }

    get homeEcoBlock() {
        return $('a.home-eco')
    }

    get firstItemProduct() {
        return $('//*[@id="maincontent"]/div[3]/div/div[2]/div[3]/div/div/ol/li[1]')
    }

    get secondItemProduct() {
        return $('//*[@id="maincontent"]/div[3]/div/div[2]/div[3]/div/div/ol/li[2]')
    }

    get thirdItemProduct() {
        return $('//*[@id="maincontent"]/div[3]/div/div[2]/div[3]/div/div/ol/li[3]')
    }

    get fourthItemProduct() {
        return $('//*[@id="maincontent"]/div[3]/div/div[2]/div[3]/div/div/ol/li[4]')
    }

    get fifthItemProduct() {
        return $('//*[@id="maincontent"]/div[3]/div/div[2]/div[3]/div/div/ol/li[5]')
    }

    get sixItemProduct() {
        return $('//*[@id="maincontent"]/div[3]/div/div[2]/div[3]/div/div/ol/li[6]')
    }

    get itemsTitle() {
        return $('h2[class="title"]')
    }
    get itemsList() {
        return $$('.product-item')
    }

    get firstAddCartBtn() {
        return $('li:nth-child(1)').$('button.tocart')
    }

    async hoverAndShowButtons() {
        let i = 1
        const arr = await this.itemsList

        for (const item of arr) {
            await item.moveTo()
            if(i>=3){
                //"Add to cart" button
                await browser.waitForDisplayedAndClickable(await  $(`//*[@id="maincontent"]/div[3]/div/div[2]/div[3]/div/div/ol/li[${i}]/div/div/div[3]/div/div[1]/form/button`))
                //"Add to wishlist" button
                await browser.waitForDisplayedAndClickable(await  $(`//*[@id="maincontent"]/div[3]/div/div[2]/div[3]/div/div/ol/li[${i}]/div/div/div[3]/div/div[2]/a[1]`))
                //"Add to compare" button
                await browser.waitForDisplayedAndClickable(await  $(`//*[@id="maincontent"]/div[3]/div/div[2]/div[3]/div/div/ol/li[${i}]/div/div/div[3]/div/div[2]/a[2]`))
            } else {
                //"Add to cart" button
                await browser.waitForDisplayedAndClickable(await  $(`//*[@id="maincontent"]/div[3]/div/div[2]/div[3]/div/div/ol/li[${i}]/div/div/div[4]/div/div[1]/form/button`))
                //"Add to wishlist" button
                await browser.waitForDisplayedAndClickable(await  $(`//*[@id="maincontent"]/div[3]/div/div[2]/div[3]/div/div/ol/li[${i}]/div/div/div[4]/div/div[2]/a[1]`))
                //"Add to compare" button
                await browser.waitForDisplayedAndClickable(await  $(`//*[@id="maincontent"]/div[3]/div/div[2]/div[3]/div/div/ol/li[${i}]/div/div/div[4]/div/div[2]/a[2]`))
            }
            // await browser.waitForDisplayedAndClickable(await this.addWishlistBtn)
            // await browser.waitForDisplayedAndClickable(await this.addCompareBtn)
            i++
            await browser.pause(500)
        }
    }
}

export default new HomePage()