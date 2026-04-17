it('Open Google and type some text', () => {
    cy.visit('/');

    cy.get('#L2AGLb .QS5gu.sy4vM').should('be.visible').click();
    cy.get('textarea[name="q"]').should('be.visible').type('Cypress configuration');
    cy.get('.aajZCb input.gNO89b[name="btnK"]').should('be.visible').click();
});