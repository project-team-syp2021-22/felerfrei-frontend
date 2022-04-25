// es wird ein Datensatz gebraucht:
// Email: v.koller@htlstp.at
//Passwort: Abc1234!
//Vorname: Vitschi
//der Rest ist beliebig
describe('Profile', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input').eq(0).type('v.koller@htlstp.at');
        cy.get('input').eq(1).type('Abc1234!');
        cy.get('button').contains('Anmelden').click();
        cy.wait(500);
        cy.visit('http://localhost:3000/profile');
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
        cy.url().should('include', '/login');
    });

    it('profile#3 Profile-Seite kann nicht ohne Daten abgeschickt werden', () => {
         cy.get('input').eq(0).clear();
         cy.get('button').contains('Account speichern').click();
         cy.contains('Bitte füllen Sie alle Pflichtfelder aus.');
    });
    it('profile#4 Profile-Seite wird mit gültigen Daten abgeschickt - Daten sind geändert (und rückgängig gemacht)', ()=> {
        cy.get('input').eq(0).clear();
        cy.get('input').eq(1).clear();
        cy.get('input').eq(2).clear();
        cy.get('input').eq(3).clear();
        cy.get('input').eq(4).clear();
        cy.get('input').eq(0).type("Vici");
        cy.get('input').eq(1).type("Zachhalmel");
        cy.get('input').eq(2).type("123456");
        cy.get('input').eq(3).type("v.koller@htlstp.ac.at");
        cy.get('input').eq(4).type("Abc1234!");
        cy.get('button').contains('Account speichern').click();
        cy.wait(500);
        cy.get('input').eq(0).should('have.value', 'Vici');
        cy.get('input').eq(1).should('have.value', 'Zachhalmel');
        cy.get('input').eq(2).should('have.value', '+1 234 56');
        cy.get('input').eq(3).should('have.value', 'v.koller@htlstp.ac.at');
        cy.get('input').eq(0).clear();
        cy.get('input').eq(1).clear();
        cy.get('input').eq(2).clear();
        cy.get('input').eq(3).clear();
        cy.get('input').eq(4).clear();
        cy.get('input').eq(0).type("Vitschi");
        cy.get('input').eq(1).type("Koller");
        cy.get('input').eq(2).type("123567");
        cy.get('input').eq(3).type("v.koller@htlstp.at");
        cy.get('input').eq(4).type("Abc1234!");
        cy.get('button').contains('Account speichern').click();
        cy.wait(500);

    });
    it('profile#5 Profile-Seite wird mit ungültigen Daten abgeschickt ', ()=> {

        cy.get('input').eq(2).clear();
        cy.get('input').eq(3).clear();
        cy.get('input').eq(4).clear();

        cy.get('input').eq(2).type("123456sdd asdfssasd");
        cy.get('input').eq(3).type("v.koller");
        cy.get('input').eq(4).type("Abc1234!");
        cy.get('button').contains('Account speichern').click();
        cy.wait(500);

        cy.get('input').eq(2).clear();
        cy.get('input').eq(3).clear();
        cy.get('input').eq(4).clear();
        cy.get('input').eq(2).type("123456");
        cy.get('input').eq(3).type("v.koller@htlstp.at");
        cy.get('input').eq(4).type("Abc1234!");
        cy.get('button').contains('Account speichern').click();
        cy.wait(500);
    });
    it('profile#6 Klicken auf "Abmelden" funktioniert', ()=>{
        cy.contains('Abmelden').click();
        cy.url().should('include', '/login');

    })
    it('profile#6 Klicken auf "Abmelden" nach Änderung ohne Speichern ändert nichts', ()=>{
        cy.get('input').eq(0).clear();
        cy.contains('Abmelden').click();
        cy.url().should('include', '/login');
        cy.get('input').eq(0).type('v.koller@htlstp.at');
        cy.get('input').eq(1).type('Abc1234!');
        cy.get('button').contains('Anmelden').click();
        cy.wait(500);
        cy.visit('http://localhost:3000/profile');
        cy.get('input').eq(0).should('have.value', 'Vitschi');
    })
    it('profile#07 Klicken auf "Passwort zurücksetzen" klappt', ()=> {
        cy.contains('Passwort vergessen?').click();
        cy.url().should('include', '/reset');
    })


});