'use strict';
let aktuellerSpieler = 1, anzahlSpieler = 4, aktuellerWurf = 1, startPunktzahl = 501, punktZahlVorErstemWurf = 0;
const platzhalter = -1, anzahlGespeicherteLetzteWuerfe = 3; 
//let letzteWuerfe = [];
let spieler = [];
let wurfElemente_, spielerElemente_;
class Spieler {
    constructor(name) {
        this.name_ = name;
        this.letzteWuerfe_ = [platzhalter, platzhalter, platzhalter];
        this.punktzahl_ = startPunktzahl;
        this.anzahlWuerfe_ = 0;
        this.average_ = 0;
    }

    wurfEintragen(punktzahl) {
        /*this.letzteWuerfe_.unshift(punktzahl);
        this.letzteWuerfe_.pop();*/

        this.punktzahl_ -= punktzahl;
        this.letzteWuerfe_[3 - aktuellerWurf] = punktzahl;
        this.anzahlWuerfe_++;
        this.average_ = (startPunktzahl - this.punktzahl_) / this.anzahlWuerfe_;

        if(this.punktzahl_ < 0) rollback;
    }

    undoLastThrow() {
        let punktzahl, i = 0;
        do {
            punktzahl = this.letzteWuerfe_[i];
            i++;
        }while(punktzahl === platzhalter && !(i === this.letzteWuerfe_.length))

        if(punktzahl === platzhalter) return false;
        
        let index = i - 1;
        this.letzteWuerfe_[index] = platzhalter;
        this.punktzahl_ += punktzahl;
        this.anzahlWuerfe_--;
        this.average_ = this.anzahlWuerfe_ > 0 ? (startPunktzahl - this.punktzahl_) / this.anzahlWuerfe_ : 0; 

        aktuellerWurf = 3 - index;
        
        return true;      
    }

    rollBack() {
        for(let i = 0; i < 3; i++) {
            let punktzahl = this.letzteWuerfe_[i];
            if(punktzahl !== platzhalter) {
                this.punktzahl_ += punktzahl;
            }
        }

        aktuellerWurf = 3;
    }

    punktzahl() {
        return this.punktzahl_;
    }

    average() {
        return this.average_;
    }

    anzahlWuerfe() {
        return this.anzahlWuerfe_;
    }

    letzteWuerfe() {
        return this.letzteWuerfe_;
    }
}
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
    /*for(let i = 1; i <= 5; i++) {
        letzteWuerfe.push(platzhalter);
    }*/
    for(let i = 1; i <= anzahlSpieler; i++) {
        spieler.push(new Spieler("Spieler " + i)) 
    }
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
    
    datenEintragen2(punktzahl);

    naechsterWurf();
}

/*function datenEintragen(punktzahl) {
    wurfElemente_[aktuellerWurf - 1].innerHTML = punktzahl;
    
    //Letzte Würfe aktualisieren
    letzteWuerfe.pop();
    letzteWuerfe.unshift(punktzahl);

    // Punktzahl aktualisieren 
    let punkteSpan = document.getElementById("punkte" + aktuellerSpieler);
    let punktzahlGesamtAlt = Number(punkteSpan.innerHTML);
    if(aktuellerWurf === 1) {
        punktZahlVorErstemWurf = punktzahlGesamtAlt;
    }
    let punktzahlGesamtNeu = punktzahlGesamtAlt - punktzahl;

    if(punktzahlGesamtNeu >= 0) {
        punkteSpan.innerHTML = punktzahlGesamtNeu.toString();
    }else {
        punkteSpan.innerHTML = punktZahlVorErstemWurf.toString();
    }

    // Anzahl Würfe aktualisieren 
    let wurfSpan = document.getElementById("wuerfe" + aktuellerSpieler);
    let wurfAnzahl = Number(wurfSpan.innerHTML) + 1;
    wurfSpan.innerHTML = wurfAnzahl.toString();

    // Average aktualisieren 
    let averageSpan = document.getElementById("average" + aktuellerSpieler);
    averageSpan.innerHTML = ((startPunktzahl - punktzahlGesamtNeu) / wurfAnzahl).toFixed(2);

    // Zu viel geworfen oder gewonnen? 
    if(punktzahlNeu < 0) {
        aktuellerWurf = 3;
    }else if(punktzahlGesamtNeu === 0) {
        showSpielAbschluss();
    }
}*/

function datenEintragen2(punktzahl) {
    let spielerAktuell = spieler[aktuellerSpieler - 1];
    spielerAktuell.wurfEintragen(punktzahl);

    anzeigeAktualisieren(spielerAktuell, punktzahl);
}

function anzeigeAktualisieren(zuAktualisierenderSpieler, geworfenePunkte) {
    wurfElemente_[aktuellerWurf - 1].innerHTML = geworfenePunkte.toString();
    document.getElementById("punkte" + aktuellerSpieler).innerHTML = zuAktualisierenderSpieler.punktzahl().toString();
    document.getElementById("wuerfe" + aktuellerSpieler).innerHTML = zuAktualisierenderSpieler.anzahlWuerfe().toString();
    document.getElementById("average" + aktuellerSpieler).innerHTML = zuAktualisierenderSpieler.average().toFixed(2);

    if(zuAktualisierenderSpieler.punktzahl() === 0) {
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
        // Punktzahlen der Würfe nullen 
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
    aktuellerSpieler = aktuellerSpieler === anzahlSpieler ? 1 : aktuellerSpieler + 1;

    switchSelectedElement(spielerElemente_[aktuellerSpieler - 1].id, "spielerkachel", "ausgewaehlt");
}

function undo() {
    let spielerLetzterWurfNummer = aktuellerWurf === 1 ? aktuellerSpieler - 1 : aktuellerSpieler;
    let spielerLetzterWurf = spieler[spielerLetzterWurfNummer - 1];
    if(spielerLetzterWurf.undoLastThrow()) {
        switchSelectedElement(wurfElemente_[aktuellerWurf - 1].id, "wurf", "ausgewaehlt");
        if(spielerLetzterWurfNummer !== aktuellerSpieler) {
            aktuellerSpieler = spielerLetzterWurfNummer;
            switchSelectedElement(spielerElemente_[aktuellerSpieler - 1].id, "spielerkachel", "ausgewaehlt");
        }
        let letzteWuerfe = spielerLetzterWurf.letzteWuerfe();
        for(let i = 0; i < letzteWuerfe.length; i++) {
            let punktzahl = letzteWuerfe[2-i];
            wurfElemente_[i].innerHTML = punktzahl !== platzhalter ? punktzahl : 0;
        }

        anzeigeAktualisieren(spielerLetzterWurf, 0);
    }
}
