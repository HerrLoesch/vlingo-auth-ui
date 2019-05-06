describe("When a new user is posted to the backend", () => {
        
    let tenantId
    let userdata
    
    before(() => {
        cy.addTenant(newId => {
            tenantId = newId

            cy.fixture("newUser").then((user => {
                userdata = user
                cy.registerUserAtBackend(newId, userdata)
            }))
        }) 
    })

    it("then it can be requested by using its user name.", () => {
               
        cy.request({
            method: "GET",
            url: "http://localhost:8888/tenants/" + tenantId + "/users/" + userdata.userName
        }).then((response) => {
            let body = JSON.parse(response.body)
            expect(body.username).to.equal(userdata.userName)
            expect(body.active).to.equal(true)
            expect(body.profile.emailAddress).to.equal(userdata.email)
        })
    })
})