class ProductsPage {

    get productsTitle() {
        return $('.base')
    }

    get gridViewBtn() {
        return $('[title="Grid"]')
    }

    get listViewBtn() {
        return $('[title="List"]')
    }

    get toolbarAmountText() {
        return $('#toolbar-amount')
    }

    get sorterDropdown() {
        return $('#sorter')
    }

    get sorterArrow() {
        return $('a.sorter-action')
    }

    get productItems() {
        return $$('//*[@id="maincontent"]/div[3]/div[1]/div[3]/ol/li/div/div/strong/a')
    }


    get productNames() {
        return $$('//*[@id="maincontent"]/div[3]/div[1]/div[3]/ol/li/div/div/strong/a')
    }

    get productPrices() {
        return $$('.price')
    }

    get addToWishlistButton() {
        return $$('a.towishlist')
    }

    get itemsLimiter() {
        return $('/html/body/div[2]/main/div[3]/div[1]/div[4]/div[3]/div/select')
    }

    get paginationBlock() {
        return $('ul.pages-items')
    }

    get pageItems() {
        return this.paginationBlock.$$('li[class="item"], li.current')
    }

    get nextBtn() {
        return $$('a.next')[1]
    }

    get prevBtn() {
        return $$('a.previous')[1]
    }

    get categoryDropdown() {
        return $('div=Category')
    }

    get styleDropdown() {
        return $('div=Style')
    }

    get sizeDropdown() {
        return $('div=Size')
    }

    get priceDropdown() {
        return $('div=Price')
    }

    get colorDropdown() {
        return $('div=Color')
    }

    get materialDropdown() {
        return $('div=Material')
    }

    get ecoDropdown() {
        return $('div=Eco Collection')
    }

    get performanceDropdown() {
        return $('div=Performance Fabric')
    }

    get erinDropdown() {
        return $('div=Erin Recommends')
    }

    get newDropdown() {
        return $('div=New')
    }

    get saleDropdown() {
        return $('div=Sale')
    }

    get patternDropdown() {
        return $('div=Pattern')
    }

    get climateDropdown() {
        return $('div=Climate')
    }

    get filterClearBtn() {
        return $('.filter-clear')
    }

    get activeFilterBlock() {
        return $('.filter-current')
    }

    get filterItems() {
        return this.activeFilterBlock.$$('.item')
    }

    get removeFilterBtn() {
        return $$('a.remove')
    }

    get productsColorPanel() {
        return $$('//*[@id="maincontent"]/div[3]/div[1]/div[3]/ol/li/div/div/div[3]/div[2]/div')
    }

    get blackColorOption() {
        return $('a[aria-label="Black"]').$('div')
    }

    get blueColorOption() {
        return $('a[aria-label="Blue"]').$('div')
    }

    get brownColorOption() {
        return $('a[aria-label="Brown"]').$('div')
    }

    get greyColorOption() {
        return $('a[aria-label="Gray"]').$('div')
    }

    get greenColorOption() {
        return $('a[aria-label="Green"]').$('div')
    }

    get orangeColorOption() {
        return $('a[aria-label="Orange"]').$('div')
    }

    get purpleColorOption() {
        return $('a[aria-label="Purple"]').$('div')
    }

    get redColorOption() {
        return $('a[aria-label="Red"]').$('div')
    }

    get whiteColorOption() {
        return $('a[aria-label="White"]').$('div')
    }

    get yellowColorOption() {
        return $('a[aria-label="Yellow"]').$('div')
    }

    get productsSizePanel() {
        return $$('aria/Size')
    }

    get xsSizeOption() {
        return $('a[aria-label="XS"]').$('div')
    }

    get sSizeOption() {
        return $('a[aria-label="S"]').$('div')
    }

    get mSizeOption() {
        return $('a[aria-label="M"]').$('div')
    }

    get lSizeOption() {
        return $('a[aria-label="L"]').$('div')
    }

    get xlSizeOption() {
        return $('a[aria-label="XL"]').$('div')
    }
}

export default new ProductsPage()