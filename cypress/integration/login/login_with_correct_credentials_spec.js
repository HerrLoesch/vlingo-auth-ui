describe("When I login with correct login data ", function () {
    before(() => {
        cy.setupBasicStructure((tenantId =>
                cy.standardLogin(tenantId)
        ))
    })

    it("then I can see the actual application.", function () {
        cy.get("#ApplicationFrame")
    })
})