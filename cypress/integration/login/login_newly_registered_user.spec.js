describe("When I register a new user on the start page ", function() {
    before(() => {
        cy.visit("/")
        cy.get("#registerUserButton").click()

        cy.get("[aria-label=Username]").type("New user")
        cy.get("[aria-label='Email Address']").type("NewUser@mail.com")
        cy.get("[aria-label='Given Name']").type("New user name")
        cy.get("[aria-label='Second Name']").type("New user second name")
        cy.get("[aria-label='Family Name']").type("New user given name")
        cy.get("[aria-label=Phone]").type("New user phone")

        cy.get("#authority").parent().click()
        cy.get(".v-menu__content").contains("oAuth").click()

        cy.get("[aria-label='Id']").type("New Id")
        cy.get("[aria-label='Secret']").type("New Secret")

        cy.get("#registerButton").click()
    })

    it("the user is logged in.", function() {
        cy.get("#ApplicationFrame")
    })

    it("the user can be found in the users list.", function() {
        cy.get("#application-drawer").contains("Users").click()
        cy.get("#users-list").get("[aria-label='Search']").type("New user")
        cy.get("#users-list").contains("NewUser@mail.com")
    })
})