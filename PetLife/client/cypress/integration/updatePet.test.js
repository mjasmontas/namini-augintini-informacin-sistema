describe("Augintinio atnaujinimo testas", 
    () => {
        it("UpdatePet", () => {
            cy.visit("/login")

            cy.get(':nth-child(1) > label').click();
            cy.get('#email').clear();
            cy.get('#email').type('tests159@gmail.com');
            cy.get('#root > div > div > div > div > div > div > div > div.card-body > form > div:nth-child(2) > label').type('tests159{enter}');
            cy.get('.buttonLogin').click();
            cy.wait(3000)
            cy.get(':nth-child(2) > .nav-link').click();
            cy.get('[href="/pet/60aea6fbe979e17e2572da2e"]').click();
            cy.get('#temperament').click();
            cy.get('#submit').click();
            cy.wait(3000)
            cy.get('.btn').click();
        })
    }
)