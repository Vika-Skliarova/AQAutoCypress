// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (email, password) => {
    
    cy.get('.header_signin').click();

    cy.get('#signinEmail')
        .should('be.visible')
        .clear()
        .type(email);

    cy.get('#signinPassword')
        .should('be.visible')
        .clear()
        .type(password);

    cy.get('.modal-footer .btn-primary').should('be.visible').click();
});

Cypress.Commands.add('registerUserAndSetSidCookie', () => {
  const email = `user_${Date.now()}@test.com`;
  const password = 'Qwerty12345';

  return cy.request({
    method: 'POST',
    url: '/api/auth/signup',
    body: {
      name: 'Vika',
      lastName: 'Test',
      email: email,
      password: password,
      repeatPassword: password,
    },
  }).then((response) => {
    expect(response.status).to.eq(201);
    const sidCookie = response.headers['set-cookie'].find((cookie) => cookie.startsWith('sid='));
    const sidValue = sidCookie.split(';')[0].replace('sid=', '');
    cy.setCookie('sid', sidValue);
  });
});

Cypress.Commands.add('createExpenseApi', (carId, mileage, liters, totalCost) => {
  return cy.request({
    method: 'POST',
    url: '/api/expenses',
    body: {
      carId: carId,
      reportedAt: new Date().toISOString().split('T')[0],
      mileage: mileage,
      liters: liters,
      totalCost: totalCost,
      forceMileage: false
    },
  });
});
