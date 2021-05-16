describe("Augintinio trenerio vizito panaikinimo testas", 
    () => {
        it("removeTrainerVisit", () => {
            cy.visit("/login")

            /* ==== Generated with Cypress Studio ==== */
            cy.get(':nth-child(1) > label').click();
            cy.get('#email').clear();
            cy.get('#email').type('treneris@gmail.com');
            cy.get('#root > div > div > div > div > div > div > div > div.card-body > form > div:nth-child(2) > label').type('treneris{enter}');
            cy.get('.buttonLogin').click();
            cy.get(':nth-child(1) > .text-center > .card-body > .btn').click();
            cy.wait(3000)
            cy.get('ul > .btn').click();
            /* ==== End Cypress Studio ==== */
        })
    }
)