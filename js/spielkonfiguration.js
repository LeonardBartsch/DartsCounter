'use strict';

//import {inOut, spielerParam, legsParam, setsParam, punkteParam, inParam, outParam} from './spielen.js';

const inOut = {
    single: 1,
    double: 2,
    master: 3
}

const spielerParam = 'spieler', legsParam = 'legs', setsParam = 'sets', punkteParam = 'punktzahl', 
      inParam = 'in', outParam = 'out';

function keyValuePair(key, value) {
    this.key = key;
    this.value = value;
}

let einstellungen = {
    spielerzahl : {key: spielerParam, value: 2},
    legs : {key: legsParam, value: 1},
    sets : {key: setsParam, value: 1},
    punkte : {key: punkteParam, value: 501},
    wurfIn : {key: inParam, value: inOut.single},
    wurfOut : {key: outParam, value: inOut.double}
}

function spielerClick(id) {
    einstellungen.spielerzahl.value = getButtonZahl(id);
    switchButton(id);
}

function setsClick(id) {
    einstellungen.sets.value = getButtonZahl(id);
    switchButton(id);
}

function legsClick(id) {
    einstellungen.legs.value = getButtonZahl(id);
    switchButton(id);
}

function punktzahlClick(id) {
    einstellungen.punkte.value = getButtonZahl(id);
    switchButton(id);
}

function inClick(zahl, id) {
    einstellungen.wurfIn.value = getInOut(zahl);
    switchButton(id);
}

function outClick(zahl) {
    einstellungen.wurfOut.value = getInOut(zahl);
    switchButton(id);
}

function getButtonZahl(id) {
    console.log(id);
    let button = document.getElementById(id);
    let value = button.value;
    console.log(value);
    let zahl = 0;
    try{
        zahl = Number(value);
    }catch(e) {
        console.log(e);
    }
    console.log(zahl);
    return zahl;
}

function getInOut(zahl) {
    switch(zahl){
        case 1: 
            return inOut.single;
        case 2:
            return inOut.double;
        case 3:
            return inOut.master;
        default:
            console.log('Zahl nicht in InOut-Enum vorhanden');
            return 0;
    }
}

function switchButton(buttonId) {
    switchSelectedButton(buttonId, 'button', 'auswahl');
}

function switchSelectedButton(idButton,  basicClass, ausgewaehltClass) {
    let button = document.getElementById(idButton);
    
    if(button.className.includes(ausgewaehltClass)) return; 
    
    let elemente = button.parentElement.getElementsByClassName(basicClass + " " + ausgewaehltClass);

    if(elemente.length > 1){ 
        console.log("Mehrere ausgewählte Elemente");
        return;
    }

    if(elemente.length > 0) {
        elemente.item(0).className = basicClass;
    }

    button.className = basicClass + " " + ausgewaehltClass;
        
}

function urlMitParams() {
    let url = '../html/spiel.html?';
    //let url = "C:/Users/Leo/OneDrive/Studium/2.%20Semester/Web-Techniken/Git/DartsCounter/html/spiel.html?"
    for (let property in einstellungen){
        if(einstellungen.hasOwnProperty(property)){
            url += einstellungen[property].key + '=' + einstellungen[property].value + ';'; 
        }
    }
    
    window.location.href = url.slice(0, url.length - 1);
}