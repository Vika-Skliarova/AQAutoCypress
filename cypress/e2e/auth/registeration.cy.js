import RegistrationPage from '../../pages/RegistrationPage';
import {user} from '../../fixtures/users';

describe('Registration tests', () => {

    beforeEach(() => {
        RegistrationPage.visit();
        RegistrationPage.clickSignUp();
    });

    it('Check registration form is opened', () => {
        RegistrationPage.verifyRegistrationPage();
    });

    it('Check registration button is disabled by default', () => {
        RegistrationPage.checkRegistrationButtonDisabled();
    });

    it('Success registration', () => {
        RegistrationPage.registration(
            user.standardUser.name,
            user.standardUser.lastName,
            user.standardUser.email,
            user.standardUser.password,
        )
    });

//Validation tests
     it('Check empty fields validation', () => {
        RegistrationPage.getUserNameInput().click().blur();
        RegistrationPage.getUserLastnameInput().click().blur();
        RegistrationPage.getEmailInput().click().blur();
        RegistrationPage.getPasswordInput().click().blur();
        RegistrationPage.getRepeatPasswordInput().click().blur();

        RegistrationPage.checkErrorMessage('Name required');
        RegistrationPage.checkErrorMessage('Last name required');
        RegistrationPage.checkErrorMessage('Email required');
        RegistrationPage.checkErrorMessage('Password required');
        RegistrationPage.checkErrorMessage('Re-enter password required');

        RegistrationPage.checkRegistrationButtonDisabled();
    });

    it('Check name and last name validation (too short/long)', () => {
        RegistrationPage.typeUserName(user.invalidUser.name);
        RegistrationPage.typeUserLastname(user.invalidUser.lastName);
        RegistrationPage.typeEmail(user.standardUser.email);
        RegistrationPage.typePassword(user.standardUser.password);
        RegistrationPage.typeRepeatPassword(user.standardUser.password);

        RegistrationPage.checkErrorMessage('Name has to be from 2 to 20 characters long');
        RegistrationPage.checkErrorMessage('Last name has to be from 2 to 20 characters long');

        RegistrationPage.checkRedBorder(RegistrationPage.selectors.userNameInput);
        RegistrationPage.checkRedBorder(RegistrationPage.selectors.userLastnameInput);

        RegistrationPage.checkRegistrationButtonDisabled();
    });

    it('Check name and last name validation (with spaces)', () => {
        RegistrationPage.typeUserName(user.withSpacesUser.name);
        RegistrationPage.typeUserLastname(user.withSpacesUser.lastName);
        RegistrationPage.typeEmail(user.standardUser.email);
        RegistrationPage.typePassword(user.standardUser.password);
        RegistrationPage.typeRepeatPassword(user.standardUser.password);

        RegistrationPage.checkErrorMessage('Name is invalid');
        RegistrationPage.checkErrorMessage('Last name is invalid');

        RegistrationPage.checkRedBorder(RegistrationPage.selectors.userNameInput);
        RegistrationPage.checkRedBorder(RegistrationPage.selectors.userLastnameInput);

        RegistrationPage.checkRegistrationButtonDisabled();
    });

    it('Check invalid email', () => {
        RegistrationPage.typeUserName(user.standardUser.name);
        RegistrationPage.typeUserLastname(user.standardUser.lastName);
        RegistrationPage.typeEmail(user.invalidUser.email);
        RegistrationPage.typePassword(user.standardUser.password);
        RegistrationPage.typeRepeatPassword(user.standardUser.password);

        RegistrationPage.checkErrorMessage('Email is incorrect');
        RegistrationPage.checkRedBorder(RegistrationPage.selectors.emailInput);
        RegistrationPage.checkRegistrationButtonDisabled();
    });

    it('Check invalid password', () => {
        RegistrationPage.typeUserName(user.standardUser.name);
        RegistrationPage.typeUserLastname(user.standardUser.lastName);
        RegistrationPage.typeEmail(user.standardUser.email);
        RegistrationPage.typePassword(user.invalidUser.password);
        RegistrationPage.typeRepeatPassword(user.invalidUser.password);

        RegistrationPage.checkErrorMessage(
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        );

        RegistrationPage.checkRedBorder(RegistrationPage.selectors.passwordInput);
        RegistrationPage.checkRegistrationButtonDisabled();
    });

    it('Check password mismatch', () => {
        RegistrationPage.typeUserName(user.standardUser.name);
        RegistrationPage.typeUserLastname(user.standardUser.lastName);
        RegistrationPage.typeEmail(user.standardUser.email);
        RegistrationPage.typePassword(user.standardUser.password);
        RegistrationPage.typeRepeatPassword('Different123A');

        RegistrationPage.getRepeatPasswordInput().blur();

        RegistrationPage.checkErrorMessage('Passwords do not match');
        RegistrationPage.checkRedBorder(RegistrationPage.selectors.repeatPasswordInput);
        RegistrationPage.checkRegistrationButtonDisabled();
    });

});