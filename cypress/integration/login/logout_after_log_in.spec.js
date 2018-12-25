describe("When I logout after successful login ", function() {
    before(() => {
        cy.standardLogin()
    })

    it("then I can see the login form.", function() {
        cy.get("#ApplicationFrame").get("#logoutButton").click()

        cy.get("#sign-on")
    })
})