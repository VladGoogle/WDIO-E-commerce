import {Header} from "./header";

export class Navbar {
    constructor(private header: Header) {
    }

    get newsTab() {
        return this.header.navBar.$('li.nav-1')
    }

    get womanTab() {
        return this.header.navBar.$('li.nav-2')
    }

    get menTab() {
        return this.header.navBar.$('li.nav-3')
    }

    get gearTab() {
        return this.header.navBar.$('li.nav-4')
    }

    get trainingTab() {
        return this.header.navBar.$('li.nav-5')
    }

    get saleTab() {
        return this.header.navBar.$('li.nav-6')
    }

    get womanTopsCategory() {
        return this.header.navBar.$('#ui-id-9')
    }

    get womanBottomsCategory() {
        return this.header.navBar.$('#ui-id-10')
    }

    get womanJacketsSubcategory() {
        return this.header.navBar.$('#ui-id-11')
    }

    get womanHoodiesSubcategory() {
        return this.header.navBar.$('#ui-id-12')
    }

    get womanTeesSubcategory() {
        return this.header.navBar.$('#ui-id-13')
    }

    get womanBrasSubcategory() {
        return this.header.navBar.$('#ui-id-14')
    }

    get womanPantsSubcategory() {
        return this.header.navBar.$('#ui-id-15')
    }

    get womanShortsSubcategory() {
        return this.header.navBar.$('#ui-id-16')
    }

    get manTopsCategory() {
        return this.header.navBar.$('#ui-id-17')
    }

    get manBottomsCategory() {
        return this.header.navBar.$('#ui-id-18')
    }

    get manJacketsSubcategory() {
        return this.header.navBar.$('#ui-id-19')
    }

    get manHoodiesSubcategory() {
        return this.header.navBar.$('#ui-id-20')
    }

    get manTeesSubcategory() {
        return this.header.navBar.$('#ui-id-21')
    }

    get manTanksSubcategory() {
        return this.header.navBar.$('#ui-id-22')
    }

    get manPantsSubcategory() {
        return this.header.navBar.$('#ui-id-23')
    }

    get manShortsSubcategory() {
        return this.header.navBar.$('#ui-id-24')
    }

    get bagsCategory() {
        return this.header.navBar.$('#ui-id-25')
    }

    get fitnessEquipmentCategory() {
        return this.header.navBar.$('#ui-id-26')
    }

    get watchesCategory() {
        return this.header.navBar.$('#ui-id-27')
    }

    get videoCategory() {
        return this.header.navBar.$('#ui-id-28')
    }

}
