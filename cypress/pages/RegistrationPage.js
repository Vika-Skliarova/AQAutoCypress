class RegistrationPage {
    selectors = {
        buttonSignUp: '.hero-descriptor_btn',
        formTitle: '.modal-title',
        userNameInput: '#signupName',
        userLastnameInput: '#signupLastName',
        emailInput: '#signupEmail',
        passwordInput: '#signupPassword',
        repeatPasswordInput: '#signupRepeatPassword',
        registrationButton: '.modal-footer .btn-primary',
        errorMessage: '.invalid-feedback p',
        errorBorder: '.is-invalid'  
    }

// Navigation
    visit() {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
    }

    clickSignUp() {
       cy.get(this.selectors.buttonSignUp).should('be.visible').click();
    }

    clickRegistrationButton() {
        cy.get(this.selectors.registrationButton).click();
    }


// Getters
    getFormTitle() {
        return cy.get(this.selectors.formTitle);
    }

    getUserNameInput() {
        return cy.get(this.selectors.userNameInput);
    }

    getUserLastnameInput() {
        return cy.get(this.selectors.userLastnameInput);
    }

    getEmailInput() {
        return cy.get(this.selectors.emailInput);
    }

    getPasswordInput() {
        return cy.get(this.selectors.passwordInput);
    }

    getRepeatPasswordInput() {
        return cy.get(this.selectors.repeatPasswordInput);
    }

    getRegistrationButton() {
        return cy.get(this.selectors.registrationButton);
    }

// Actions (input)
    typeUserName(name) {
        this.getUserNameInput().clear().type(name.trim());
    }

    typeUserLastname(lastName) {
        this.getUserLastnameInput().clear().type(lastName);
    }

    typeEmail(email) {
        this.getEmailInput().clear().type(email);
    }

    typePassword(password) {
        this.getPasswordInput().clear().type(password);
    }

    typeRepeatPassword(password) {
        this.getRepeatPasswordInput().clear().type(password);
    }

// Flow 
    registration(name, lastName, email, password) {
        this.typeUserName(name);
        this.typeUserLastname(lastName);
        this.typeEmail(email);
        this.typePassword(password);
        this.typeRepeatPassword(password);
        this.clickRegistrationButton();
    }

    checkRegistrationButtonDisabled() {
        this.getRegistrationButton().should('be.disabled');
    }

    verifyRegistrationPage() {
        this.getFormTitle()
            .should('be.visible')
            .and('contain.text', 'Registration');
        this.getUserNameInput().should('be.visible');
        this.getUserLastnameInput().should('be.visible');
        this.getEmailInput().should('be.visible');
        this.getPasswordInput().should('be.visible');
        this.getRepeatPasswordInput().should('be.visible');
        this.getRegistrationButton().should('be.visible');
    }

    checkErrorMessage(text) {
        cy.get(this.selectors.errorMessage)
            .should('be.visible')
            .and('contain.text', text);
    }

    checkRedBorder(inputSelector) {
        cy.get(inputSelector)
            .should('have.css', 'border-color', 'rgb(220, 53, 69)');
    }
}

export default new RegistrationPage();