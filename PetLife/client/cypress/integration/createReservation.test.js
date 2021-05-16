describe("Rezervacijos pridėjimas testas", 
    () => {
        it("addReservation", () => {
            cy.visit("/login")

            /* ==== Generated with Cypress Studio ==== */
            cy.get(':nth-child(1) > label').click();
            cy.get('#email').clear();
            cy.get('#email').type('tests1477@gmail.com');
            cy.get('#root > div > div > div > div > div > div > div > div.card-body > form > div:nth-child(2) > label').type('tests1477{enter}');
            cy.get('.buttonLogin').click();
            cy.wait(3000)
            cy.get(':nth-child(3) > .nav-link').click();
            cy.get('.btn-warning').click();
            cy.get(':nth-child(2) > .form-group > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').click();
            cy.get('.react-datepicker__day--017').click();
            cy.get(':nth-child(3) > .form-group > .react-datepicker-wrapper > .react-datepicker__input-container > .form-control').click();
            cy.get('.react-datepicker__day--022').click();
            cy.get(':nth-child(5) > .col-sm-10 > .form-control').select('60a0d38ec86ebf555c83f73c');
            cy.get('#trainerVisit').check();
            cy.get('#selectTrainer').check();
            cy.get(':nth-child(12) > .col-sm-10 > .form-control').select('608d70e7c9e6dda2a941d071');
            cy.get('#trainerNote').click();
            cy.get('#trainerNote').type('nera');
            cy.get('#clientNotes').click();
            cy.get('#clientNotes').type('nera');
            cy.get('#submit').click();
            cy.get('ul > .btn').click();
            /* ==== End Cypress Studio ==== */
        })
    }
)