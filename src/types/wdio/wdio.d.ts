import {waitForgotPasswordElemsForDisplayedAndClickable} from "../../../test/commands";
import {AccountInterfaces, AddressBookInterface} from "../../interfaces/account.interfaces";

export {}

declare global {
    namespace WebdriverIO {
        interface Browser {
            takeFullPageScreenshot:(options:{}) => Promise<void>;
            elemHasClass: (selector: WebdriverIO.Element, className: string) => Promise<void>;
            elemHasColor: (selector: WebdriverIO.Element, color: string) => Promise<void>;
            rgbToHex:(val: string) => Promise<string>;
            getBeforePseudoElementColor:(text: string) => Promise<string>;
            getBeforePseudoElementBackgroundColor:(text: string) => Promise<string>;
            hoverAndCheckColor: (elem: WebdriverIO.Element, colorVal: string)=> Promise<void>;
            hoverAndCheckBackgroundColor: (elem: WebdriverIO.Element, colorVal: string)=> Promise<void>;
            checkHeaderHover:()=> Promise<void>;
            waitForDisplayedAndClickable:(elem: WebdriverIO.Element) => Promise<void>;
            waitErrorForDisplayed:(elem: WebdriverIO.Element, text:string) => Promise<void>;
            waitRequiredErrorForDisplayed:(elem: WebdriverIO.Element) => Promise<void>;
            waitCabinetSidebarForDisplayedAndClickable:() => Promise<void>;
            waitHeaderForDisplayedAndClickable: () => Promise<void>;
            waitFooterForDisplayedAndClickable: () => Promise<void>;
            waitNavbarForDisplayedAndClickable: () => Promise<void>;
            waitRegisterElemsForDisplayedAndClickable:() => Promise<void>;
            waitLoginElemsForDisplayedAndClickable:() => Promise<void>;
            waitForgotPasswordElemsForDisplayedAndClickable:() => Promise<void>;
            waitHomepageElemsForDisplayedAndClickable:() => Promise<void>;
            waitViewProductsItemsForDisplayedAndClickable:() => Promise<void>;
            waitProductDetailsItemsForDisplayedAndClickable:() => Promise<void>;
            checkSortingPriceByAscending:(arr: WebdriverIO.Element[]) => Promise<void>;
            checkSortingPriceByDescending:(arr: WebdriverIO.Element[]) => Promise<void>;
            checkSortingNameByAscending:(arr: WebdriverIO.Element[]) => Promise<void>;
            checkSortingNameByDescending:(arr: WebdriverIO.Element[]) => Promise<void>;
            waitReviewsModalForDisplayedAndClickable:() => Promise<void>;
            waitAccountSidebarForDisplayedAndClickable:() => Promise<void>;
            waitMyAccountPageForDisplayedAndClickable:() => Promise<void>;
            waitAccountInformationPageForDisplayedAndClickable:() => Promise<void>;
            waitAddressBookPageForDisplayedAndClickable:() => Promise<void>;
            waitReviewsPageForDisplayedAndClickable:() => Promise<void>;
            waitNewsletterSubscriptionPageForDisplayedAndClickable:() => Promise<void>;
            checkLoginElemsToBeVisible: () => Promise<void>;
            typeAndSearch:(query:string)=> Promise<void>;
            waitPageForLoad:()=> Promise<void>;
            login:()=>Promise<void>;
            register:()=>Promise<void>;
            interfaceRegister:(obj: AccountInterfaces) => Promise<void>;
            enterUserAddress:(obj: AddressBookInterface) => Promise<void>
            shouldReturnBoolean:(element: WebdriverIO.Element) => Promise<boolean>
            waitCartPageForDisplayedAndClickable:() => Promise<void>
            waitNewAddressPopupForDisplayedAndClickable:() => Promise<void>
            enterUserAddressCheckoutPopup:(obj: AddressBookInterface) => Promise<void>
            loginWithCredentials:(email: string, password: string) => Promise<void>
        }
    }
}