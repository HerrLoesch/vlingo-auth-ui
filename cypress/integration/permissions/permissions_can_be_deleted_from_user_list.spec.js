describe("When a permission is deleted from permission list", () => {

    var usedPermissionData

    before(() => {
        cy.standardLogin()
        cy.visit("/#/listPermissions")

        cy.fixture("existingPermission").then((permission) => {
            usedPermissionData = permission
            cy.get("#permissions-list").get("[aria-label='Search']").type(usedPermissionData.name)
            cy.get("#permissions-list").contains("delete").click()
            cy.get(".v-dialog--active").contains("Yes").click()
        })

        cy.wait(1500)
    })

    it("then it can no longer be found.", () => {
        cy.get("#permissions-list").within(() => {
            cy.get("[aria-label='Search']").clear()
            cy.get("[aria-label='Search']").type(usedPermissionData.name)
            cy.get(".v-table").should("not.contain", usedPermissionData.email)
        })

    })

    it("instead an error text is shown.", () => {
        let errorText = "Your search for \"" + usedPermissionData.name + "\" found no results."
        cy.get("#permissions-list").within(() => {
            cy.get("[aria-label='Search']").clear()
            cy.get("[aria-label='Search']").type(usedPermissionData.name)
        })

        cy.get("#permissions-list").should("contain", errorText)
    })
})