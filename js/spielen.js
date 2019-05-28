let aktuellerSpieler = 1, anzahlSpieler = 4, aktuellerWurf = 1;

function selectMultiplier(id, buchstabeFuerPunktButton) {
    if(switchSelectedElement(id, "multiplierButton", "ausgewaehlt")){
        buchstabeVorPunkteSchreiben(buchstabeFuerPunktButton, "punktButton");
    }
}

function switchSelectedElement(id, basicClass, ausgewaehltClass) {
    if(document.getElementById(id).className.includes(ausgewaehltClass)){ return false; }

    let elemente = document.getElementsByClassName(basicClass + " " + ausgewaehltClass);

    if(elemente.length > 1){ 
        console.log("Mehrere ausgewählte Elemente");
        return false;
    }

    if(elemente.length > 0) {
        elemente.item(0).className = basicClass;
    }

    document.getElementById(id).className = basicClass + " " + ausgewaehltClass;

    return true;
}

function buchstabeVorPunkteSchreiben(buchstabe, className) {
    let buttons = document.getElementsByClassName(className);

    for(let i = 0; i < buttons.length; i++) {
        let item = buttons.item(i);
        /* Verhindern, dass untere Reihe mit geändert wird */ 
        if(item.className.length > className.length){ continue; }

        let zahl = item.innerHTML.match(/\d+/g)[0];

        item.innerHTML = buchstabe + zahl;
    }
}

function werfen(punktzahl) {
    if(![0, 25, 50].includes(punktzahl)){
        punktzahl *= getMultiplier();
    }
    naechsterWurf(punktzahl);
}

function naechsterWurf(punktzahl) {
    let wuerfe = document.getElementsByClassName("wurf");

    wuerfe[aktuellerWurf - 1].innerHTML = punktzahl;

    aktuellerWurf = aktuellerWurf === 3 ? 1 : aktuellerWurf + 1;

    switchSelectedElement(wuerfe[aktuellerWurf - 1].id, "wurf", "ausgewaehlt");

    if(aktuellerWurf === 1){
        /* Punktzahlen der Würfe nullen */
        wuerfeNullen(wuerfe);
        naechsterSpieler();
    }
}

function getMultiplier() {
    let id = document.getElementsByClassName("multiplierButton ausgewaehlt").item(0).id;

    let result;
    switch(id){
        case 'single':
            result = 1; break;
        case 'double':
            result = 2; break;
        default: 
            result = 3; 
    }

    return result;
}

function wuerfeNullen(wuerfe) {
    for(let i = 0; i < wuerfe.length; i++) {
        wuerfe[i].innerHTML = 0;
    }
}

function naechsterSpieler() {
    let spieler = document.getElementsByClassName("spielerkachel");

    aktuellerSpieler = aktuellerSpieler === anzahlSpieler ? 1 : aktuellerSpieler + 1;

    switchSelectedElement(spieler[aktuellerSpieler - 1].id, "spielerkachel", "ausgewaehlt");
}
