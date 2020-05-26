<?php
session_start();
include('enums.inc.php');
include('generalFunctions.inc.php');

function valueOrNull($value) {
    return $value <> "" ? $value : "NULL";
}

if($_SERVER["REQUEST_METHOD"] != "POST") exit();

$json = jsonEinlesen();

$host = isset($_SESSION['username']) ? $_SESSION['username'] : 'NULL';

$result = StatusPhp::Fehlgeschlagen;

if(lfdNrErmitteln("Spiele", "Id", "", array(), $spielId)) {
    //echo "LfdNr hat geklappt";
    $dbResult = Db::runTransaction(function() use($host, $json, $spielId) {
        //echo "Bin drin";
        $einstellungen = $json["spiel"];
        $anzSpieler = count($einstellungen["spieler"]);
        $sieger = valueOrNull($json["sieger"]);
        $favorit = valueOrNull($einstellungen["favoritName"]);

        $sql = "insert into Spiele(Id, Spielmodus, AnzahlSpieler, Startpunktzahl, InWurf, OutWurf, 
                AnzahlSets, AnzahlLegs, Sieger, Host, FavoritName, AngelegtAm, GeaendertAm) 
                values(:id, :modus, :anzSpieler, :start, :inWurf, :outWurf, :anzSets, :anzLegs, 
                :sieger, :host, :favorit, NOW(), NOW())";
        $params = array(':id' => $spielId, ':modus' => $einstellungen["modus"], ':anzSpieler' => $anzSpieler,
                        ':start' => $einstellungen["punkte"], ':inWurf' => $einstellungen["wurfIn"],
                        ':outWurf' => $einstellungen["wurfOut"], ':anzSets' => $einstellungen["sets"],
                        ':anzLegs' => $einstellungen["legs"], ':sieger' => $sieger,
                        ':host' => $host, ':favorit' => $favorit);

        if(!Db::execute($sql, $params)) return false;

        //echo "Spiel anlegen erfolgreich";

        $sql = "insert into SpieleLegs values(:id, :username, :set, :leg, :punkte, :platz, :average,
                :dauer, :anzWuerfe, :anzUeberworfen, :anz180, :anzNull, NOW(), NOW())";
        
        $mindestensEinenSpielerGespeichert = false;
        foreach($json["spieler"] as $spielerJson){
            $username = $spielerJson["username"];
            $komplettGespeichert = true;
            foreach($spielerJson["legs"] as $legJson){
                $params = array(':id' => $spielId, ':username' => $username, ':set' => $legJson["set"],
                                ':leg' => $legJson["leg"], ':punkte' => $legJson["punktzahl"],
                                ':platz' => $legJson["platzierung"], ':average' => $legJson["average"],
                                ':dauer' => $legJson["dauer"], ':anzWuerfe' => $legJson["wuerfeGesamt"],
                                ':anzUeberworfen' => $legJson["ueberworfen"], 
                                ':anz180' => $legJson["hundertAchtziger"], ':anzNull' => $legJson["nullWuerfe"]);

                $komplettGespeichert = ($komplettGespeichert and Db::execute($sql, $params));

                if(!$komplettGespeichert) break;
            }

            $mindestensEinenSpielerGespeichert = ($mindestensEinenSpielerGespeichert or $komplettGespeichert);
        }

        if(!$mindestensEinenSpielerGespeichert) return false;

        return true;
    });

    if($dbResult)
        $result = StatusPhp::Erfolgreich;

}else{
    //die("LfdNr nicht ermittelt");
}

echo $result;

?>