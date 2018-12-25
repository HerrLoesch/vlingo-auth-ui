describe("When I register a new user on the start page ", function () {

    var usedUserData = {}

    before(() => {
        cy.visit("/")
        cy.get("#registerUserButton").click()

        cy.fixture("newUser").then((user => {
            usedUserData = user
            cy.enterUserDetails(user, "#register-user")
            cy.get("#registerButton").click()
        }))
    })

    it("the user is logged in.", function () {
        cy.get("#ApplicationFrame")
    })
})