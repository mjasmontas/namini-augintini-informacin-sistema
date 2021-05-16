describe("Augintinio pridėjimo testas", 
    () => {
        it("addPet", () => {
            cy.visit("/login")

            // cy.wait(5000)
            // cy.get('.btn').click({ multiple: true },{force: true});
            /* ==== Generated with Cypress Studio ==== */
            cy.get(':nth-child(1) > label').click();
            cy.get('#email').clear();
            cy.get('#email').type('tests1477@gmail.com');
            cy.get('#root > div > div > div > div > div > div > div > div.card-body > form > div:nth-child(2) > label').type('tests1477{enter}');
            cy.get('.buttonLogin').click();
            cy.get('.col-12.text-center > .familyCard > a > :nth-child(1) > .petImg').click();
            cy.get(':nth-child(2) > .col-sm-10 > .form-control').select('Šuo');
            cy.get(':nth-child(3) > .form-group > .form-control').clear();
            cy.get(':nth-child(3) > .form-group > .form-control').type('Cypress test');
            cy.get('#years').clear();
            cy.get('#years').type('2');
            cy.get('#allergies').click();
            cy.get('#allergies').type('neturi');
            cy.get('#temperament').click();
            cy.get('#temperament').type('silpnas');
            cy.get(':nth-child(3) > .form-control').select('Mažas');
            cy.get('#submit').click();
            cy.wait(5000)
            cy.get('.btn').click({ multiple: true },{force: true});
            /* ==== End Cypress Studio ==== */
        })
    }
)