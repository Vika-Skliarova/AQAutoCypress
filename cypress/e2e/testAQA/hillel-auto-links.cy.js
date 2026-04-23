describe('Find buttons and links in Header, Hero and Footer', () => {
    beforeEach(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
    });

    it('Header elements', () => {
        cy.get('.header .header-link').should('be.visible');
        cy.get('.header .btn.header_signin').should('be.visible');
    });

    it('Hero button', () => {
        cy.get('.hero-descriptor .hero-descriptor_btn').should('be.visible');
    });

    it('Social buttons in Contacts ', () => {
        cy.get('.contacts_socials').should('be.visible');
        cy.get('.contacts_socials .socials_link').should('have.length', 5);

        cy.get('.socials_link[href="https://www.facebook.com/Hillel.IT.School"]')
            .find('.icon-facebook')
            .should('be.visible');

         cy.get('.socials_link[href="https://t.me/ithillel_kyiv"]')
            .find('.icon-telegram')
            .should('be.visible');

        cy.get('.socials_link[href="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"]')
            .find('.icon-youtube')
            .should('be.visible');

        cy.get('.socials_link[href="https://www.instagram.com/hillel_itschool/"]')
            .find('.icon-instagram')
            .should('be.visible');

        cy.get('.socials_link[href="https://www.linkedin.com/school/ithillel/"]')
            .find('.icon-linkedin')
            .should('be.visible');
    });

    it('Contacts links', () => {
        cy.get('.contacts .contacts_link').should('have.length', 2);
        cy.get('.contacts .contacts_link').eq(0).should('contain', 'ithillel.ua');
        cy.get('.contacts .contacts_link').eq(1).should('contain', 'support@ithillel.ua');
    });

    it('Footer Logo', () => {
        cy.get('.footer .footer_logo').should('be.visible');
        cy.get('.footer .footer_logo').find('svg').should('exist');
    });
});