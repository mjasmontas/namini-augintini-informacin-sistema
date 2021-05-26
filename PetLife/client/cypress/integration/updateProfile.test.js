describe("Profilio atnaujinimo testas", 
    () => {
        it("UpdateUser", () => {
            cy.visit("/login")
            /* ==== Generated with Cypress Studio ==== */
            cy.get(':nth-child(1) > label').click();
            cy.get('#email').clear();
            cy.get('#email').type('tests159@gmail.com');
            cy.get('#root > div > div > div > div > div > div > div > div.card-body > form > div:nth-child(2) > label').type('tests159{enter}');
            cy.get('.buttonLogin').click();
            cy.wait(3000)
            cy.get(':nth-child(4) > .nav-link').click();
            cy.get('#firstName').click();
            cy.get('#firstName').click();
            cy.get('#Street').click();
            cy.get('#firstName').clear();
            cy.get('#firstName').type('Mantasmantas');
            cy.get('#lastName').clear();
            cy.get('#lastName').type('jasmontas');
            cy.get('.col-9').click();
            cy.get('#eMail').clear();
            cy.get('#eMail').type('tests159@gmail.com');
            cy.get('#phone').clear();
            cy.get('#phone').type('862318161');
            cy.get('.col-9 > .container > :nth-child(1) > :nth-child(1)').click();
            cy.get('#Street').clear();
            cy.get('#Street').type('algirdo');
            cy.get('#city').clear();
            cy.get('#city').type('skuodas');
            cy.get('#zipCode').clear();
            cy.get('#zipCode').type('89325');
            cy.get('.btn-primary').click();
            
            cy.wait(3000)
            cy.get('ul > .btn').click();
            /* ==== End Cypress Studio ==== */
        })
    }
)