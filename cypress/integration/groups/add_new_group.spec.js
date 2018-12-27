describe("When a new group is added", () => {
    var usedInputData

    before(() => {
        cy.standardLogin()
        cy.visit("#/listGroups")

        cy.get("#addGroupButton").click()

        cy.fixture("newGroup").then((group) => {
            usedInputData = group

            cy.enterGroupDetails(group, ".v-dialog--active")
            cy.get(".v-dialog--active").contains("Save").click()
        })

    })

    it("then it can be found in the group list.", () => {
        cy.get("#groups-list").within(() => {
            cy.get("[aria-label='Search']").type(usedInputData.name)
            cy.get(".v-table").should("contain", usedInputData.name)
            cy.get(".v-table").should("contain", usedInputData.description)
        })
    })
})