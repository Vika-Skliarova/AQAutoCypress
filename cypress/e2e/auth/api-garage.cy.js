describe('API testing with Mocking', () => {
  const password = 'Qwerty12345';
  const email = `user_${Date.now()}@test.com`;

  // Data for 3 cars
  const mockedCarsResponse = {
    status: 'ok',
    data: [
      {
        id: 10001,
        carBrandId: 1, // Audi
        carModelId: 1, // TT
        initialMileage: 100,
        updatedMileageAt: new Date().toISOString(),
        mileage: 111,
        brand: 'Audi',
        model: 'TT',
        logo: 'audi.png',
      },
      {
        id: 10002,
        carBrandId: 2, // BMW
        carModelId: 6, // X5
        initialMileage: 200,
        updatedMileageAt: new Date().toISOString(),
        mileage: 222,
        brand: 'BMW',
        model: 'X5',
        logo: 'bmw.png',
      },
      {
        id: 10003,
        carBrandId: 3, // Ford
        carModelId: 11, // Fiesta
        initialMileage: 300,
        updatedMileageAt: new Date().toISOString(),
        mileage: 333,
        brand: 'Ford',
        model: 'Fiesta',
        logo: 'ford.png',
      }
    ],
  };

  it('should register, mock 3 cars, and verify UI representation', () => {
    // Register new user and get cookie
    cy.request({
      method: 'POST',
      url: 'https://qauto.forstudy.space/api/auth/signup',
      body: {
        name: 'Vika',
        lastName: 'Testlastname',
        email,
        password,
        repeatPassword: password,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      
      // Get sid cookie from response
      const sidCookie = response.headers['set-cookie']
        .find((cookie) => cookie.startsWith('sid='));
      const sidValue = sidCookie.split(';')[0].replace('sid=', '');

      // Use this cookie for login
      cy.setCookie('sid', sidValue);
    });

    // Replace real cars with my data
    cy.intercept('GET', '**/api/cars', {
      statusCode: 200,
      body: mockedCarsResponse,
    }).as('getMockedCars');

    // Go to garage page
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');

    // Wait for cars to load and check them
    cy.wait('@getMockedCars').then((interception) => {
      const body = interception.response.body;
      
      // Check data in console
      console.log('Mocked Data:', body);

      // Check if 3 cars are on the page
      cy.get('.car-item').should('have.length', 3);
      
      // Check names of cars
      cy.contains('Audi TT').should('be.visible');
      cy.contains('BMW X5').should('be.visible');
      cy.contains('Ford Fiesta').should('be.visible');
      
      // Check status code and data
      expect(interception.response.statusCode).to.eq(200);
      expect(body.status).to.eq('ok');
      expect(body.data[0]).to.include({ brand: 'Audi', model: 'TT' });
      expect(body.data[1]).to.include({ brand: 'BMW', model: 'X5' });
      expect(body.data[2]).to.include({ brand: 'Ford', model: 'Fiesta' });
    });

    cy.log('Mocking success!');
  });
});
