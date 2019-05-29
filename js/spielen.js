let aktuellerSpieler = 1, anzahlSpieler = 4, aktuellerWurf = 1, startPunktzahl = 501;
let spieler;
let wurfElemente_, spielerElemente_;
window.onload = function() {
    let punktButtons = document.querySelectorAll(".punktButton");
    punktButtons.forEach(x => x.addEventListener('click', function() {
        werfen(x.innerHTML.match(/\d+/g)[0]);
    }));

    initialisieren();
}

function initialisieren() {
    wurfElemente_ = document.getElementsByClassName("wurf");
    spielerElemente_ = document.getElementsByClassName("spielerkachel");
}

/*function spielEinstellungen() {
    let querystring = location.search;
    if (querystring == '') return;
    let wertestring = querystring.slice(1);
    let paare = wertestring.split("&");
    let paar, name, wert;
    for (var i = 0; i < paare.length; i++) {
        paar = paare[i].split("=");
        name = paar[0];
        wert = paar[1];
        name = unescape(name).replace("+", " ");
        wert = unescape(wert).replace("+", " ");
        spieler[name] = wert;
    }
}*/

function selectMultiplier(id, buchstabeFuerPunktButton) {
    if(switchSelectedElement(id, "multiplierButton", "ausgewaehlt")){
        buchstabeVorPunkteSchreiben(buchstabeFuerPunktButton, "punktButton");
    }
}

function switchSelectedElement(id, basicClass, ausgewaehltClass) {
    if(document.getElementById(id).className.includes(ausgewaehltClass)) return false; 

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
        if(item.className.length > className.length) continue; 

        let zahl = item.innerHTML.match(/\d+/g)[0];

        item.innerHTML = buchstabe + zahl;
    }
}

function werfen(punktzahl) {
    if(![0, 25, 50].includes(punktzahl)){
        punktzahl *= getMultiplier();
    }
    handleWurf(punktzahl);
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

function handleWurf(punktzahl) {
    
    datenEintragen(punktzahl);

    naechsterWurf();
}

function datenEintragen(punktzahl) {
    wurfElemente_[aktuellerWurf - 1].innerHTML = punktzahl;
    
    /* Punktzahl aktualisieren */
    let punkteSpan = document.getElementById("punkte" + aktuellerSpieler);
    let punktzahlNeu = Number(punkteSpan.innerHTML) - punktzahl;

    if(punktzahlNeu >= 0) {
        punkteSpan.innerHTML = punktzahlNeu.toString();
    }

    /* Anzahl Würfe aktualisieren */
    let wurfSpan = document.getElementById("wuerfe" + aktuellerSpieler);
    let wurfAnzahl = Number(wurfSpan.innerHTML) + 1;
    wurfSpan.innerHTML = wurfAnzahl.toString();

    /* Average aktualisieren */
    let averageSpan = document.getElementById("average" + aktuellerSpieler);
    averageSpan.innerHTML = ((startPunktzahl - punktzahlNeu) / wurfAnzahl).toFixed(2);

    /* Zu viel geworfen oder gewonnen? */
    if(punktzahlNeu < 0) {
        aktuellerWurf = 3;
    }else if(punktzahlNeu === 0 && aktuellerWurf === 3) {
        showSpielAbschluss();
    }
}

function showSpielAbschluss() {
    document.getElementById("spielAbschluss").style.display = "block";
}

function naechsterWurf() {
    aktuellerWurf = aktuellerWurf === 3 ? 1 : aktuellerWurf + 1;

    switchSelectedElement(wurfElemente_[aktuellerWurf - 1].id, "wurf", "ausgewaehlt");

    if(aktuellerWurf === 1){
        /* Punktzahlen der Würfe nullen */
        wuerfeNullen();
        naechsterSpieler();
    }
}

function wuerfeNullen() {
    for(let i = 0; i < wurfElemente_.length; i++) {
        wurfElemente_[i].innerHTML = 0;
    }
}

function naechsterSpieler() {
    let spieler = document.getElementsByClassName("spielerkachel");

    aktuellerSpieler = aktuellerSpieler === anzahlSpieler ? 1 : aktuellerSpieler + 1;

    switchSelectedElement(spielerElemente_[aktuellerSpieler - 1].id, "spielerkachel", "ausgewaehlt");
}
