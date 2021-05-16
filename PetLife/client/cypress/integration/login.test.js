describe("Prisijungimo testas", 
    () => {
        it("login", () => {
            cy.visit("/login")

            /* ==== Generated with Cypress Studio ==== */
            cy.get(':nth-child(1) > label').click();
            cy.get('#email').clear();
            cy.get('#email').type('tests1477@gmail.com');
            cy.get('#root > div > div > div > div > div > div > div > div.card-body > form > div:nth-child(2) > label').click();
            // cy.get('#root > div > div > div > div > div > div > div > div.card-body > form > div:nth-child(2) > label').clear();
            cy.get('#root > div > div > div > div > div > div > div > div.card-body > form > div:nth-child(2) > label').type('tests1477{enter}');
            cy.get('button').click();
            cy.get('.btn').click();
            /* ==== End Cypress Studio ==== */
        })
    }
)