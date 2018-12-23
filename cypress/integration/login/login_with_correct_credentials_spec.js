describe("When I login with correct login data ", function() {
    before(() => {
        cy.visit("/")

        cy.get("#sign-on").get("#username").type("testuser")
        cy.get("#sign-on").get("#credentialId").type("test credential")
        cy.get("#sign-on").get("#secret").type("secret")

        cy.get("#sign-on").get("#loginButton").click()
    })

    it("then I can see the actual application.", function() {
        cy.get("#ApplicationFrame")
    })
})