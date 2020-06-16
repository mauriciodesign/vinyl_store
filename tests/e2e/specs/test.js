// https://docs.cypress.io/api/introduction/api.html

describe('the Home Page', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Nuestros Productos')
  })
})
