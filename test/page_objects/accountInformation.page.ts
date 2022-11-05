class AccountInformationPage {

    get firstnameInput() {
        return $('#firstname')
    }

    get lastnameInput() {
        return $('#lastname')
    }

    get changeEmailCheckbox() {
        return $('#change-email')
    }

    get emailInput() {
        return $('#email')
    }

    get currentPasswordInput() {
        return $('#current-password')
    }

    get changePasswordCheckbox() {
        return $('#change-password')
    }

    get newPasswordInput() {
        return $('#password')
    }

    get confirmPasswordInput() {
        return $('#password-confirmation')
    }

    get saveBtn() {
        return $('aria/Save')
    }

    get firstNameError() {
        return $('#firstname-error')
    }

    get lastNameError() {
        return $('#lastname-error')
    }

    get emailError() {
        return $('#email-error')
    }

    get currentPasswordError() {
        return $('#current-password-error')
    }

    get newPasswordError() {
        return $('#password-error')
    }

    get confirmPasswordError() {
        return $('#password-confirmation-error')
    }

    get passwordStrengthMeter() {
        return $('#password-strength-meter')
    }

}

export default new AccountInformationPage()