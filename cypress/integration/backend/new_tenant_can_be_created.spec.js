describe("When a new tenant is posted to the backend", () => {
    
    let tenant = {
        active: true,
        description: "test tenant",
        name: "tenant-0815",
        tenantId: "0815"
    }
    
    let id
    
    before(() => {
        cy.addTenantToBackEnd(tenant, (newId => id = newId))
    })

    it("then it can be requested by using its id.", () => {
        cy.request({
            method: "GET",
            url: "http://localhost:8888/tenants/" + id
        }).then((response) => {
            let body = JSON.parse(response.body)
            expect(body.name).to.equal(tenant.name)
            expect(body.active).to.equal(tenant.active)
            expect(body.description).to.equal(tenant.description)
        })
    })
})