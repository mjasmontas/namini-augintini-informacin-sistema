describe("Sukurti pranešimą testas", 
    () => {
        it("createMessage", () => {
            cy.visit("/")

            cy.get('#name').clear();
            cy.get('#name').type('test cypress');
            cy.get('#email').clear();
            cy.get('#email').type('cypressEmail@gmail.com');
            cy.get('#subject').clear();
            cy.get('#subject').type('testas');
            cy.get('#message').click();
            cy.get('#message').type('testas');
            cy.get('.text-center').click();
            cy.get('.text-center > button').click();
        })
    }
)