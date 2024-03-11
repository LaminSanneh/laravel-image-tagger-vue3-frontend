/// <reference types="cypress" />

const requiredApiPhotos = require('../../fixtures/api-photos');

context('Home Page List Photos', () => {

    beforeEach(() => {
        cy.intercept('GET', '**/api/photos', { fixture: 'api-photos.json' }).as('getPhotos');

        cy.intercept('GET', '**/storage/*', { fixture: 'bmw-x5-blue1.jpg' }).as('getPhotos');

        cy.fixture('api-photos.json').as('apiPhotosResponse');

        cy.visit('/');
    });

    it('displays container for .photos-list', () => {
        cy.get('.photos-list').should('have.length', 1);
    });

    it('should have response body of backendserver-url/api/photos with length 1', () => {
        cy.wait('@getPhotos').its('response.body')
            .should('have.length', 2);
    });

    // my comment - it is important to use function instead of () => so we can properly
    // use this.something and expect it to work properly
    it('cy.fixture of api-photos.json load a fixture', function() {
        expect(this.apiPhotosResponse, 'fixture in the beforeEach block')
            .to.deep.equal(requiredApiPhotos);
    });

    it('loads correct amount of photos along with photo titles', () => {
        cy.get('.image-tag-container img').eq(0).should('be.visible').invoke('width').should('be.gt', 10);
        cy.get('.image-tag-container img').eq(1).should('be.visible').invoke('width').should('be.gt', 10);

        cy.get('.single-photo').should('have.length', 2);

        cy.get('.single-photo .photo-title').eq(0).should('contain', requiredApiPhotos[0].photo_title);
        cy.get('.single-photo .photo-title').eq(1).should('contain', requiredApiPhotos[1].photo_title);
    });
});