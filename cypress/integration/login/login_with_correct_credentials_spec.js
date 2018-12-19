describe("When I login with correct login data ", function() {
    before(() => {
        cy.visit("/")

        cy.get("#SignOn").get("#username").type("testuser")
        cy.get("#SignOn").get("#credentialId").type("test credential")
        cy.get("#SignOn").get("#secret").type("secret")

        cy.get("#SignOn").get("#loginButton").click()
    })

    it("than I can see the actual application.", function() {
        cy.get("#ApplicationFrame")
    })
})