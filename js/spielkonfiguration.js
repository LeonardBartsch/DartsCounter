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

let anzahlSpieler_ = 2;

let einstellungen = {
    spieler: {key: spielerParam, value: []},
    legs: {key: legsParam, value: 1},
    sets: {key: setsParam, value: 1},
    punkte: {key: punkteParam, value: 501},
    wurfIn: {key: inParam, value: inOut.single},
    wurfOut: {key: outParam, value: inOut.double}
}

function spielerClick(id) {
    einstellungen.spielerzahl.value = getButtonZahl(id);
    switchButton(id);
}

function setsClick(id) {
    let zahl = getButtonZahl(id);
    if(!(zahl % 2)) {
        if(zahl === undefined || zahl === 0) zahl = 1;
        else zahl--;
        document.getElementById(id).value = zahl; 
    }
    einstellungen.sets.value = getButtonZahl(id);
    switchButton(id);
}

function legsClick(id) {
    let zahl = getButtonZahl(id);
    if(!(zahl % 2)) {
        if(zahl === undefined || zahl === 0) zahl = 1;
        else zahl--;
        document.getElementById(id).value = zahl; 
    }
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

function outClick(zahl, id) {
    einstellungen.wurfOut.value = getInOut(zahl);
    switchButton(id);
}

function getButtonZahl(id) {
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
    console.log(zahl);
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

const unsichtbarClass = 'unsichtbar', spielerInputId = 'name';
function plusClick() {
    if(anzahlSpieler_ === 8) return;

    anzahlSpieler_++;
    let elemente = document.querySelectorAll('#' + spielerInputId + anzahlSpieler_)
    elemente.forEach(x => x.classList.remove(unsichtbarClass));
}

function minusClick() {
    if(anzahlSpieler_ === 1) return;
        
    let elemente = document.querySelectorAll('#' + spielerInputId + anzahlSpieler_)
    elemente.forEach(x => x.classList.add(unsichtbarClass));
    anzahlSpieler_--;
}

function weiterleiten() {
    let parameterString = getParameterString();
    if(parameterString === '') return;

    window.location.href = '../html/spiel.html?' + parameterString;
}

const keyFuerFavoritenKeys = 'favoritenTriple20', seperator = ';';
function favoritSpeichern(name) {
    if(name === '') return;

    if(name.search(seperator) > 0) {
        alert('Zeichen \'' + seperator + '\' darf nicht verwendet werden!');
        return;
    }

    let parameterString = getParameterString();
    if(parameterString === '') return;

    let keyStringAlt = localStorage.getItem(keyFuerFavoritenKeys), keyStringNeu = '';
    if(keyStringAlt === '' || keyStringAlt === null) {
        keyStringNeu = name;
    }else {
        keyStringNeu = keyStringAlt + seperator + name; 
    }

    localStorage.setItem(keyFuerFavoritenKeys, keyStringNeu);

    localStorage.setItem(name, parameterString);
    
}

function openDialog() {
    let dialog = document.getElementById('favoritenDialog'), textfeld = document.getElementById('favoritEingabe');
    dialog.classList.remove(unsichtbarClass);
    textfeld.focus();
    let div = document.createElement('div');
	div.id = 'backdrop';
    document.body.appendChild(div);
    let left = (window.outerWidth/2)-(dialog.offsetWidth/2), top = (window.outerHeight/2)-(dialog.offsetHeight/2);
    dialog.style.left = left + 'px';
    dialog.style.top = top + 'px';
    document.addEventListener('keydown', handleKeydown);
}

function closeDialog(abbrechen) {
    let dialog = document.getElementById('favoritenDialog'), textfeld = document.getElementById('favoritEingabe');
    let name = textfeld.value;
    textfeld.value = '';
    dialog.classList.add(unsichtbarClass);
    document.getElementById('backdrop').remove();
    document.removeEventListener('keydown', handleKeydown);
    
    if(abbrechen) name = '';
    
    favoritSpeichern(name);
}

function handleKeydown(event) {
    switch(event.keyCode) {
        case 13:
            closeDialog(); break;
        case 27:
            closeDialog(true); break;
    }
}

function getParameterString() {
    let result = '';
    
    einstellungen.spieler.value = [];
    for(let i = 1; i <= anzahlSpieler_; i++) {
        let name = document.querySelector('#' + spielerInputId + i + '.spName').value
        if(name === ''){
            name = 'Spieler ' + i;
        }
        console.log(name);
        einstellungen.spieler.value.push(name);
    }
    for (let property in einstellungen){
        if(einstellungen.hasOwnProperty(property)){
            if(einstellungen[property].value === 0){
                alert('Eine Einstellung wurde nicht richtig getroffen!');
                return '';
            }
            result += einstellungen[property].key + '=' + einstellungen[property].value + ';'; 
        }
    }

    result.slice(0, result.length - 1);

    return result;
}

const modi = {
    normal : 1,
    cricket: 2,
    bob: 3
}

const modusParam = 'modus';

// TODO: Modus behandeln