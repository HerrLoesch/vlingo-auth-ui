describe("When data of a role is changed", () => {

    let usedRoleData;
    let newRoleData;

    before(() => {
        cy.standardLogin()
        cy.visit("/#/listRoles")

        cy.fixture("existingRole").then((role) => {
            usedRoleData = role

            cy.searchListFor("#roles-list", usedRoleData.name)
            cy.get("#roles-list").contains("edit").click()

            cy.fixture("newRole").then((newRole) => {
                newRoleData = newRole
                cy.enterRoleDetails(newRole, ".v-dialog--active")

                cy.get(".v-dialog--active").contains("Save").click()
            })
        })
    })

    it("then the old data can no longer be found.", () => {
        cy.searchListFor("#roles-list", usedRoleData.name)

        cy.get("#roles-list").should("not.contain", usedRoleData.description)
    })

    it("the the new data is to be found.", () => {

        cy.searchListFor("#roles-list", newRoleData.userName)

        cy.get("#roles-list").within(() => {
            cy.get(".v-table").should("contain", newRoleData.description)
        })        
    })
})