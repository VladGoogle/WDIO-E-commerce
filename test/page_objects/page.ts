/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export class Page {

    get bodyFragment() {
        return $('body')
    }
}

export default new Page()