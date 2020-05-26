'use strict';

// ------------------------------------------- Globale Variablen -------------------------------------------------------------------
const platzhalter = -1, indexErsterWurf = 2, indexLetzterWurf = 0, unsichtbarClass_ = 'unsichtbar'; 

const Gewinn = {
    Leg: 0,
    Set: 1,
    Match: 2
}

const spielerParam = 'spieler', legsParam = 'legs', setsParam = 'sets', punkteParam = 'punktzahl', 
      inParam = 'in', outParam = 'out';

// Variablen für den Ablauf des Spiels
let aktuellerSpieler = 1, aktuellerWurf = 1, aktuellesLeg = 1, aktuellesSet = 1;

// Spiel-Einstellungen
let einstellungen = {
    spieler: [{name: 'Spieler 1', istAngemeldet: false}, {name: 'Spieler 2', istAngemeldet: false}],
    modus: Spielmodus.Normal,
    legs: 1,
    sets: 1,
    punkte: 501,
    wurfIn: inOut.single,
    wurfOut: inOut.double
}

let spieler_ = [], sets_ = [];
let wurfElemente_, spielerElemente_;

// in Sekunden
let dauerLeg = 0;

// ----------------------------------------------------- Klassen --------------------------------------------------------------
class Spieler {
    constructor(name, istAngemeldet) {
        this.name_ = name;
        this.istAngemeldet_ = istAngemeldet;
        this.letzteWuerfe_ = [neuesWurfSet()];
        this.punktzahl_ = einstellungen.punkte;
        this.anzahlWuerfe_ = 0;
        this.average_ = 0;
        this.legStatistiken_ = [];
    }

    wurfEintragen(punktzahl) {
        //console.log('Anzahl Wurfsets vor Eintragung: ' + (this.aktuellesWurfSet() + 1));
        // checken, ob der erste Wurf richtig gemacht wurde
        if(this.anzahlWuerfe_ === 0) {
            if(!inOutKorrekt(true, punktzahl)) {
                aktuellerWurf = 3;
                // damit undo noch klappt
                this.letzteWuerfe_[this.aktuellesWurfSet()][indexErsterWurf].punktzahl = 0;
                this.letzteWuerfe_.push(neuesWurfSet());
                return;
            }
        }

        this.punktzahl_ -= punktzahl;
        this.letzteWuerfe_[this.aktuellesWurfSet()][3 - aktuellerWurf].punktzahl = punktzahl;
        this.anzahlWuerfe_++;
                
        if(this.punktzahl_ < 0) {
            this.rollBack();
        }else {
            // checken, ob der letzte Wurf richtig gemacht wurde
            if(this.punktzahl_ === 0) {
                if(!inOutKorrekt(false, punktzahl)){
                    this.rollBack();
                }
            }
            
            if(this.punktzahl_ === 1 && einstellungen.wurfOut !== inOut.single) {
                this.rollBack();
            }
        }

        this.setAverage();

        if(aktuellerWurf === 3){
            this.letzteWuerfe_.push(neuesWurfSet())
        }
        //console.log('Anzahl Wurfsets nach Eintragung: ' + (this.aktuellesWurfSet() + 1));
    }

    undoLastThrow() {
        let punktzahl, i = wurfDavor(indexErsterWurf - (aktuellerWurf - 1)), zuEnde = false, zurueckgegangen = 0;
        let indexWurfSet = this.aktuellesWurfSet();
        if(i === indexLetzterWurf) indexWurfSet--;

        if(indexWurfSet < 0) return false;

        do {
            punktzahl = this.letzteWuerfe_[indexWurfSet][i].punktzahl;
            console.log(punktzahl);
            if(indexWurfSet === 0 && i === indexErsterWurf) {
                zuEnde = true;
            };

            i = wurfDavor(i);
            if(i === indexLetzterWurf){
                indexWurfSet--;
            }
            zurueckgegangen++;
        }while(punktzahl === platzhalter && !zuEnde)

        if(punktzahl === platzhalter) return false;
        
        i = wurfDanach(i);
        if(i  === indexErsterWurf){
            indexWurfSet++;
        }
        
        this.letzteWuerfe_[indexWurfSet][i].punktzahl = platzhalter;
        if(this.letzteWuerfe_[indexWurfSet][i].ueberworfen) {
            let punktzahlVorherigeWuerfe = 0;
            for(let index = indexErsterWurf; index > i; index--) {
                punktzahlVorherigeWuerfe += this.letzteWuerfe_[indexWurfSet][index].punktzahl;
            }
            this.punktzahl_ -= (punktzahlVorherigeWuerfe);
            this.letzteWuerfe_[indexWurfSet][i].ueberworfen = false;
        }else {
            this.punktzahl_ += punktzahl;
        }
        // damit undo beim ersten Wurf funktioniert, Abfrage, ob Anzahl Würfe größer 0   
        if(this.anzahlWuerfe_ > 0){
            this.anzahlWuerfe_ -= zurueckgegangen;
        }
        
        aktuellerWurf = 3 - i;

        this.setAverage();
                
        for(let j = this.aktuellesWurfSet(); j > indexWurfSet; j--){
            this.letzteWuerfe_.pop();
        }
        
        console.log('Aktuelles Wurfset nach Undo:' + (this.aktuellesWurfSet() + 1));
        return true;      
    }

    rollBack() {
        this.letzteWuerfe_[this.aktuellesWurfSet()][3 - aktuellerWurf].ueberworfen = true;

        for(let i = indexErsterWurf; i >= indexLetzterWurf; i--) {
            if((indexErsterWurf - i) <= (aktuellerWurf - 1)) {
                let punktzahl = this.letzteWuerfe_[this.aktuellesWurfSet()][i].punktzahl;
                if(punktzahl !== platzhalter) {
                    console.log(punktzahl);
                    this.punktzahl_ += punktzahl;
                }
            }
        }

        this.anzahlWuerfe_ += 3 - aktuellerWurf;
        aktuellerWurf = 3;
    }

    werteZurueckSetzen() {
        this.legStatistiken_.push(new SpielerStatistik(this.average_, this.letzteWuerfe_, this.punktzahl_));

        this.anzahlWuerfe_ = 0;
        this.average_ = 0;
        this.letzteWuerfe_ = [neuesWurfSet()];
        this.punktzahl_ = einstellungen.punkte;
    }

    setAverage() {
        if(this.anzahlWuerfe_ > 0){
            this.average_ = (einstellungen.punkte - this.punktzahl_) / this.anzahlWuerfe_ * 3;
        }else {
            this.average_ = 0;
        }
                   
    }

    aktuellesWurfSet() {
        return this.letzteWuerfe_.length - 1;
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
        return this.letzteWuerfe_[this.aktuellesWurfSet()];
    }

    name() {
        return this.name_;
    }

    istAngemeldet() {return this.istAngemeldet_}

    legStatistik(index) {
        return this.legStatistiken_[index];
    }
}

class Set {
    constructor() {
        //this.setNr_ = nr;
        this.siegerLegs_ = [];
        this.dauerLegs_ = [];
        this.sieger_ = platzhalter;
    }

    neuerSieger(spielerIndex) {
        if(this.siegerLegs_.length === einstellungen.legs || this.sieger_ !== platzhalter) {
            console.log('Zu viele Sieger bzw. Sieger des Sets schon gefunden');
            return;
        }

        this.siegerLegs_.push(spielerIndex);
        this.dauerLegs_.push(dauerLeg);
        if(this.anzahlSiege(spielerIndex) > einstellungen.legs / 2){
            this.sieger_ = spielerIndex;
        }
    }

    anzahlSiege(spielerIndex) {
        let result = 0;
        for(let i = 0; i < this.siegerLegs_.length; i++){
            if(this.siegerLegs_[i] === spielerIndex) result++;
        }

        return result;
    }

    anzahlAbgeschlosseneLegs() {
        return this.siegerLegs_.length;
    }

    sieger() {
        return this.sieger_;
    }

    dauerLeg(index) {
        return this.dauerLegs_[index];
    }
}

class Wurf {
    constructor(punktzahl) {
        this.punktzahl = punktzahl;
        this.ueberworfen = false;
    }
}

class SpielerStatistik {
    constructor(average, wuerfe, punktzahl) {
        this.average_ = average;
        this.punktzahl_ = punktzahl;
        this.wuerfe_ = wuerfe; 
    }

    average() {return this.average_}

    punktzahl() {return this.punktzahl_}

    wuerfeGesamt() {
        //let length = this.wuerfe_.length;
        //return length * 3 - this.wuerfe_[length - 1].filter((x) => x.punktzahl !== platzhalter).length;

        return this.anzahlWuerfeMitFilter(x => x.punktzahl !== platzhalter);
    }

    ueberworfen() {
        return this.anzahlWuerfeMitFilter(x => x.ueberworfen === true);
    }

    nullWuerfe() {
        return this.anzahlWuerfeMitFilter(x => x.punktzahl === 0);
    }

    hundertAchtziger() {
        return this.wuerfe_.filter(x => {
                    return x.filter(y => y.punktzahl === 60).length === 3;
                }).length;
    }

    anzahlWuerfeMitFilter(filterFunc) {
        let result = 0;
        this.wuerfe_.forEach(x => {
            result += x.filter(filterFunc).length;
        });

        return result;
    }
}


// ------------------------------------------------- Initialisieren der Seite -----------------------------------------------
$(document).ready(function(){
    spielEinstellungen();

    initialisieren();
    
    $(".punktButton").each(function(index, element) {
        let zahl = Number(element.innerHTML);
         $(element).click(() => werfen(zahl));
    })

    setInterval(() => dauerLeg += 5, 5000);
})

  
function spielEinstellungen() {
    let querystring = location.search;
    if (querystring == '') return;
    let wertestring = querystring.slice(1);
    /*let paare = wertestring.split(";");
    let paar, key, value;
    for (let i = 0; i < paare.length; i++) {
        paar = paare[i].split("=");
        key = paar[0];
        value = paar[1];
        
        if(key === spielerParam) {
            einstellungen.spieler.value = [];
            let namen = value.split(',');
            for(let j = 0; j < namen.length; j++) {
                name = decodeURIComponent(namen[j]);
                einstellungen.spieler.value.push(name.trim())
            }
        }else {
            value = Number(value);
            for(let prop in einstellungen){
                if(einstellungen[prop].key == key && einstellungen.hasOwnProperty(prop)){
                    einstellungen[prop].value = value;
                    break;
                }
            }
        }
    }*/
    try {
        let json = JSON.parse(decodeURI(wertestring));
        einstellungen = json;
    } catch (error) {}       
    
}

function initialisieren() {
    document.getElementById('spielart').innerHTML = 'Normales Spiel';
    
    let beschreibungsText = "Die Spieler werfen der Reihe nach jeweils drei Darts. Wer zuerst null Punkte hat, gewinnt. <br>";
    beschreibungsText += 'Regeln: Best of ' + einstellungen.sets + ' Sets, Best of ' + einstellungen.legs +
                         ' Legs, ' +  inOutString(einstellungen.wurfIn) + ' In, ' + inOutString(einstellungen.wurfOut) +
                         ' Out';
    document.getElementById('spielbeschreibung').innerHTML = beschreibungsText;
    
    wurfElemente_ = document.getElementsByClassName("wurf");
    spielerElemente_ = document.getElementsByClassName("spielerkachel");
    for(let i = 1; i <= einstellungen.spieler.length; i++) {
        let spielerObj = einstellungen.spieler[i - 1];
        spieler_.push(new Spieler(spielerObj.name, spielerObj.istAngemeldet)); 
        // Spieler-Kacheln sichtbar machen
        document.getElementById('name' + i).innerHTML = spielerObj.name;
        anzeigeAktualisieren(i, 0);

        spielerElemente_[i - 1].style.display = 'inline-block';
              
    }

    sets_.push(new Set())

}

function inOutString(value) {
    let result;
    switch(value) {
        case inOut.single:
            result = 'Single'; break;
        case inOut.double:
            result = 'Double'; break;
        case inOut.master:
            result = 'Master'; break;
        default:
            result = 'falscher Wert'
    }

    return result;
}

// ------------------------------------------- Funktionen für den Spielablauf ----------------------------------------------------
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

function anzeigeAktualisieren(zuAktualisierenderSpielerNr, geworfenePunkte) {
    wurfElemente_[aktuellerWurf - 1].innerHTML = geworfenePunkte.toString();

    let zuAktualisierenderSpieler = spieler_[zuAktualisierenderSpielerNr - 1];
    document.getElementById("punkte" + zuAktualisierenderSpielerNr).innerHTML = zuAktualisierenderSpieler.punktzahl().toString();
    document.getElementById("wuerfe" + zuAktualisierenderSpielerNr).innerHTML = zuAktualisierenderSpieler.anzahlWuerfe().toString();
    document.getElementById("average" + zuAktualisierenderSpielerNr).innerHTML = zuAktualisierenderSpieler.average().toFixed(2);

    if(zuAktualisierenderSpieler.punktzahl() === 0) {
        showSpielAbschluss(zuAktualisierenderSpielerNr - 1);
    }
}

function naechsterWurf() {
    aktuellerWurf = aktuellerWurf === 3 ? 1 : aktuellerWurf + 1;

    changeWurfElement(aktuellerWurf);

    if(aktuellerWurf === 1){
        // Punktzahlen der Würfe nullen 
        wuerfeNullen();
        naechsterSpieler();
    }
}

function changeWurfElement(wurfNr) {
    switchSelectedElement(wurfElemente_[wurfNr - 1].id, "wurf", "ausgewaehlt");
}

function naechsterSpieler() {
    aktuellerSpieler = aktuellerSpieler === einstellungen.spieler.length ? 1 : aktuellerSpieler + 1;

    changeSpielerElement(aktuellerSpieler);
}

function changeSpielerElement(spielerNr) {
    switchSelectedElement(spielerElemente_[spielerNr - 1].id, "spielerkachel", "ausgewaehlt");
}

function wuerfeNullen() {
    for(let i = 0; i < wurfElemente_.length; i++) {
        wurfElemente_[i].innerHTML = 0;
    }
}

function undo() {
    let spielerLetzterWurfNummer = aktuellerWurf === 1 ? (aktuellerSpieler === 1 ? einstellungen.spieler.length : aktuellerSpieler - 1) : 
                                   aktuellerSpieler;
    let spielerLetzterWurf = spieler_[spielerLetzterWurfNummer - 1];
    if(spielerLetzterWurf.undoLastThrow()) {
        changeWurfElement(aktuellerWurf);
        if(spielerLetzterWurfNummer !== aktuellerSpieler) {
            aktuellerSpieler = spielerLetzterWurfNummer;
            changeSpielerElement(aktuellerSpieler);
        }
        let letzteWuerfe = spielerLetzterWurf.letzteWuerfe();
        for(let i = 0; i < wurfElemente_.length; i++) {
            let punktzahl = letzteWuerfe[indexErsterWurf-i].punktzahl;
            wurfElemente_[i].innerHTML = punktzahl !== platzhalter ? punktzahl : 0;
        }
        
        anzeigeAktualisieren(spielerLetzterWurfNummer, 0);
    }
}

function selectMultiplier(id, buchstabeFuerPunktButton) {
    if(switchSelectedElement(id, "multiplierButton", "ausgewaehlt")){
        buchstabeVorPunkteSchreiben(buchstabeFuerPunktButton, "punktButton");
    }
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


// --------------------------------------------- Spiel-Abschluss -------------------------------------------------------
function showSpielAbschluss(siegerIndex) {
    // Timer für Dauer des Legs beenden
    clearInterval();

    sets_[aktuellesSet - 1].neuerSieger(siegerIndex);
    
    let gewinn = gewinnErmitteln(siegerIndex);
    
    let sieger = spieler_[siegerIndex];
    let text = sieger.name() + " gewinnt ";
    text += gewinn === Gewinn.Match ? 'das Spiel!' : gewinn === Gewinn.Set ? 'das Set!' : 'das Leg!';

    document.getElementById("spielAbschlussText").innerHTML = text;

    const ids = ["gifLeg", "gifSet", "gifMatch"];
    let anzeigeGif = gewinn === Gewinn.Match ? 'gifMatch' : gewinn === Gewinn.Set ? 'gifSet' : 'gifLeg';
    ids.forEach(function(x) {
                    if(x === anzeigeGif){
                        document.getElementById(x).classList.remove(unsichtbarClass_);
                    }else {
                        document.getElementById(x).classList.add(unsichtbarClass_);
                    }
                });

    let fenster = document.getElementById('spielAbschluss');
    fenster.classList.remove(unsichtbarClass_);
    document.getElementById('single').focus();
    showHideBackdrop();
    let left = (window.outerWidth/2)-(fenster.offsetWidth/2), top = (window.outerHeight/2)-(fenster.offsetHeight/2);
    fenster.style.left = left + 'px';
    fenster.style.top = top + 'px';
    document.addEventListener('keydown', handleKeydown);
    
}

function gewinnErmitteln(spielerIndex) {
    let gewonneneSets = 0;
    for(let i = 0; i < sets_.length; i++) {
        if(sets_[i].sieger() === spielerIndex) {
            gewonneneSets++;
        }
    }
    //console.log('gewonnene Sets: ' + gewonneneSets);
    if(sets_[aktuellesSet - 1].sieger() === spielerIndex){
        if(gewonneneSets >= einstellungen.sets / 2){
            return Gewinn.Match;
        }else {
            return Gewinn.Set;
        }
    }else {
        return Gewinn.Leg;
    }
}

function handleKeydown(event) {
    if(event.keyCode === 13) handleContinue();
}

function neuesLeg() {
    // Würfe zurücksetzen
    wuerfeNullen();
    aktuellerWurf = 1;
    changeWurfElement(1);

    // Spieler zurücksetzen
    aktuellerSpieler = 1;
    spieler_.forEach(x => x.werteZurueckSetzen());
    for(let i = 0; i < spieler_.length; i++) {
        anzeigeAktualisieren(i + 1, 0);
    }
    changeSpielerElement(1);

    // Timer für neues Leg wieder starten
    dauerLeg = 0;
    setInterval(() => dauerLeg += 5, 5000);
}

function handleContinue() {
    let siegerIndex = sets_[aktuellesSet - 1].siegerLegs_[sets_[aktuellesSet - 1].siegerLegs_.length - 1];
    let gewinn = gewinnErmitteln(siegerIndex);

    //console.log(siegerIndex);
    if(gewinn === Gewinn.Match) {
        spielSpeichern(siegerIndex);
        window.location.href = '../html/index.php'
    }else {
        neuesLeg();
        document.getElementById('spielAbschluss').classList.add(unsichtbarClass_);
        if(gewinn === Gewinn.Set){
            aktuellesSet++;
            sets_.push(new Set())
            console.log('Neues Set');
        }
        document.getElementById('legAnzeige').innerHTML = 'Set ' + aktuellesSet + ', Leg ' + (sets_[aktuellesSet - 1].anzahlAbgeschlosseneLegs() + 1);

        showHideBackdrop();
        document.removeEventListener('keydown', handleKeydown);
    }
}

function spielSpeichern(gewinnerIndex) {
    // um Statistik-Klasse anzulegen
    spieler_.forEach(x => x.werteZurueckSetzen());

    let spielerZuSpeichern = spieler_.filter(x => x.istAngemeldet());

    if(!spielerZuSpeichern.length) return;

    let json = {
        spiel: einstellungen,
        spieler: [],
        sieger: ''
    };

    spielerZuSpeichern.forEach(x => json.spieler.push({
        username: x.name(),
        legs: []
    }));

    if(spielerZuSpeichern.includes(spieler_[gewinnerIndex])){
        json.sieger = spieler_[gewinnerIndex].name();
    }

    // Json befüllen
    let legNr = 0;
    for(let i = 0; i < sets_.length; i++){
        let set = sets_[i];

        for(let j = 0; j < set.anzahlAbgeschlosseneLegs(); j++){
            let dauer = set.dauerLeg(j);
            let platzierungenLeg = spieler_.sort((x, y) => x.punktzahl - y.punktzahl);

            spielerZuSpeichern.forEach((spieler, index) => {
                let statistik = spieler.legStatistik(legNr);
                let platzierung = platzierungenLeg.findIndex(x => Object.is(x, spieler)) + 1;

                json.spieler[index].legs.push({
                    set: i + 1,
                    leg: j + 1,
                    platzierung: platzierung,
                    average: statistik.average(),
                    nullWuerfe: statistik.nullWuerfe(),
                    ueberworfen: statistik.ueberworfen(),
                    hundertAchtziger: statistik.hundertAchtziger(),
                    wuerfeGesamt: statistik.wuerfeGesamt(),
                    punktzahl: statistik.punktzahl(),
                    dauer: dauer
                })
            });

            legNr++;
        }
    }

    // Json an Server schicken
    $.post("spielSpeichern.php", JSON.stringify(json), function(data){
        let dataInt = parseInt(data);
        let text = '';
        switch(dataInt){
            case PhpStatus.Erfolgreich:
                text = 'Speichern erfolgreich!'; break;
            default:
                text = 'Konnte nicht gespeichert werden!';
        }
        console.log(data);
        console.log(text);
    });
}


// ---------------------------------------------- Hilfsfunktionen -----------------------------------------------------------
function inOutKorrekt(inWurf, punktzahl){
    let multiplier = getMultiplier(), wurfKorrekt = true;
    let einstellung = inWurf ? einstellungen.wurfIn : einstellungen.wurfOut;

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

function neuesWurfSet() {
    return [new Wurf(platzhalter), new Wurf(platzhalter), new Wurf(platzhalter)];
}

function switchSelectedElement(id, basicClass, ausgewaehltClass) {
    if(document.getElementById(id).classList.contains(ausgewaehltClass)) return false; 

    let elemente = document.getElementsByClassName(basicClass + " " + ausgewaehltClass);

    if(elemente.length > 1){ 
        console.log("Mehrere ausgewählte Elemente");
        return false;
    }

    if(elemente.length > 0) {
        elemente.item(0).classList.remove(ausgewaehltClass);
    }

    document.getElementById(id).classList.add(ausgewaehltClass);

    return true;
}

function wurfDavor(index) {
    return index === indexErsterWurf ? indexLetzterWurf : index + 1;
}

function wurfDanach(index) {
    return index === indexLetzterWurf ? indexErsterWurf : index - 1;
}