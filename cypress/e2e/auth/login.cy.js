import LoginPage from '../../pages/LoginPage';
import { user } from '../../fixtures/users';

describe('Login tests', () => {

    beforeEach(() => {
        LoginPage.visit();
    });

    it('Check login form is opened', () => {
        LoginPage.clickSignIn();
        LoginPage.verifyLoginForm();
    });

    it('Check login with wrong credentials', () => {
        LoginPage.login(
            user.wrongUser.email,
            user.wrongUser.password
        );

        LoginPage.verifyErrorMessage('Wrong email or password');
    });

    it('Check login with valid credentials', () => {
        LoginPage.login(
            user.standardUser.email,
            user.standardUser.password
        );

        cy.url().should('include', '/panel/garage');
    });

});