/// <reference types="cypress" />
// @ts-check
// cypress/support/e2e.ts
// import '@cypress/code-coverage/support';

describe('My e2e Test', () => {
  it('Visits http://localhost:3000/', () => {
    cy.visit('/');
    cy.contains('About Us').click();
    cy.contains('Person').click();
    cy.contains('Main').click();
  });
  it('open form', () => {
    cy.visit('/person');
    cy.get('[data-testid="open"]').click();
    cy.contains('Add file');
  });
  it('form fills out correctly', () => {
    cy.visit('/person');
    cy.get('[data-testid="open"]').click();
    cy.get('[placeholder="Enter name with a capital letter"]').type('Alex');
    cy.get('[placeholder="Enter desription"]').type('I am good man!!!');
    cy.get('[data-testid="date"]').type('2010-10-10');
    cy.get('[type="radio"]').last().check();
    cy.get('[data-testid="category-select-input"]').select('free');
    cy.get('[type="checkbox"]').check();
    cy.get('input[type=file]').selectFile('src/assets/image/noPhoto.png');
    cy.get('[type="submit"]').click();
  });
  it('open about page', () => {
    cy.visit('/about');
    cy.contains('About us');
  });
  it('open modal', () => {
    cy.visit('/');
    cy.contains('iPhone 9').click();
    cy.contains('Stock: 94');
    cy.get('[data-testid="close-button"]').click();
  });
    it('open main page and search not product', () => {
    cy.visit('/');
    cy.get('[placeholder="Search..."]').type('12345{enter}');
    cy.contains('Do not find');
  });
  it('search', () => {
    cy.visit('/');
    cy.get('[placeholder="Search..."]').type('30{enter}');
    cy.contains('About Us').click();
    cy.contains('Person').click();
    cy.contains('Main').click();
    cy.get('[placeholder="Search..."]').should('have.value', '30');
  });
  it('error page', () => {
    cy.visit('/AAA');
    cy.contains('Page Not Found');
  });
  it('Does not do much!', () => {
    cy.visit('/');
    expect(true).to.equal(true);
  });
  it('End Test', () => {
    expect(true).to.equal(true);
  });
});
