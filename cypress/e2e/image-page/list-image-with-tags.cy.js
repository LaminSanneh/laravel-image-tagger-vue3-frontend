/// <reference types="cypress" />

const requiredApiPhotos = require('../../fixtures/api-photos');

context('Single Photo Page After Clicking one on homepage', () => {

    beforeEach(() => {
        // homepage
        cy.intercept('GET', '**/api/photos', { fixture: 'api-photos.json' }).as('getPhotos');
        cy.fixture('api-photos.json').as('apiPhotosResponse');

        // photo page
        cy.intercept('GET', `**/api/photos/${requiredApiPhotos[0].id}`, { body: requiredApiPhotos[0] }).as('getPhoto1');
        cy.intercept('GET', `**/api/photos/${requiredApiPhotos[1].id}`, { body: requiredApiPhotos[1] }).as('getPhoto2');

        // all pages
        cy.intercept('GET', '**/storage/*', { fixture: 'bmw-x5-blue1.jpg' }).as('getPhotos');

        cy.visit('/');
    });



    it('should navigate to correct(first) single photo page and have correct number of tags in dom', () => {
        cy.get('.photo-link').eq(0).click();

        cy.wait('@getPhoto1').its('response.body.tags')
            .should('have.length', 3);

        cy.location().should((loc) => {
            expect(loc.href).to.contain(`${loc.host}/photos/${requiredApiPhotos[0].id}`)
        })

        cy.get('.tags-and-image-container img')
            .eq(0).should('be.visible')
            .should('have.length', 1)
            .invoke('width')
            .should('be.gt', 10);

        cy.get('.tags-and-image-container .tag-component-container').should('have.length', requiredApiPhotos[0].tags.length + 1);
    })

    it('should navigate to correct(second) single photo page and have correct number of tags in dom', () => {
        cy.get('.photo-link').eq(1).click();

        cy.wait('@getPhoto2').its('response.body.tags')
            .should('have.length', 2);

        cy.location().should((loc) => {
            expect(loc.href).to.contain(`${loc.host}/photos/${requiredApiPhotos[1].id}`)
        })

        cy.get('.tags-and-image-container img')
            .eq(0).should('be.visible')
            .should('have.length', 1)
            .invoke('width')
            .should('be.gt', 10);

        cy.get('.tags-and-image-container .tag-component-container').should('have.length', requiredApiPhotos[1].tags.length + 1);
    })
})