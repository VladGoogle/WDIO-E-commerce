class AddressBookPage {

    get firstnameInput() {
        return $('#firstname')
    }

    get lastnameInput() {
        return $('#lastname')
    }

   get companyInput() {
        return $('#company')
   }

    get phoneInput() {
        return $('#telephone')
    }

    get streetAddressInput() {
        return $('input[title="Street Address"]')
    }

    get firstAdditionalStreetAddressInput() {
        return $('input[title="Street Address: Line 2"]')
    }

    get secondAdditionalStreetAddressInput() {
        return $('input[title="Street Address: Line 3"]')
    }

    get cityInput() {
        return $('#city')
    }

    get regionDropdown() {
        return $('#region_id')
    }

    get regionInput() {
        return $('#region')
    }

    get zipInput() {
        return $('#zip')
    }

    get countryDropdown() {
        return $('#country')
    }

    get saveAddressBtn() {
        return $('aria/Save Address')
    }

    get firstNameError() {
        return $('#firstname-error')
    }

    get lastNameError() {
        return $('#lastname-error')
    }

    get telephoneError() {
        return $('#telephone-error')
    }

    get streetAddressError() {
        return $('#street_1-error')
    }

    get cityError() {
        return $('#city-error')
    }

    get zipError() {
        return $('#zip-error')
    }

    get countryError() {
        return $('#country-error')
    }

    get addressBlock() {
        return $$('address')
    }

    get billingCheckbox() {
        return $('#primary_billing')
    }

    get shippingCheckbox() {
        return $('#primary_shipping')
    }

    get addNewAddressBtn() {
        return $('button[title="Add New Address"]')
    }

    get tableRows() {
        return $$('tr')
    }

    get firstNameColumn() {
        return $$('td.firstname')
    }

    get lastNameColumn() {
        return $$('td.lastname')
    }

    get addressColumn() {
        return $$('td.streetaddress')
    }

    get cityColumn() {
        return $$('td.city')
    }

    get countryColumn() {
        return $$('td.country')
    }

    get stateColumn() {
        return $$('td.state')
    }

    get zipColumn() {
        return $$('td.zip')
    }

    get phoneColumn() {
        return $$('td.phone')
    }

    get actionsBlock() {
        return $$('td.actions')
    }

    get deleteButton() {
        return $$('a[role="delete-address"]')
    }

}

export default new AddressBookPage()