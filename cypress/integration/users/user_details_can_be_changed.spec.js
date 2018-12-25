describe("When data of a user is changed", () => {

    var usedUserData
    var newUserData

    before(() => {
        cy.standardLogin()
        cy.visit("/#/listUsers")

        cy.fixture("existingUser").then((user) => {
            usedUserData = user
            cy.get("#users-list").get("[aria-label='Search']").type(usedUserData.userName)
            cy.get("#users-list").contains("edit").click()

            cy.fixture("newUser").then((newUser) => {
                newUserData = newUser
                // Error might occur if we enter credential info because there are no credentials in this view.
                newUser.credential = undefined
                cy.enterUserDetails(newUser, ".v-dialog--active")

                cy.get(".v-dialog--active").contains("Save").click()
            })
        })
    })

    it("then the old data can no longer be found.", () => {
        cy.get("#users-list").get("[aria-label='Search']").clear()
        cy.get("#users-list").get("[aria-label='Search']").type(usedUserData.userName)
        cy.get("#users-list").should("not.contain", usedUserData.email)
    })

    it("the the new data is to be found.", () => {
        cy.get("#users-list").get("[aria-label='Search']").clear()
        cy.get("#users-list").get("[aria-label='Search']").type(newUserData.userName)
        cy.get("#users-list").should("contain", newUserData.userName)
        cy.get("#users-list").should("contain", newUserData.email)
        cy.get("#users-list").should("contain", newUserData.givenName)
        cy.get("#users-list").should("contain", newUserData.familyName)
        cy.get("#users-list").should("contain", newUserData.phone)
    })
})