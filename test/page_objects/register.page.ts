
class RegisterPage {


    get registerForm() {
        return $('form.form-create-account')
    }

    get firstNameInput() {
        return $('#firstname')
    }

    get lastNameInput() {
        return $('#lastname')
    }

    get subscribeCheckbox() {
        return $('#is_subscribed')
    }

    get emailInput() {
        return $('#email_address')
    }

    get passwordBlock() {
        return $('div.password')
    }

    get passwordInput() {
        return $('#password')
    }

    get confirmPasswordInput() {
        return $('#password-confirmation')
    }

    get passwordStrengthMeter() {
        return $('#password-strength-meter')
    }

    get submitBtn() {
        return $('[title="Create an Account"]')
    }

    get firstNameError() {
        return $('#firstname-error')
    }

    get lastNameError() {
        return $('#lastname-error')
    }

    get emailError() {
        return $('#email_address-error')
    }

    get passwordError() {
        return $('#password-error')
    }

    get confirmPasswordBlock() {
        return $('div.confirmation')
    }

    get confirmPasswordError() {
        return $('#password-confirmation-error')
    }

}

export default new RegisterPage()