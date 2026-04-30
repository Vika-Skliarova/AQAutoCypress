class LoginPage {
    selectors = {
        signInButton: '.header_signin',
        emailInput: '#signinEmail',
        passwordInput: '#signinPassword',
        loginButton: '.modal-footer .btn-primary',
        errorMessage: '.modal-body .alert-danger'
    }

    visit() {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
    }

    getSignInButton() {
        return cy.get(this.selectors.signInButton);
    }

    getEmailInput() {
        return cy.get(this.selectors.emailInput);
    }

    getPasswordInput() {
        return cy.get(this.selectors.passwordInput);
    }

    getLoginButton() {
        return cy.get(this.selectors.loginButton);
    }

    getErrorMessage() {
        return cy.get(this.selectors.errorMessage);
    }

    // Actions
    clickSignIn() {
        this.getSignInButton().should('be.visible').click();
    }

    typeEmail(email) {
        this.getEmailInput().clear().type(email);
    }

    typePassword(password) {
        this.getPasswordInput().clear().type(password);
    }

    clickLoginButton() {
        this.getLoginButton().click();
    }

    // Flow
    login(email, password) {
        this.clickSignIn();

        this.typeEmail(email);
        this.typePassword(password);

        this.clickLoginButton();
    }

    // Assertions
    verifyLoginForm() {
        this.getEmailInput().should('be.visible');
        this.getPasswordInput().should('be.visible');
        this.getLoginButton().should('be.visible');
    }

    verifyErrorMessage(text) {
        this.getErrorMessage()
            .should('be.visible')
            .and('contain.text', text);
    }
}

export default new LoginPage();