import {Header} from "../../page_objects/header";
import {Navbar} from "../../page_objects/navbar";
import ProductsPage from "../../page_objects/products.page";
import Footer from "../../page_objects/footer";

describe('View products', () => {

    let testName;
    let fullTestName
    const header = new Header()
    const navbar = new Navbar(header)

    beforeEach(async function () {
        testName = this.currentTest.title
        fullTestName = this.test.fullTitle()
        await browser.maximizeWindow()
    })

    it('should check view product elements to be visible and clickable', async () => {
        await browser.url('/')
        await navbar.womanTab.moveTo()
        await navbar.womanTopsCategory.click()
        await browser.waitPageForLoad()
        await browser.waitViewProductsItemsForDisplayedAndClickable()
        await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
    });

    it('should change the display type to list type and vice versa', async () => {
        await ProductsPage.listViewBtn.click()
        await browser.waitPageForLoad()
        await expect(ProductsPage.listViewBtn).toHaveElementClassContaining('active')
        await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
        await ProductsPage.gridViewBtn.click()
        await browser.waitPageForLoad()
        await expect(ProductsPage.gridViewBtn).toHaveElementClassContaining('active')
        await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
    });

    it('should show 12 items per page', async () => {
        const arr = await ProductsPage.pageItems
        let productArr = await ProductsPage.productItems
        await expect(productArr.length).toEqual(12)
        await Footer.footerBlock.scrollIntoView({block: "end"})
    });

    it('should show 24 items per page', async () => {
        await ProductsPage.itemsLimiter.selectByVisibleText('24')
        await browser.waitPageForLoad()
        let productArr = await ProductsPage.productItems
        await expect(productArr.length).toEqual(24)
        await Footer.footerBlock.scrollIntoView({block: "end"})
    });

    it('should show 36 items per page', async () => {
        await ProductsPage.itemsLimiter.selectByVisibleText('36')
        await browser.waitPageForLoad()
        let productArr = await ProductsPage.productItems
        await expect(productArr.length).toEqual(36)
        await Footer.footerBlock.scrollIntoView({block: "end"})

    });

    it('should sort items by price ascending', async () => {
        await ProductsPage.itemsLimiter.selectByVisibleText('12')
        await browser.waitPageForLoad()
        await ProductsPage.sorterDropdown.selectByVisibleText('Price')
        await browser.waitPageForLoad()
        const arr = await ProductsPage.pageItems
        for(let i=0;i<=arr.length;i++) {
            await browser.checkSortingPriceByAscending(await ProductsPage.productPrices)
            await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
            await Footer.footerBlock.scrollIntoView({block:"end"})
            if(arr[i+1] === undefined) {
                break
            } else {
                await ProductsPage.nextBtn.click()
                await browser.waitPageForLoad()
            }
        }
    });


    it('should sort items by price descending', async () => {
        await ProductsPage.sorterArrow.click()
        await browser.waitPageForLoad()
        const arr = await ProductsPage.pageItems
        for(let i=0;i<=arr.length;i++) {
            await browser.checkSortingPriceByDescending(await ProductsPage.productPrices)
            await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
            await Footer.footerBlock.scrollIntoView({block:"end"})
            if(arr[i+1] === undefined) {
                break
            } else {
                await ProductsPage.prevBtn.click()
                await browser.waitPageForLoad()
            }
        }
    })


    it('should sort items by name ascending', async () => {
        await ProductsPage.sorterDropdown.selectByVisibleText('Product Name')
        await ProductsPage.sorterArrow.click()
        await browser.waitPageForLoad()
        const arr = await ProductsPage.pageItems
        for(let i=0;i<=await ProductsPage.pageItems.length;i++) {
            await browser.checkSortingNameByAscending(await ProductsPage.productNames)
            await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
            await Footer.footerBlock.scrollIntoView({block:"end"})
            if(arr[i+1] === undefined) {
                break
            } else {
                await ProductsPage.nextBtn.click()
                await browser.waitPageForLoad()
            }
        }
    })


    it('should sort items by name descending', async () => {
        await ProductsPage.sorterArrow.click()
        await browser.waitPageForLoad()
        const arr = await ProductsPage.pageItems
        for(let i=0;i<=arr.length;i++) {
            await browser.checkSortingNameByDescending(await ProductsPage.productNames)
            await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
            await Footer.footerBlock.scrollIntoView({block:"end"})
            if(arr[i-1] === undefined) {
                break
            } else {
                await ProductsPage.prevBtn.click()
                await browser.waitPageForLoad()
            }
        }
    })

    it('should remove each filter by clicking cross button', async function ()  {
        await ProductsPage.priceDropdown.click()
        await $('a[href*="20-30"]').click()
        await browser.waitPageForLoad()
        await ProductsPage.colorDropdown.click()
        await ProductsPage.blueColorOption.click()
        await browser.waitPageForLoad()
        await ProductsPage.sizeDropdown.click()
        await ProductsPage.lSizeOption.click()
        await browser.waitPageForLoad()
        await expect(ProductsPage.priceDropdown).not.toBeClickable()
        await expect(ProductsPage.colorDropdown).not.toBeClickable()
        await expect(ProductsPage.sizeDropdown).not.toBeClickable()
        await ProductsPage.colorDropdown.isClickable()
        await ProductsPage.sizeDropdown.isClickable()
        await expect(await ProductsPage.filterItems.length).toEqual(3)
        await ProductsPage.removeFilterBtn[0].click()
        await browser.waitPageForLoad()
        await expect(await ProductsPage.filterItems.length).toEqual(2)
        await ProductsPage.removeFilterBtn[0].click()
        await browser.waitPageForLoad()
        await expect(await ProductsPage.filterItems.length).toEqual(1)
        await ProductsPage.removeFilterBtn[0].click()
        await browser.waitPageForLoad()
        await ProductsPage.priceDropdown.isClickable()
        await ProductsPage.colorDropdown.isClickable()
        await ProductsPage.sizeDropdown.isClickable()
    })


    it('should remove all filters by clicking Clear All button', async function () {
        await ProductsPage.priceDropdown.click()
        await $('a[href*="20-30"]').click()
        await browser.waitPageForLoad()
        await ProductsPage.colorDropdown.click()
        await ProductsPage.blueColorOption.click()
        await browser.waitPageForLoad()
        await ProductsPage.sizeDropdown.click()
        await ProductsPage.lSizeOption.click()
        await browser.waitPageForLoad()
        await expect(ProductsPage.priceDropdown).not.toBeClickable()
        await expect(ProductsPage.colorDropdown).not.toBeClickable()
        await expect(ProductsPage.sizeDropdown).not.toBeClickable()
        await expect(await ProductsPage.filterItems.length).toEqual(3)
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.priceDropdown.isClickable()
        await ProductsPage.colorDropdown.isClickable()
        await ProductsPage.sizeDropdown.isClickable()
    })


    it('should show products in range $20.00-$29.00', async () => {
        await ProductsPage.itemsLimiter.selectByVisibleText('36')
        await browser.waitPageForLoad()
        await ProductsPage.priceDropdown.click()
        await $('a[href*="20-30"]').click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productPrices) {
            const value = parseFloat((await item.getText()).substring(1))
            await expect(value).toBeGreaterThanOrEqual(20.00)
            await expect(value).toBeLessThanOrEqual(29.99)
        }
    })

    it('should show products in range $30.00-$39.99', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.priceDropdown.click()
        await $('a[href*="30-40"]').click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productPrices) {
            const value = parseFloat((await item.getText()).substring(1))
            await expect(value).toBeGreaterThanOrEqual(30.00)
            await expect(value).toBeLessThanOrEqual(39.99)
        }
    })

    it('should show products in range $40.00-$49.99', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.priceDropdown.click()
        await $('a[href*="40-50"]').click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productPrices) {
            const value = parseFloat((await item.getText()).substring(1))
            await expect(value).toBeGreaterThanOrEqual(40.00)
            await expect(value).toBeLessThanOrEqual(49.99)
        }
    })

    it('should show products in range $50.00-$59.99', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.priceDropdown.click()
        await $('a[href*="50-60"]').click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productPrices) {
            const value = parseFloat((await item.getText()).substring(1))
            await expect(value).toBeGreaterThanOrEqual(50.00)
            await expect(value).toBeLessThanOrEqual(59.99)
        }
    })

    it('should show products in range $60.00-$69.99', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.priceDropdown.click()
        await $('a[href*="60-70"]').click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productPrices) {
            const value = parseFloat((await item.getText()).substring(1))
            await expect(value).toBeGreaterThanOrEqual(60.00)
            await expect(value).toBeLessThanOrEqual(69.99)
        }
    })

    it('should show products in range $70.00-$79.99', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.priceDropdown.click()
        await $('a[href*="70-80"]').click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productPrices) {
            const value = parseFloat((await item.getText()).substring(1))
            await expect(value).toBeGreaterThanOrEqual(70.00)
            await expect(value).toBeLessThanOrEqual(79.99)
        }
    })

    it('should show products in range $80.00 and above', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.priceDropdown.click()
        await $('a[href*="80-"]').click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productPrices) {
            const value = parseFloat((await item.getText()).substring(1))
            await expect(value).toBeGreaterThanOrEqual(80.00)
        }
    })

    it('should show products with black color variation', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.colorDropdown.click()
        await ProductsPage.blackColorOption.click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productsColorPanel) {
            await browser.waitForDisplayedAndClickable(await item.$('[option-label="Black"]'))
            await expect(await item.$('[option-label="Black"]')).toHaveAttr('aria-checked', 'true')
        }
        await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
    })

    it('should show products with brown color variation', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.colorDropdown.click()
        await ProductsPage.brownColorOption.click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productsColorPanel) {
            await browser.waitForDisplayedAndClickable(await item.$('[option-label="Brown"]'))
            await expect(await item.$('[option-label="Brown"]')).toHaveAttr('aria-checked', 'true')
        }
        await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
    })

    it('should show products with blue color variation', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.colorDropdown.click()
        await ProductsPage.blueColorOption.click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productsColorPanel) {
            await browser.waitForDisplayedAndClickable(await item.$('[option-label="Blue"]'))
            await expect(await item.$('[option-label="Blue"]')).toHaveAttr('aria-checked', 'true')
        }
        await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
    })

    it('should show products with grey color variation', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.colorDropdown.click()
        await ProductsPage.greyColorOption.click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productsColorPanel) {
            await browser.waitForDisplayedAndClickable(await item.$('[option-label="Gray"]'))
            await expect(await item.$('[option-label="Gray"]')).toHaveAttr('aria-checked', 'true')
        }
        await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
    })

    it('should show products with green color variation', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.colorDropdown.click()
        await ProductsPage.greenColorOption.click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productsColorPanel) {
            await browser.waitForDisplayedAndClickable(await item.$('[option-label="Green"]'))
            await expect(await item.$('[option-label="Green"]')).toHaveAttr('aria-checked', 'true')
        }
        await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
    })

    it('should show products with orange color variation', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.colorDropdown.click()
        await ProductsPage.orangeColorOption.click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productsColorPanel) {
            await browser.waitForDisplayedAndClickable(await item.$('[option-label="Orange"]'))
            await expect(await item.$('[option-label="Orange"]')).toHaveAttr('aria-checked', 'true')
        }
        await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
    })

    it('should show products with purple color variation', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.colorDropdown.click()
        await ProductsPage.purpleColorOption.click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productsColorPanel) {
            await browser.waitForDisplayedAndClickable(await item.$('[option-label="Purple"]'))
            await expect(await item.$('[option-label="Purple"]')).toHaveAttr('aria-checked', 'true')
        }
        await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
    })

    it('should show products with red color variation', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.colorDropdown.click()
        await ProductsPage.redColorOption.click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productsColorPanel) {
            await browser.waitForDisplayedAndClickable(await item.$('[option-label="Red"]'))
            await expect(await item.$('[option-label="Red"]')).toHaveAttr('aria-checked', 'true')
        }
        await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
    })

    it('should show products with white color variation', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.colorDropdown.click()
        await ProductsPage.whiteColorOption.click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productsColorPanel) {
            await browser.waitForDisplayedAndClickable(await item.$('[option-label="White"]'))
            await expect(await item.$('[option-label="White"]')).toHaveAttr('aria-checked', 'true')
        }
        await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
    })


    it('should show products with yellow color variation', async () => {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.colorDropdown.click()
        await ProductsPage.yellowColorOption.click()
        await browser.waitPageForLoad()
        for(const item of await ProductsPage.productsColorPanel) {
            await browser.waitForDisplayedAndClickable(await item.$('[option-label="Yellow"]'))
            await expect(await item.$('[option-label="Yellow"]')).toHaveAttr('aria-checked', 'true')
        }
            await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
    })

    it('should show products with XS size', async function () {
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.itemsLimiter.selectByVisibleText('36')
        await browser.waitPageForLoad()
        await ProductsPage.sizeDropdown.click()
        await ProductsPage.xsSizeOption.click()
        await browser.waitPageForLoad()
        const arr = await ProductsPage.pageItems
        for (let i=0;i<=arr.length; i++) {
            for(const item of await ProductsPage.productsSizePanel) {
                await browser.waitForDisplayedAndClickable(await item.$('aria/XS'))
                await expect(item.$('aria/XS')).toHaveAttr('aria-checked', 'true')
            }
            await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
            if(arr[i+1] === undefined) {
                break
            } else {
                await ProductsPage.nextBtn.click()
                await browser.waitPageForLoad()
            }
        }
    })

    it('should show products with S size', async function ()  {
        await browser.back()
        await browser.waitPageForLoad()
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.sizeDropdown.click()
        await ProductsPage.sSizeOption.click()
        await browser.waitPageForLoad()
        const arr = await ProductsPage.pageItems
        for (let i=0;i<=await ProductsPage.pageItems.length; i++) {
            for(const item of await ProductsPage.productsSizePanel) {
                await browser.waitForDisplayedAndClickable(await item.$('aria/S'))
                await expect(item.$('aria/S')).toHaveAttr('aria-checked', 'true')
            }
            await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
            if(arr[i+1] === undefined) {
                break
            } else {
                await ProductsPage.nextBtn.click()
                await browser.waitPageForLoad()
            }
        }
    })

    it('should show products with M size', async function ()  {
        await browser.back()
        await browser.waitPageForLoad()
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.sizeDropdown.click()
        await ProductsPage.mSizeOption.click()
        await browser.waitPageForLoad()
        const arr = await ProductsPage.pageItems
        for (let i=0;i<=arr.length; i++) {
            for(const item of await ProductsPage.productsSizePanel) {
                await browser.waitForDisplayedAndClickable(await item.$('aria/M'))
                await expect(item.$('aria/M')).toHaveAttr('aria-checked', 'true')
            }
            await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
            if(arr[i+1] === undefined) {
                break
            } else {
                await ProductsPage.nextBtn.click()
                await browser.waitPageForLoad()
            }
        }
    })

    it('should show products with L size', async function () {
        await browser.back()
        await browser.waitPageForLoad()
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.sizeDropdown.click()
        await ProductsPage.lSizeOption.click()
        await browser.waitPageForLoad()
        const arr = await ProductsPage.pageItems
        for (let i=0;i<=arr.length; i++) {
            for(const item of await ProductsPage.productsSizePanel) {
                await browser.waitForDisplayedAndClickable(await item.$('aria/L'))
                await expect(item.$('aria/L')).toHaveAttr('aria-checked', 'true')
            }
            await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
            if(arr[i+1] === undefined) {
                break
            } else {
                await ProductsPage.nextBtn.click()
                await browser.waitPageForLoad()
            }
        }
    })

    it('should show products with XL size', async () => {
        await browser.back()
        await browser.waitPageForLoad()
        await ProductsPage.filterClearBtn.click()
        await browser.waitPageForLoad()
        await ProductsPage.sizeDropdown.click()
        await ProductsPage.xlSizeOption.click()
        await browser.waitPageForLoad()
        const arr = await ProductsPage.pageItems
        for (let i=0;i<=arr.length; i++) {
            for(const item of await ProductsPage.productsSizePanel) {
                await browser.waitForDisplayedAndClickable(await item.$('aria/XL'))
                await expect(item.$('aria/XL')).toHaveAttr('aria-checked', 'true')
            }
            await browser.checkFullPageScreen(`ViewProducts--${testName}`, { /* some options */})
            if(arr[i+1] === undefined) {
                break
            } else {
                await ProductsPage.nextBtn.click()
                await browser.waitPageForLoad()
            }
        }
    })


})