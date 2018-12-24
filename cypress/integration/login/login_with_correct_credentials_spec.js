describe("When I login with correct login data ", function() {
    before(() => {
        cy.visit("/")

        cy.get("#username").type("testuser")
        cy.get("#credentialId").type("test credential")
        cy.get("#secret").type("secret")

        cy.get("#loginButton").click()
    })

    it("then I can see the actual application.", function() {
        cy.get("#ApplicationFrame")
    })
})