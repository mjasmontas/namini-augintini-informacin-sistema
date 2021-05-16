describe("Vartotojo rolės pakeitimo testas", 
    () => {
        it("changeRole", () => {
            cy.visit("/login")

            cy.get(':nth-child(1) > label').click();
            cy.get('#email').clear();
            cy.get('#email').type('mainAdmin@gmail.com');
            cy.get('#root > div > div > div > div > div > div > div > div.card-body > form > div:nth-child(2) > label').type('pelyte78{enter}');
            cy.get('.buttonLogin').click();
            cy.wait(3000)
            cy.get(':nth-child(2) > .nav-link').click();
            cy.get(':nth-child(16) > :nth-child(6) > .btn > .svg-inline--fa > path').click();
            cy.get(':nth-child(2) > .form-check-input').check();
            cy.get('#submit').click();
            cy.get('ul > .btn').click();
        })
    }
)