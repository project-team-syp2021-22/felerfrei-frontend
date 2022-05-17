describe('Login', () => {
    it('login#1 Login-Seite kann aufgerufen werden', () => {
        cy.visit('http://localhost:3000/login');
    });

    it('login#2 login page shows login form', () => {
        cy.visit('http://localhost:3000/login');
        cy.get("h2").should('contain.text', 'Login');
        cy.get("input").should('be.empty');
        cy.get("input").eq(0).invoke('attr', 'placeholder').should('contain', 'E-Mail');
        cy.get("input").eq(1).invoke('attr', 'placeholder').should('contain', 'Password');
        cy.get("button").should('contain.text', 'Anmelden');
        cy.contains('Noch kein Konto?');
        cy.contains('Passwort vergessen?');
    });

    it('login#3 signup page-link is available', () => {
        cy.visit('http://localhost:3000/login');
        cy.contains('Noch kein Konto?').click();
        cy.url().should('include', '/signup');
    });

    it('login#4 password-reset page accessible', () => {
        cy.visit('http://localhost:3000/login');
        cy.contains('Passwort vergessen?').click();
        cy.url().should('include', '/reset');
    });

    // if this fails please check if you already added the test user to the database
    it('login#5 login works', () => {
        cy.fixture('users/testuser.json').then((user) => {
            cy.visit('http://localhost:3000/login');
            cy.get("input").eq(0).type(user.email);
            cy.get("input").eq(1).type(user.password);
            cy.get("button").contains('Anmelden').click();
            cy.contains("Test"); // check if user is logged in
            cy.getCookie("token").should('exist');
        });
    });

    it('login#6 login fails', () => {
        cy.visit('http://localhost:3000/login');
        cy.get("input").eq(0).type('notaemail');
        cy.get("input").eq(1).type('notapassword');
        cy.get("button").contains('Anmelden').click();
        cy.contains("Sie konnten nicht eingeloggt werden.");
    });
});