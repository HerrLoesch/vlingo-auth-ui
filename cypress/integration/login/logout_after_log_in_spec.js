describe("When I logout after successful login ", function() {
    before(() => {
        cy.visit("/")

        // Login
        cy.get("#SignOn").get("#username").type("testuser")
        cy.get("#SignOn").get("#credentialId").type("test credential")
        cy.get("#SignOn").get("#secret").type("secret")
        cy.get("#SignOn").get("#loginButton").click()

        // Logout
        cy.get("#ApplicationFrame").get("#logoutButton").click()
    })

    it("then I can see the login form.", function() {
        cy.get("#SignOn")
    })
})