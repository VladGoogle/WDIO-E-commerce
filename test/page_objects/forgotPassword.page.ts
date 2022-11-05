
class ForgotPasswordPage {

    get emailInput() {
        return $('#email_address')
    }

    get captchaInput() {
        return $('#captcha_user_forgotpassword')
    }

    get reloadCaptchaBtn() {
        return $('button.captcha-reload')
    }

    get submitBtn() {
        return $('button.submit')
    }

    get emailError() {
        return $('#email_address-error')
    }

    get captchaError() {
        return $('#captcha_user_forgotpassword-error')
    }

}

export default new ForgotPasswordPage()