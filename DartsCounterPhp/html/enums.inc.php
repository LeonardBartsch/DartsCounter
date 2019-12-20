<?php
// Enums
abstract class Status {
    const Offen = 0;
    const Aktiviert = 1;
}

abstract class Sicherheitsfrage {
    const Keine = 0;
    const LaengeDesGlieds = 1;
    const Lieblingsfilm = 2;
    const AnzahlSexpartner = 3;
}


// Enums to String
function sicherheitsFrageToString($value) {
    switch($value){
        case Sicherheitsfrage::Keine:
            return "Keine"; break;
        case Sicherheitsfrage::LaengeDesGlieds:
            return "Länge des Glieds"; break;
        case Sicherheitsfrage::Lieblingsfilm:
            return "Lieblingsfilm"; break;
        case Sicherheitsfrage::AnzahlSexpartner:
            return "Anzahl der Sexpartner"; break;
        default:
            die("Falscher Wert");
    }
}
?>