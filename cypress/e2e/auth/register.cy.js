import RegisterPage from '../../pages/RegisterPage.js';
import {user} from '../../fixtures/users';

describe('Registration tests', () => {
    beforeEach(() => {
        RegisterPage.visit();
        RegisterPage.clickSignUp();
    });

    it('Check registration form is opened', () => {
        RegisterPage.verifyRegisterPage();
    });

    it('Check register button is disabled by default', () => {
        RegisterPage.checkRegisterButtonDisabled();
    });

    it('Positiv registration', () => {
        RegisterPage.register(
            user.standardUser.name,
            user.standardUser.lastName,
            user.standardUser.email,
            user.standardUser.password,
        )
    });

     it('Check empty fields validation', () => {
        // нічого не вводимо

        RegisterPage.getUserNameInput().click().blur();
        RegisterPage.getUserLastnameInput().click().blur();
        RegisterPage.getEmailInput().click().blur();
        RegisterPage.getPasswordInput().click().blur();
        RegisterPage.getRepeatPasswordInput().click().blur();

        RegisterPage.checkErrorMessage('Name required');
        RegisterPage.checkErrorMessage('Last name required');
        RegisterPage.checkErrorMessage('Email required');
        RegisterPage.checkErrorMessage('Password required');
        RegisterPage.checkErrorMessage('Re-enter password required');

        RegisterPage.checkRegisterButtonDisabled();
    });

    it('Check invalid name (too short)', () => {
        RegisterPage.typeUserName(user.invalidUser.name);
        RegisterPage.typeUserLastname(user.standardUser.lastName);
        RegisterPage.typeEmail(user.standardUser.email);
        RegisterPage.typePassword(user.standardUser.password);
        RegisterPage.typeRepeatPassword(user.standardUser.password);

        RegisterPage.checkErrorMessage('Name has to be from 2 to 20 characters long');
        RegisterPage.checkRedBorder(RegisterPage.selectors.userNameInput);
        RegisterPage.checkRegisterButtonDisabled();
    });

    it('Check invalid last name (too short)', () => {
        RegisterPage.typeUserName(user.standardUser.name);
        RegisterPage.typeUserLastname(user.invalidUser.lastName);
        RegisterPage.typeEmail(user.standardUser.email);
        RegisterPage.typePassword(user.standardUser.password);
        RegisterPage.typeRepeatPassword(user.standardUser.password);

        RegisterPage.checkErrorMessage('Last name has to be from 2 to 20 characters long');
        RegisterPage.checkRedBorder(RegisterPage.selectors.userLastnameInput);
        RegisterPage.checkRegisterButtonDisabled();
    });

    it('Check invalid email', () => {
        RegisterPage.typeUserName(user.standardUser.name);
        RegisterPage.typeUserLastname(user.standardUser.lastName);
        RegisterPage.typeEmail(user.invalidUser.email);
        RegisterPage.typePassword(user.standardUser.password);
        RegisterPage.typeRepeatPassword(user.standardUser.password);

        RegisterPage.checkErrorMessage('Email is incorrect');
        RegisterPage.checkRedBorder(RegisterPage.selectors.emailInput);
        RegisterPage.checkRegisterButtonDisabled();
    });

    it('Check invalid password', () => {
        RegisterPage.typeUserName(user.standardUser.name);
        RegisterPage.typeUserLastname(user.standardUser.lastName);
        RegisterPage.typeEmail(user.standardUser.email);
        RegisterPage.typePassword(user.invalidUser.password);
        RegisterPage.typeRepeatPassword(user.invalidUser.password);

        RegisterPage.checkErrorMessage(
            'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
        );

        RegisterPage.checkRedBorder(RegisterPage.selectors.passwordInput);
        RegisterPage.checkRegisterButtonDisabled();
    });

    it('Check password mismatch', () => {
        RegisterPage.typeUserName(user.standardUser.name);
        RegisterPage.typeUserLastname(user.standardUser.lastName);
        RegisterPage.typeEmail(user.standardUser.email);
        RegisterPage.typePassword(user.standardUser.password);
        RegisterPage.typeRepeatPassword('Different123A');

        RegisterPage.getRepeatPasswordInput().blur();

        RegisterPage.checkErrorMessage('Passwords do not match');
        RegisterPage.checkRedBorder(RegisterPage.selectors.repeatPasswordInput);
        RegisterPage.checkRegisterButtonDisabled();
    });
});