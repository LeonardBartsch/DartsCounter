<?php
// Enums
abstract class AccountStatus {
    const Offen = 0;
    const Aktiviert = 1;
}

abstract class Sicherheitsfrage {
    const Keine = 0;
    const LaengeDesGlieds = 1;
    const Lieblingsfilm = 2;
    const AnzahlSexpartner = 3;
}

abstract class InOut {
    const Single = 1;
    const Double = 2;
    const Master = 3;
}

abstract Class Punktanzahl {
    const Drei01 = 0;
    const Fuenf01 = 1;
    const Sieben01 = 2; 
}

abstract class Spielmodus {
    const Normal = 0;
    const Cricket = 1;
    const Bob = 2;
}

abstract class StatusPhp {
    const Fehlgeschlagen = 0;
    const Erfolgreich = 1;
    const NichtAngemeldet = 2;
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