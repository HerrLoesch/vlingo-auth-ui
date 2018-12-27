describe("When a user is deleted from user list", () => {

    var usedUserData

    before(() => {
        cy.standardLogin()
        cy.visit("/#/listUsers")

        cy.fixture("existingUser").then((user) => {
            usedUserData = user
            cy.get("#users-list").get("[aria-label='Search']").type(usedUserData.userName)
            cy.get("#users-list").contains("delete").click()
            cy.get(".v-dialog--active").contains("Yes").click()
        })

        cy.wait(1500)
    })

    it("then he can no longer be found.", () => {
        cy.get("#users-list").within(() => {
            cy.get("[aria-label='Search']").clear()
            cy.get("[aria-label='Search']").type(usedUserData.userName)
            cy.get(".v-table").should("not.contain", usedUserData.email)
        })

    })

    it("instead an error text is shown.", () => {
        let errorText = "Your search for \"" + usedUserData.userName + "\" found no results."
        cy.get("#users-list").within(() => {
            cy.get("[aria-label='Search']").clear()
            cy.get("[aria-label='Search']").type(usedUserData.userName)
            cy.should("contain", errorText)
        })
    })
})