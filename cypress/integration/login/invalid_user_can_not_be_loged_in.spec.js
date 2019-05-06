import axios from "axios"

describe("When an invalid user tries to login", () => {

    before( ()=>  {
        
        // this is mocked because the backend does not work as expected.
        cy.server()
        cy.route({
            method: "POST",
            url: "**/users/authentic",
            response: false
        })

        cy.standardLogin()
    })
    
    it("then the sign on dialog is still visible.", () => {
        cy.get("#sign-on")
    })
    
    it("then an error text is shown.", () => {
        cy.get("#sign-on").contains("User could not be logged in. Please check username and password.")
    })
})