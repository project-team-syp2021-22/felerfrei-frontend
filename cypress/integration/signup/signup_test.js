describe('Signup', () => {
    let first = false;
    it('signup#1 Page is available', () => {
        cy.visit('localhost:3000/signup');
    });

    beforeEach(() => {
        cy.visit('localhost:3000/signup');
    });

    it('signup#2 Signup page shows correct form', () => {
        cy.get('h2').should('contain', 'Signup');
        cy.get('input').eq(0).invoke('attr', 'placeholder').should('contain', 'Vorname');
        cy.get('input').eq(1).invoke('attr', 'placeholder').should('contain', 'Nachname');
        cy.get('input').eq(2).invoke('attr', 'placeholder').should('contain', 'Telefonnummer');
        cy.get('input').eq(3).invoke('attr', 'placeholder').should('contain', 'E-Mail');
        cy.get('input').eq(4).invoke('attr', 'placeholder').should('contain', 'Passwort');
        cy.get('input').eq(5).invoke('attr', 'placeholder').should('contain', 'Passwort bestätigen');
    });

    it('signup#3 Can not sign in if password is too short', () => {
        cy.get('input').eq(0).type('Max');
        cy.get('input').eq(1).type('Mustermann');
        cy.get('input').eq(2).type('0123456789');
        cy.get('input').eq(3).type('max.mustermann@gmail.com');
        cy.get('input').eq(4).type('12345678');
        cy.get('input').eq(5).type('12345678');
        cy.get('button').contains('Account anlegen').click();
        cy.contains("Passwort entspricht nicht den empfohlenen Vorgaben. Bitte verwenden Sie mindestens 8 Zeichen, einen Großbuchstaben, einen Kleinbuchstaben, eine Zahl und ein Sonderzeichen.");
    });

    it('signup#4 Can not sign in if firstname is empty', () => {
        cy.get('input').eq(0).clear();
        cy.get('input').eq(1).type('Mustermann');
        cy.get('input').eq(2).type('0123456789');
        cy.get('input').eq(3).type('max.mustermann@gmail.com');
        cy.get('input').eq(4).type('!Passwort123');
        cy.get('input').eq(5).type('!Passwort123');
        cy.get('button').contains('Account anlegen').click();
        cy.contains("Bitte füllen Sie alle Felder aus");
    });

    it('signpu#5 Can not sign in if lastname is empty', () => {
        cy.get('input').eq(0).type('Max');
        cy.get('input').eq(1).clear();
        cy.get('input').eq(2).type('0123456789');
        cy.get('input').eq(3).type('max.mustermann@gmail.com');
        cy.get('input').eq(4).type('!Passwort123');
        cy.get('input').eq(5).type('!Passwort123');
        cy.get('button').contains('Account anlegen').click();
        cy.contains("Bitte füllen Sie alle Felder aus");
    });

    it('signup#6 Can not sign in if Email is empty', () => {
        cy.get('input').eq(0).type('Max');
        cy.get('input').eq(1).type('Mustermann');
        cy.get('input').eq(2).type('0123456789');
        cy.get('input').eq(3).clear();
        cy.get('input').eq(4).type('!Passwort123');
        cy.get('input').eq(5).type('!Passwort123');
        cy.get('button').contains('Account anlegen').click();
        cy.contains("Bitte füllen Sie alle Felder aus");
    });

    it('signup#7 Can not sign in if password is empty', () => {
        cy.get('input').eq(0).type('Max');
        cy.get('input').eq(1).type('Mustermann');
        cy.get('input').eq(2).type('0123456789');
        cy.get('input').eq(3).type('max.mustermann@gmail.com');
        cy.get('input').eq(4).clear();
        cy.get('input').eq(5).type('!Passwort123');
        cy.get('button').contains('Account anlegen').click();
        cy.contains("Bitte füllen Sie alle Felder aus");
    });

    it('signup#8 Can not sign in if confirm password field is empty', () => {
        cy.get('input').eq(0).type('Max');
        cy.get('input').eq(1).type('Mustermann');
        cy.get('input').eq(2).type('0123456789');
        cy.get('input').eq(3).type('max.mustermann@gmail.com');
        cy.get('input').eq(4).type('!Passwort123');
        cy.get('input').eq(5).clear();
        cy.get('button').contains('Account anlegen').click();
        cy.contains("Bitte füllen Sie alle Felder aus");
    });

    it('signup#9 Can not sign in if password confirmation does not match original password', () => {
        cy.get('input').eq(0).type('Max');
        cy.get('input').eq(1).type('Mustermann');
        cy.get('input').eq(2).type('0123456789');
        cy.get('input').eq(3).type('max.mustermann@gmail.com');
        cy.get('input').eq(4).type('!Passwort123');
        cy.get('input').eq(5).type('!Passwort1234');
        cy.get('button').contains('Account anlegen').click();
        cy.contains("Passwörter stimmen nicht überein.");
    });

    it('signup#10 signup works', () => {
        cy.get('input').eq(0).type('Max');
        cy.get('input').eq(1).type('Mustermann');
        cy.get('input').eq(2).type('0123456789');
        cy.get('input').eq(3).type(`max${Date.now()}.mustermann@gmail.com`);
        cy.get('input').eq(4).type('!Passwort123');
        cy.get('input').eq(5).type('!Passwort123');
        cy.get('button').contains('Account anlegen').click();
        cy.contains("Erfolgreich registriert!");
        cy.get("button").eq(2).click();
    });
});