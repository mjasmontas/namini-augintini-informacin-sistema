describe("Registracija testas", 
    () => {
        it("createUser", () => {
            cy.visit("/login")

            cy.get('.d-block').click();
            cy.get(':nth-child(1) > label').click();
            cy.get('#firstName').clear();
            cy.get('#firstName').type('cypressTest');
            cy.get(':nth-child(2) > label').click();
            cy.get('#lastName').clear();
            cy.get('#lastName').type('cypressTest');
            cy.get(':nth-child(3) > label').click();
            cy.get('#phoneNumber').clear();
            cy.get('#phoneNumber').type('862315842');
            cy.get('#root > div > div > div > div > div > div > div > div.card-body > form > div:nth-child(4) > label').type('tests10@gmail.com');
            cy.get(':nth-child(6) > label').click();
            cy.get('#password').clear();
            cy.get('#password').type('cypresstest');
            cy.get('.card').click();
            cy.get('#password').clear();
            cy.get('#password').type('cypresstest');
            cy.get(':nth-child(7) > label').click();
            cy.get('#confirmPassword').clear();
            cy.get('#confirmPassword').type('cypresstest');
            cy.get('.buttonRegistration').click();
            cy.wait(5000)
            cy.get(':nth-child(1) > label').click();
            cy.get('#email').clear();
            cy.get('#email').type('tests10@gmail.com');
            cy.get('#root > div > div > div > div > div > div > div > div.card-body > form > div:nth-child(2) > label').type('cypresstest{enter}');
            cy.get('.buttonLogin').click();
            cy.get('.btn').click();
        })
    }
)