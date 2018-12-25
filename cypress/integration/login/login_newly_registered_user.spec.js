describe("When I register a new user on the start page ", function() {

    var usedUserData = {}

    before(() => {
        cy.visit("/")
        cy.get("#registerUserButton").click()

        cy.fixture("existingUser").then((user => {
            usedUserData = user
            cy.enterNewUser(user)
            cy.get("#registerButton").click()
        }))
    })

    it("the user is logged in.", function() {
        cy.get("#ApplicationFrame")
    })

    it("the user can be found in the users list.", function() {
        cy.get("#application-drawer").contains("Users").click()
        cy.get("#users-list").get("[aria-label='Search']").type(usedUserData.userName)
        cy.get("#users-list").contains(usedUserData.email)
    })
})