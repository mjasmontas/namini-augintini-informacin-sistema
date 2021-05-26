describe("Augintinio pridėjimo testas", 
    () => {
        it("addPet", () => {
            cy.visit("/login")

            cy.get('.form-signin').click();
            cy.get(':nth-child(1) > label').click();
            cy.get('#email').clear();
            cy.get('#email').type('mainAdmin@gmail.com');
            cy.get('#root > div > div > div > div > div > div > div > div.card-body > form > div:nth-child(2) > label').type('pelyte78{enter}');
            cy.get('.buttonLogin').click();
            cy.wait(3000)
            cy.get(':nth-child(3) > .nav-link').click();
            cy.wait(5000);
            cy.get(':nth-child(1) > .card > .card-body > :nth-child(6)').click();
            cy.get(':nth-child(4) > .form-control').click();
            
            cy.get('.pt-3 > .btn').click();
            cy.get('ul > .btn').click();
        })
    }
)