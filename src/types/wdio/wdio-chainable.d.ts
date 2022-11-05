import 'webdriverio'

declare global {
    namespace WebdriverIO {
        interface ChainablePromiseElement {
            testCommand: (this: WebdriverIO.Element) => Promise<void>;
        }
    }
}