describe('Profile', () => {
    beforeEach(() => {
        cy.fixture('users/testuser.json').then((user) => {
            cy.visit('http://localhost:3000/login');
            cy.get("input").eq(0).type(user.email);
            cy.get("input").eq(1).type(user.password);
            cy.get("button").contains('Anmelden').click();
            cy.wait(500);
            cy.getCookie('token').should('exist');
            cy.wait(500);
            cy.visit('http://localhost:3000/profile');
        });
    });

    it('profile#1 Profile-Seite kann aufgerufen werden, wenn angemeldet', () => {
        cy.get('h2').should('contain', 'Profil');
        cy.get('input').eq(0).invoke('attr', 'placeholder').should('contain', 'Vorname*');
        cy.get('input').eq(1).invoke('attr', 'placeholder').should('contain', 'Nachname*');
        cy.get('input').eq(2).invoke('attr', 'placeholder').should('contain', 'Telefonnummer');
        cy.get('input').eq(3).invoke('attr', 'placeholder').should('contain', 'E-Mail*');
        cy.get('input').eq(4).invoke('attr', 'placeholder').should('contain', 'Passwort*');
        cy.get("button").should('contain.text', 'Account speichern');
        cy.contains('Abmelden');
        cy.contains('Passwort vergessen?');
    });

    it('profile#2 Profile-Seite kann NICHT aufgerufen werden, wenn NICHT angemeldet', () => {
        cy.contains('Abmelden').click();
        cy.visit('http://localhost:3000/profile');
        cy.getCookie("token").should('be.null');
        cy.url().should('include', '/login');
    });

    it('profile#3 Profile-Seite kann nicht ohne Daten abgeschickt werden', () => {
        cy.get('input').eq(0).clear();
        cy.get('button').contains('Account speichern').click();
        cy.contains('Bitte füllen Sie alle Pflichtfelder aus.');
    });
    it('profile#4 Profile-Seite wird mit gültigen Daten abgeschickt - Daten sind geändert (und rückgängig gemacht)', () => {
        cy.get('input').eq(0).clear();
        cy.get('input').eq(1).clear();
        cy.get('input').eq(3).clear();
        cy.get('input').eq(4).clear();
        cy.fixture('users/testuser.json').then((user) => {
            let newFirstname = "new";
            cy.get("input").eq(0).type(newFirstname);
            cy.get("input").eq(1).type(user.lastName);
            cy.get("input").eq(3).type(user.email);
            cy.get("input").eq(4).type(user.password);
            cy.get('button').contains('Account speichern').click();
            cy.wait(500);
            cy.get('input').eq(0).should('have.value', newFirstname);
            cy.get('input').eq(1).should('have.value', user.lastName);
            cy.get('input').eq(3).should('have.value', user.email);

            cy.get('input').eq(0).clear();
            cy.get('input').eq(1).clear();
            cy.get('input').eq(2).clear();
            cy.get('input').eq(3).clear();
            cy.get('input').eq(4).clear();
            cy.get('input').eq(0).type(user.firstName);
            cy.get('input').eq(1).type(user.lastName);
            cy.get('input').eq(3).type(user.email);
            cy.get('input').eq(4).type(user.password);
            cy.get('button').contains('Account speichern').click();
            cy.wait(500);
        });
    });
    it('profile#5 invalid data should not be updated', () => {

        cy.get('input').eq(3).clear();
        cy.get('input').eq(3).type("invalid@email");
        cy.get('button').contains('Account speichern').click();
        cy.wait(500);

        cy.reload();
        cy.fixture('users/testuser.json').then((user) => {
            cy.get('input').eq(3).should('have.value', user.email);
        });
    });
    it('profile#6 Klicken auf "Abmelden" funktioniert', () => {
        cy.contains('Abmelden').click();
        cy.url().should('include', '/login');
        cy.getCookie("token").should('be.null');
    })
    it('profile#6 Klicken auf "Abmelden" nach Änderung ohne Speichern ändert nichts', () => {
        cy.fixture('users/testuser.json').then((user) => {

            cy.get('input').eq(0).clear();
            cy.contains('Abmelden').click();
            cy.url().should('include', '/login');
            cy.getCookie("token").should('be.null');

            cy.get('input').eq(0).type(user.email);
            cy.get('input').eq(1).type(user.password);
            cy.get('button').contains('Anmelden').click();
            cy.wait(500);
            cy.visit('http://localhost:3000/profile');
            cy.get('input').eq(0).should('have.value', user.firstName);
        });
    })
    it('profile#07 Klicken auf "Passwort zurücksetzen" funktioniert', () => {
        cy.contains('Passwort vergessen?').click();
        cy.url().should('include', '/reset');
    })


});