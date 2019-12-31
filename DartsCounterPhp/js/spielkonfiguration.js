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

/*let einstellungen = {
    spieler: {key: spielerParam, value: []},
    legs: {key: legsParam, value: 1},
    sets: {key: setsParam, value: 1},
    punkte: {key: punkteParam, value: 501},
    wurfIn: {key: inParam, value: inOut.single},
    wurfOut: {key: outParam, value: inOut.double}
};*/

let einstellungenPhp = {
    spieler: [],
    legs: 1,
    sets: 1,
    punkte: 501,
    wurfIn: inOut.single,
    wurfOut: inOut.double,
    favoritName: ''
};

function setsClick(id) {
    let zahl = getButtonZahl(id);
    if(!(zahl % 2)) {
        if(zahl === undefined || zahl === 0) zahl = 1;
        else zahl--;
        document.getElementById(id).value = zahl; 
    }
    //einstellungen.sets.value = getButtonZahl(id);
    einstellungenPhp.sets = getButtonZahl(id);
    switchButton(id);
}

function legsClick(id) {
    let zahl = getButtonZahl(id);
    if(!(zahl % 2)) {
        if(zahl === undefined || zahl === 0) zahl = 1;
        else zahl--;
        document.getElementById(id).value = zahl; 
    }
    //einstellungen.legs.value = getButtonZahl(id);
    einstellungenPhp.legs = getButtonZahl(id);
    switchButton(id);
}

function punktzahlClick(id) {
    //einstellungen.punkte.value = getButtonZahl(id);
    einstellungenPhp.punkte = getButtonZahl(id);
    switchButton(id);
}

function inClick(zahl, id) {
    //einstellungen.wurfIn.value = getInOut(zahl);
    einstellungenPhp.wurfIn = getInOut(zahl);
    switchButton(id);
}

function outClick(zahl, id) {
    //einstellungen.wurfOut.value = getInOut(zahl);
    einstellungenPhp.wurfOut = getInOut(zahl);
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
    spielerArrayFuellen();

    let parameterString = getParameterString();
    if(parameterString === '') return;

    window.location.href = '../html/spiel.html?' + parameterString;
}

function spielerArrayFuellen() {
    einstellungenPhp.spieler = [];
    for(let i = 1; i <= anzahlSpieler_; i++) {
        let name = document.querySelector('#' + spielerInputId + i + '.spName').value
        if(name === ''){
            name = 'Spieler ' + i;
        }
        console.log(name);
        einstellungenPhp.spieler.push(name);
    }
}

const keyFuerFavoritenKeys = 'favoritenTriple20', seperator = ';';
const PhpStatus = {
    Fehlgeschlagen: 0,
    Erfolgreich: 1,
    NichtAngemeldet: 2
};

function favoritSpeichern(name) {
    if(name === '') return;

    if(name.search(seperator) > 0) {
        alert('Zeichen \'' + seperator + '\' darf nicht verwendet werden!');
        return;
    }

    spielerArrayFuellen();
    einstellungenPhp.favoritName = name;

    $.post("favoritSpeichern.php", JSON.stringify(einstellungenPhp), function(data){
        let dataInt = parseInt(data);
        let text = '';
        switch(dataInt){
            case PhpStatus.Erfolgreich:
                text = 'Speichern erfolgreich!'; break;
            case PhpStatus.NichtAngemeldet:
                text = 'Favorit wurde lokal gespeichert!'; 
                saveFavoritLocal(name);
                break;
            default:
                text = 'Konnte nicht gespeichert werden!';
        }

        $("#favoritSpeichernHinweistext").text(text);
    })
}

function saveFavoritLocal(name) {
    let parameterString = getParameterString();
    if(parameterString === '') return;

    let keyStringAlt = localStorage.getItem(keyFuerFavoritenKeys), keyStringNeu = '';
    if(keyStringAlt === '' || keyStringAlt === null) {
        keyStringNeu = name;
    }else {
        keyStringNeu = keyStringAlt + seperator + name; 
    }

    // Hier werden in einem Item die Keys für alle Favoriten gespeichert
    localStorage.setItem(keyFuerFavoritenKeys, keyStringNeu);

    // Hier wird Favorit an sich gespeichert
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
    
    if(abbrechen) return;
    
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
    
    for (let property in einstellungenPhp){
        if(einstellungenPhp.hasOwnProperty(property)){
            if(einstellungenPhp[property] === 0){
                alert('Eine Einstellung wurde nicht richtig getroffen!');
                return '';
            }
            result += property + '=' + einstellungenPhp[property] + ';'; 
        }
    }

    result.slice(0, result.length - 1);

    return result;
}

function submitForm(action) {
    document.getElementById('columnarForm').action = action;
    document.getElementById('columnarForm').submit();
}

const Spielmodus = {
    Normal : 0,
    Cricket: 1,
    Bob: 2
}

const modusParam = 'modus';

// TODO: Modus behandeln