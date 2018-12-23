describe("When login form is visible ", function() {
    before(() => {
        cy.visit("/")
    })


    it("then login is possible if valid data is entered.", function() {
        cy.get("#sign-on").get("#username").type("test user")
        cy.get("#sign-on").get("#credentialId").type("test credential")
        cy.get("#sign-on").get("#secret").type("secret")

        cy.get("#sign-on").get("#loginButton").should("be.enabled")
    })

    describe("then login is not possible", function() {
        it("if username is empty.", function() {
            cy.get("#sign-on").get("#username").clear()
            cy.get("#sign-on").get("#credentialId").type("test credential")
            cy.get("#sign-on").get("#secret").type("secret")

            cy.get("#sign-on").get("#loginButton").should("be.disabled")
        })

        it("if credential is empty.", function() {
            cy.get("#sign-on").get("#username").type("test user")
            cy.get("#sign-on").get("#credentialId").clear()
            cy.get("#sign-on").get("#secret").type("secret")

            cy.get("#sign-on").get("#loginButton").should("be.disabled")
        })

        it("if secret is empty.", function() {
            cy.get("#sign-on").get("#username").type("test user")
            cy.get("#sign-on").get("#credentialId").type("test credential")
            cy.get("#sign-on").get("#secret").clear()

            cy.get("#sign-on").get("#loginButton").should("be.disabled")
        })
    })
})