/// <reference types="cypress" />

const requiredApiPhotos = require('../../fixtures/api-photos');
const requiredApiPhotosPostResponse = require('../../fixtures/api-photos-post');

context('Home Page Upload Photos', () => {

    beforeEach(() => {
        cy.intercept('GET', '**/api/photos', { fixture: 'api-photos.json' });

        cy.intercept('GET', '**/storage/*', { fixture: 'bmw-x5-blue1.jpg' });

        cy.intercept('POST', '**/api/photos', { fixture: 'api-photos-post.json' }).as('postPhotoUpload');

        cy.fixture('api-photos.json').as('apiPhotosResponse');

        cy.fixture('mercedes-blue-1.png').as('imageToUpload');

        cy.visit('/');
    });

    it('Upload photo and have the photos list updated', () => {
        cy.get('.single-photo').should('have.length', 2);

        cy.get('input[type=file].dz-hidden-input').selectFile('@imageToUpload', { force: true });

        console.log(requiredApiPhotosPostResponse);
        cy.wait('@postPhotoUpload').its('response.body')
            .should('deep.equal', requiredApiPhotosPostResponse);

        cy.get('.single-photo').should('have.length', 3);
    })
})
