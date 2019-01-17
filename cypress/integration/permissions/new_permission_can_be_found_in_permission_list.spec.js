describe("When a new permission is created", function () {

    var permissionData

    before(() => {
        cy.standardLogin()
        cy.visit("/#/listPermissions")


        cy.get('#addGroupButton').click()

        cy.fixture("newPermission").then((permission) => {
            permissionData = permission
            cy.enterPermissionDetails(permission, ".v-dialog--active")

            cy.get(".v-dialog--active").contains("Save").click()

        })

        cy.wait(1500)

    })

    it("then it can be found in the permission list", function () {

        cy.get("#permissions-list").get("[aria-label='Search']").type(permissionData.name)
        cy.get("#permissions-list").get(".v-table").should("contain", permissionData.description)
    })
})


