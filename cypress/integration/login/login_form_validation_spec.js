describe("When login form is visible ", function() {
    before(() => {
        cy.visit("/")
    })


    it("then login is possible if valid data is entered.", function() {
        cy.get("#SignOn").get("#username").type("test user")
        cy.get("#SignOn").get("#credentialId").type("test credential")
        cy.get("#SignOn").get("#secret").type("secret")

        cy.get("#SignOn").get("#loginButton").should("be.enabled")
    })

    describe("then login is not possible", function() {
        it("if username is empty.", function() {
            cy.get("#SignOn").get("#username").clear()
            cy.get("#SignOn").get("#credentialId").type("test credential")
            cy.get("#SignOn").get("#secret").type("secret")

            cy.get("#SignOn").get("#loginButton").should("be.disabled")
        })

        it("if credential is empty.", function() {
            cy.get("#SignOn").get("#username").type("test user")
            cy.get("#SignOn").get("#credentialId").clear()
            cy.get("#SignOn").get("#secret").type("secret")

            cy.get("#SignOn").get("#loginButton").should("be.disabled")
        })

        it("if secret is empty.", function() {
            cy.get("#SignOn").get("#username").type("test user")
            cy.get("#SignOn").get("#credentialId").type("test credential")
            cy.get("#SignOn").get("#secret").clear()

            cy.get("#SignOn").get("#loginButton").should("be.disabled")
        })
    })
})