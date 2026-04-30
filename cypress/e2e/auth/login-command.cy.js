import LoginPage from '../../pages/LoginPage';

describe('Login with custom command', () => {

    beforeEach(() => {
        LoginPage.visit();
    });

    it('Login with valid user', () => {

        cy.fixture('user').then((userData) => {

            cy.login(
                userData.validUser.email,
                userData.validUser.password
            );
        });

        cy.location('pathname').should('eq', '/panel/garage');
    });

    it('Login with wrong user', () => {

        cy.fixture('user').then((userData) => {

            cy.login(
                userData.wrongUser.email,
                userData.wrongUser.password
            );
        });

        cy.get('.modal-body .alert-danger')
            .should('be.visible')
            .and('contain.text', 'Wrong email or password');
    });

});
