describe('Profile', () => {
    it('profile#1 Profile-Seite kann aufgerufen werden, wenn angemeldet', () => {
        cy.visit('http://localhost:3000/profile');
    });
    it('profile#2 Profile-Seite kann NICHT aufgerufen werden, wenn NICHT angemeldet', () => {

        //cy.visit('http://localhost:3000/profile');

    });
    it('profile#3 Profile-Seite kann nicht ohne Daten abgeschickt werden', () => {
        cy.visit('http://localhost:3000/profile');
        cy.get("input").eq(0).type('a');
        cy.get("input").eq(1).type('a');
        // cy.get("button").contains('Account speichern').click();
        // cy.contains("Bitte füllen Sie alle Pflichtfelder aus.");
    })
    it('profile#4 Profile-Seite wird mit gültigen Daten abgeschickt - Daten sind geändert - hier noch differenzieren', ()=> {

    })
    it('profile#5 Profile-Seite wird mit ungültigen Daten abgeschickt ', ()=> {

    })
    it('profile#6 Klicken auf "Abmelden" funktioniert', ()=>{

    })
    it('profile#07 Klicken auf "Passwort zurücksetzen" klappt', ()=> {

    })


});