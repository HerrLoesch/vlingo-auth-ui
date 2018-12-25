describe("When a new user is created", () => {

    var usedUserData

    before(() => {
        cy.standardLogin()
        cy.visit("/#/listUsers")

        cy.get("#addUserButton").click()

        cy.fixture("newUser").then((user, ) => {
            usedUserData = user
            cy.enterNewUser(user, ".v-dialog--active")
            cy.get("#registerButton").click()
        })

        cy.wait(2000)
    })

    it("then he can be found in the user list.", () => {
        cy.get("#users-list").get("[aria-label='Search']").type(usedUserData.userName)
        cy.get("#users-list").contains(usedUserData.email)
    })
})