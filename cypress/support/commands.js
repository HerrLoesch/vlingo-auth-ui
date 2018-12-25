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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("standardLogin", () => {
    cy.visit("/")

    cy.fixture("loginUser").then((user) => {
        cy.get("#username").type(user.userName)
        cy.get("#credentialId").type(user.credential.id)
        cy.get("#secret").type(user.credential.secret)

        cy.get("#loginButton").click()
    })

    cy.wait(1000)
})

Cypress.Commands.add("enterUserDetails", (user, parent) => {

    cy.get(parent).within(() => {

        if (user.userName !== undefined) {
            cy.get("[aria-label=Username]").clear().type(user.userName)
        }

        if (user.email !== undefined) {
            cy.get("[aria-label='Email Address']").clear().type(user.email)
        }

        if (user.givenName !== undefined) {
            cy.get("[aria-label='Given Name']").clear().type(user.givenName)
        }

        if (user.secondName !== undefined) {
            cy.get("[aria-label='Second Name']").clear().type(user.secondName)
        }

        if (user.familyName !== undefined) {
            cy.get("[aria-label='Family Name']").clear().type(user.familyName)
        }

        if (user.phone !== undefined) {
            cy.get("[aria-label='Phone']").clear().type(user.phone)
        }

        if (user.credential !== undefined) {
            cy.get("[aria-label='Id']").clear().type(user.credential.id)
            cy.get("[aria-label='Secret']").clear().type(user.credential.secret)
        }
    })

    // menus have an own layer and so they are not part of the parent
    if(user.credential !== undefined) {
        cy.get("#authority").parent().click()
        cy.get(".v-menu__content").contains(user.credential.authority).click()
    }

})