'use strict';

const platzhalter = -1, indexErsterWurf = 2, indexLetzterWurf = 0; 
const inOut = {
    single: 1,
    double: 2,
    master: 3
}

const spielerParam = 'spieler', legsParam = 'legs', setsParam = 'sets', punkteParam = 'punktzahl', 
      inParam = 'in', outParam = 'out';

// Variablen für den Ablauf des Spiels
let aktuellerSpieler = 1, aktuellerWurf = 1, aktuellesLeg = 1, aktuellesSet = 1;

// Spiel-Einstellungen
let einstellungen = {
    spielerzahl : {key: spielerParam, value: 2},
    legs : {key: legsParam, value: 1},
    sets : {key: setsParam, value: 1},
    punkte : {key: punkteParam, value: 501},
    wurfIn : {key: inParam, value: inOut.single},
    wurfOut : {key: outParam, value: inOut.double}
}

let spieler_ = [], sieger_ = [];
let wurfElemente_, spielerElemente_;
class Spieler {
    constructor(name) {
        this.name_ = name;
        this.letzteWuerfe_ = [platzhalter, platzhalter, platzhalter];
        this.punktzahl_ = einstellungen.punkte.value;
        this.anzahlWuerfe_ = 0;
        this.average_ = 0;
        this.zurueckgesetzt_ = false;
    }

    wurfEintragen(punktzahl) {

        // checken, ob der erste Wurf richtig gemacht wurde
        if(this.anzahlWuerfe_ === 0) {
            if(!inOutKorrekt(true, punktzahl)) {
                aktuellerWurf = 3;
                // damit undo noch klappt
                this.letzteWuerfe_[indexErsterWurf] = 0;
                return;
            }
        }

        this.punktzahl_ -= punktzahl;
        this.letzteWuerfe_[3 - aktuellerWurf] = punktzahl;
        this.anzahlWuerfe_++;
        this.average_ = (einstellungen.punkte.value - this.punktzahl_) / this.anzahlWuerfe_;

        if(this.punktzahl_ < 0) {
            this.rollBack();
        }else {
            if(this.zurueckgesetzt_ === true) {
            this.zurueckgesetzt_ = false;
            }

            // checken, ob der letzte Wurf richtig gemacht wurde
            if(this.punktzahl_ === 0) {
                if(!inOutKorrekt(false, punktzahl)){
                    this.rollBack();
                }
            }
        }
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
        if(this.zurueckgesetzt_) {
            let punktzahlVorherigeWuerfe = 0;
            for(i = 2; i > index; i--) {
                punktzahlVorherigeWuerfe += this.letzteWuerfe_[i];
            }
            this.punktzahl_ -= (punktzahlVorherigeWuerfe);
            this.zurueckgesetzt_ = false;
        }else {
            this.punktzahl_ += punktzahl;
        }
        // damit undo beim ersten Wurf funktioniert, Abfrage, ob Anzahl Würfe größer 0   
        if(this.anzahlWuerfe_ > 0){
            this.anzahlWuerfe_--;
        }
        this.average_ = this.anzahlWuerfe_ > 0 ? (einstellungen.punkte.value - this.punktzahl_) / this.anzahlWuerfe_ : 0; 

        aktuellerWurf = 3 - index;
        
        return true;      
    }

    rollBack() {
        for(let i = indexErsterWurf; i >= indexLetzterWurf; i--) {
            if((indexErsterWurf - i) <= (aktuellerWurf - 1)) {
                let punktzahl = this.letzteWuerfe_[i];
                if(punktzahl !== platzhalter) {
                    console.log(punktzahl);
                    this.punktzahl_ += punktzahl;
                }
            }else {
                this.letzteWuerfe_[i] = platzhalter;
            }
        }

        aktuellerWurf = 3;
        this.zurueckgesetzt_ = true;
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

    name() {
        return this.name_;
    }
}

window.onload = function() {
    spielEinstellungen();

    initialisieren();

    let punktButtons = document.querySelectorAll(".punktButton");
    punktButtons.forEach(x => x.addEventListener('click', function() {
        werfen(Number(x.innerHTML.match(/\d+/g)[0]));
    }));
}

function initialisieren() {
    wurfElemente_ = document.getElementsByClassName("wurf");
    spielerElemente_ = document.getElementsByClassName("spielerkachel");
    for(let i = 1; i <= einstellungen.spielerzahl.value; i++) {
        spieler_.push(new Spieler("Spieler " + i)); 
        // Spieler-Kacheln sichtbar machen
        spielerElemente_[i - 1].style.display = 'inline-block';

        anzeigeAktualisieren(i, 0);
    }

}

function spielEinstellungen() {
    let querystring = location.search;
    if (querystring == '') return;
    let wertestring = querystring.slice(1);
    let paare = wertestring.split(";");
    let paar, key, value;
    for (var i = 0; i < paare.length; i++) {
        paar = paare[i].split("=");
        key = paar[0];
        value = Number(paar[1]);

        //name = unescape(name).replace("+", " ");
        //wert = unescape(wert).replace("+", " ");
        
        for(let prop in einstellungen){
            if(einstellungen[prop].key == key && einstellungen.hasOwnProperty(prop)){
                einstellungen[prop].value = value;
                break;
            }
        }
    }
}

function inOutKorrekt(inWurf, punktzahl){
    let multiplier = getMultiplier(), wurfKorrekt = true;
    let einstellung = inWurf ? einstellungen.wurfIn.value : einstellungen.wurfOut.value;

    if(einstellung === inOut.single){

    }else if(einstellung === inOut.double){
        if(!((multiplier === 2 && ![0, 25].includes(punktzahl)) || punktzahl === 50)){
            wurfKorrekt = false;
        }
    }else {
        if((multiplier === 1 && punktzahl !== 50) || [0, 25].includes(punktzahl)){
            wurfKorrekt = false;
        }
    }

    return wurfKorrekt;
}

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
    let spielerAktuell = spieler_[aktuellerSpieler - 1];
    spielerAktuell.wurfEintragen(punktzahl);

    anzeigeAktualisieren(aktuellerSpieler, punktzahl);
}

/*function anzeigeAktualisieren(zuAktualisierenderSpieler, geworfenePunkte) {
    wurfElemente_[aktuellerWurf - 1].innerHTML = geworfenePunkte.toString();
    document.getElementById("punkte" + aktuellerSpieler).innerHTML = zuAktualisierenderSpieler.punktzahl().toString();
    document.getElementById("wuerfe" + aktuellerSpieler).innerHTML = zuAktualisierenderSpieler.anzahlWuerfe().toString();
    document.getElementById("average" + aktuellerSpieler).innerHTML = zuAktualisierenderSpieler.average().toFixed(2);

    if(zuAktualisierenderSpieler.punktzahl() === 0) {
        showSpielAbschluss(zuAktualisierenderSpieler);
    }
}*/

function anzeigeAktualisieren(zuAktualisierenderSpielerNr, geworfenePunkte) {
    wurfElemente_[aktuellerWurf - 1].innerHTML = geworfenePunkte.toString();

    let zuAktualisierenderSpieler = spieler_[zuAktualisierenderSpielerNr - 1];
    document.getElementById("punkte" + zuAktualisierenderSpielerNr).innerHTML = zuAktualisierenderSpieler.punktzahl().toString();
    document.getElementById("wuerfe" + zuAktualisierenderSpielerNr).innerHTML = zuAktualisierenderSpieler.anzahlWuerfe().toString();
    document.getElementById("average" + zuAktualisierenderSpielerNr).innerHTML = zuAktualisierenderSpieler.average().toFixed(2);

    if(zuAktualisierenderSpieler.punktzahl() === 0) {
        showSpielAbschluss(zuAktualisierenderSpieler);
    }
}

function showSpielAbschluss(sieger) {
    document.getElementById("spielAbschluss").style.display = "block";

    let text = sieger.name() + " gewinnt ";
    if(einstellungen.legs.value > 1){
        if(einstellungen.sets.value > 1){

        }
    }else if(einstellungen.sets.value > 1) {

    }else {
        text += "das Spiel!";
    }

    document.getElementById("spielAbschlussText").innerHTML = text;
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
    aktuellerSpieler = aktuellerSpieler === einstellungen.spielerzahl.value ? 1 : aktuellerSpieler + 1;

    switchSelectedElement(spielerElemente_[aktuellerSpieler - 1].id, "spielerkachel", "ausgewaehlt");
}

function undo() {
    let spielerLetzterWurfNummer = aktuellerWurf === 1 ? (aktuellerSpieler === 1 ? einstellungen.spielerzahl.value : aktuellerSpieler - 1) : 
                                   aktuellerSpieler;
    let spielerLetzterWurf = spieler_[spielerLetzterWurfNummer - 1];
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
        
        anzeigeAktualisieren(spielerLetzterWurfNummer, 0);
    }
}
