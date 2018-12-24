describe("When I logout after successful login ", function() {
    before(() => {
        cy.visit("/")

        // Login
        cy.get("#username").type("testuser")
        cy.get("#credentialId").type("test credential")
        cy.get("#secret").type("secret")
        cy.get("#loginButton").click()

        // Logout
        cy.get("#ApplicationFrame").get("#logoutButton").click()
    })

    it("then I can see the login form.", function() {
        cy.get("#sign-on")
    })
})