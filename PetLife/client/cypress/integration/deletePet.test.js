describe("Augintinio pašalinimas testas", 
    () => {
        it("deletePet", () => {
            cy.visit("/login")

            cy.get(':nth-child(1) > label').click();
            cy.get('#email').clear();
            cy.get('#email').type('tests1477@gmail.com');
            cy.get('#root > div > div > div > div > div > div > div > div.card-body > form > div:nth-child(2) > label').type('tests1477{enter}');
            cy.get('button').click();
            
            cy.wait(5000)
            cy.get(':nth-child(2) > .nav-link').click();
            cy.get(':nth-child(1) > .text-center > .card-body > .card-link').click();
            cy.get('ul > .btn').click();
        })
    }
)