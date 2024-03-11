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

    requiredApiPhotos.forEach((photo, index) => {
        it(`should navigate to correct(indexed: ${index}) single photo page and have correct number of tags in dom`, () => {
            cy.get('.photo-link').eq(index).click();

            cy.wait(`@getPhoto${index+1}`).its('response.body.tags')
                .should('have.length', photo.tags.length);

            cy.location().should((loc) => {
                expect(loc.href).to.contain(`${loc.host}/photos/${photo.id}`)
            })

            cy.get('.tags-and-image-container img')
                .eq(0).should('be.visible')
                .should('have.length', 1)
                .invoke('width')
                .should('be.gt', 10);

            cy.get('.tags-and-image-container .tag-component-container').filter(':not(:visible)').should('have.length', 1);
            cy.get('.tags-and-image-container .tag-component-container').filter(':visible').should('have.length', photo.tags.length);

            photo.tags.forEach((tag, index) => {
                cy.get('.tags-and-image-container .tag-component-container').eq(index)
                    .should('have.attr', 'style', `left: ${tag.x_offset}%; top: ${tag.y_offset}%;`);
            })
        })

    })
})