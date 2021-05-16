describe("Veterinaro vizito panaikinimo testas", 
    () => {
        it("removeVeterinarianVisit", () => {
            cy.visit("/login")

            /* ==== Generated with Cypress Studio ==== */
            cy.get(':nth-child(1) > label').click();
            cy.get('#email').clear();
            cy.get('#email').type('veterinaras@gmail.com');
            cy.get('#root > div > div > div > div > div > div > div > div.card-body > form > div:nth-child(2) > label').type('veterinaras{enter}');
            cy.get('.buttonLogin').click();
            cy.get(':nth-child(1) > .text-center > .card-body > .btn').click();
            cy.wait(2000)
            cy.get('.btn').click();
            /* ==== End Cypress Studio ==== */
        })
    }
)