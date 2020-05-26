<?php
session_start();
include('enums.inc.php');
include('generalFunctions.inc.php');

$result = StatusPhp::Fehlgeschlagen;

if($_SERVER["REQUEST_METHOD"] == "POST"){

    // Input in PHP-Array umwandeln
    $json = jsonEinlesen();
    
    // Direkt abbrechen, wenn nicht angemeldet
    if(!isset($_SESSION['username'])){
        echo StatusPhp::NichtAngemeldet;
        exit();
    }

    $error = false;

    // Prüfen, ob alle Parameter gesetzt sind
    $parameter = array('spieler', 'legs', 'sets', 'punkte', 'wurfIn', 'wurfOut');
    foreach($parameter as $value){
        if(!isset($json[$value])){
            //die("Parameter $value nicht gesetzt");
            $error = true;
            break;
        }
    }

    if(!$error){
        $spieler = $json['spieler']; $anzahlLegs = $json['legs']; $anzahlSets = $json['sets'];
        $anzahlPunkte = $json['punkte']; $wurfIn = $json['wurfIn']; $wurfOut = $json['wurfOut'];

        // Datentyp der Parameter prüfen
        $sqlParams = array(':legs' => $anzahlLegs, ':sets'=> $anzahlSets, ':punkte' => $anzahlPunkte, 
                           'wurfIn' => $wurfIn, 'wurfOut' => $wurfOut, ':modus' => Spielmodus::Normal);
        foreach($sqlParams as $key => $value){
            if(!is_numeric($value)){
                //die("Parameter $value nicht numerisch");
                $error = true;
                break;
            }
        }

        $error = ($error or !is_array($spieler));
    }

    if(!$error){
        // Daten speichern
        $username = $_SESSION['username'];
        $nameFavorit = test_input($json['favoritName']);
        // Username und Favoritenname zu Sql-Parametern hinzufügen
        $sqlParams[':username'] = $username;
        $sqlParams[':name'] = $nameFavorit;
        
        $dbResult = Db::runTransaction(function() use($sqlParams, $spieler){
            $sql = 'insert into Favoriten (username, name, spielmodus, startpunktzahl, anzahllegs, anzahlsets, 
                    inwurf, outwurf, angelegtam, geaendertam) values(:username, :name, :modus, :punkte,
                    :legs, :sets, :wurfIn, :wurfOut, NOW(), NOW())';
            
            $dbResult = Db::execute($sql, $sqlParams);
            if(!$dbResult) return false;
                
            // Spieler speichern
            $i = 0;
            $length = count($spieler);
            do {
                $spielerObj = $spieler[$i];
                $spielerName = $spielerObj["name"];
                $istUsername = $spielerObj["istAngemeldet"];
                $sql = 'insert into FavoritenSpieler (username, namefavorit, lfdnr, name, istusername, 
                        angelegtam, geaendertam) values(:username, :nameFavorit, :lfdNr, :name,
                        :istUsername, NOW(), NOW())';
                $sqlParamsNeu = array(':username' => $sqlParams[':username'], ':nameFavorit' => $sqlParams[':name'],
                                    ':lfdNr' => ($i + 1), ':name' => $spielerName, ':istUsername' => $istUsername);
                $dbResult = Db::execute($sql, $sqlParamsNeu);
                $i++;
            }while($i < $length and $dbResult);

            if(!$dbResult) return false;

            return true;

        });

        if($dbResult)
            $result = StatusPhp::Erfolgreich;
    }
}

echo $result;

?>