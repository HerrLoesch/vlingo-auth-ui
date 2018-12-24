describe("When login form is visible ", function() {
    before(() => {
        cy.visit("/")
    })

    context("and valid data is given", () => {

        it("then login is possible.", function() {
            cy.get("#username").type("test user")
            cy.get("#credentialId").type("test credential")
            cy.get("#secret").type("secret")

            cy.get("#sign-on").get("#loginButton").should("be.enabled")
        })
    })

    context("then login is not possible", function() {
        it("if username is empty.", function() {
            cy.get("#username").clear()
            cy.get("#credentialId").type("test credential")
            cy.get("#secret").type("secret")

            cy.get("#loginButton").should("be.disabled")
        })

        it("if credential is empty.", function() {
            cy.get("#username").type("test user")
            cy.get("#credentialId").clear()
            cy.get("#secret").type("secret")

            cy.get("#loginButton").should("be.disabled")
        })

        it("if secret is empty.", function() {
            cy.get("#username").type("test user")
            cy.get("#credentialId").type("test credential")
            cy.get("#secret").clear()

            cy.get("#loginButton").should("be.disabled")
        })
    })
})