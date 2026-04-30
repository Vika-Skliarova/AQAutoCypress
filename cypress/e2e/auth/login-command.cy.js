import '../../support/commands';
import LoginPage from '../../pages/LoginPage';

describe('Login with custom command', () => {

    beforeEach(function () {
        LoginPage.visit();

        cy.fixture('user').then((data) => {
            this.userData = data;
        });
    });

    it('Login with valid user', function () {

        cy.login(
            this.userData.validUser.email,
            this.userData.validUser.password
        );

        cy.location('pathname').should('eq', '/panel/garage');
    });

    it('Login with wrong user', function () {

        cy.login(
            this.userData.wrongUser.email,
            this.userData.wrongUser.password
        );

        cy.get('.modal-body .alert-danger')
            .should('be.visible')
            .and('contain.text', 'Wrong email or password');
    });

});
