<?php
session_start();
include('enums.inc.php');
include('generalFunctions.inc.php');

abstract class StatusPhp {
    const Fehlgeschlagen = 0;
    const Erfolgreich = 1;
    const NichtAngemeldet = 2;
}

function getNeueLfdNr($username) {
    
    // Es gibt kein Top-Keyword bei MySql
    $sql = 'select LfdNr from Favoriten where username = :username order by lfdnr desc limit 1';
    $params = array(':username' => $username);
    $favorit = Db::single($sql, $params, $success);

    if($success){
        return $favorit['LfdNr'] + 1;
    }else{
        return 1;
    }
}

$result = StatusPhp::Fehlgeschlagen;

if($_SERVER["REQUEST_METHOD"] == "POST"){

    // Input in PHP-Array umwandeln
    $rawBody = file_get_contents("php://input");
    $json = json_decode($rawBody, true);
    
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
                $spielerName = $spieler[$i];
                $sql = 'insert into FavoritenSpieler (username, namefavorit, lfdnr, name, istusername, 
                        angelegtam, geaendertam) values(:username, :nameFavorit, :lfdNr, :name,
                        :istUsername, NOW(), NOW())';
                $sqlParamsNeu = array(':username' => $sqlParams[':username'], ':nameFavorit' => $sqlParams[':name'],
                                    ':lfdNr' => ($i + 1), ':name' => $spielerName, ':istUsername' => false);
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