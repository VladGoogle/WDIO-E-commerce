
class LoginPage {

    get emailInput() {
        return $('#email')
    }

    get passwordInput() {
        return $('#pass')
    }

    get forgotPasswordLink() {
        return $('a[class="action remind"]')
    }

    get submitBtn() {
        return $('#send2')
    }

    get registerLink() {
        return $('a[class="action create primary"]')
    }

    get emailError() {
        return $('#email-error')
    }

    get passwordError() {
        return $('#pass-error')
    }

    get incorrectSignInError() {
        return $('div*=The account sign-in was incorrect or your account is disabled temporarily.')
    }

    get captchaImg() {
        return $('.captcha-img')
    }

    get captchaInput() {
        return $('#captcha_user_login')
    }

    get reloadCaptchaBtn() {
        return $('button.captcha-reload')
    }
}

export default new LoginPage()