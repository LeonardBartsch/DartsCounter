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
    if(!isset($pdo)){
        $pdo = getPDO();
    }

    // Es gibt kein Top-Keyword bei MySql
    $statement = $pdo->prepare('select LfdNr from Favoriten where username = :username order by lfdnr desc limit 1');
    $statement->execute(array(':username' => $username));
    $favorit = $statement->fetch();

    if($favorit <> null){
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

        if(!is_array($spieler)){
            //die("Kein Array");
        }
        $error = ($error or !is_array($spieler));
    }

    if(!$error){
        // Daten speichern
        $username = $_SESSION['username'];
        $lfdNr = getNeueLfdNr($username);

        // LfdNr, Username und Favoritenname zu Sql-Parametern hinzufügen
        $sqlParams[':username'] = $username;
        $sqlParams[':lfdNr'] = $lfdNr;
        $sqlParams[':name'] = test_input($json['favoritName']);
        
        $pdo = getPDO();
        $pdo->beginTransaction();
        $statement = $pdo->prepare('insert into Favoriten (username, lfdnr, name, spielmodus, startpunktzahl, anzahllegs, anzahlsets, 
                                    inwurf, outwurf, angelegtam, geaendertam) values(:username, :lfdNr, :name, :modus, :punkte,
                                    :legs, :sets, :wurfIn, :wurfOut, NOW(), NOW())');
        
        $dbResult = $statement->execute($sqlParams);
        if(!$dbResult){
            $pdo->rollBack();
            //die("Erste Abfrage fehlgeschlagen");
        }else{
            // Spieler speichern
            $i = 0;
            $length = count($spieler);
            do {
                $spielerName = $spieler[$i];
                $statement = $pdo->prepare('insert into FavoritenSpieler (username, lfdnrfavorit, lfdnrspieler, name, istusername, 
                                            angelegtam, geaendertam) values(:username, :lfdNrFavorit, :lfdNrSpieler, :name,
                                            :istUsername, NOW(), NOW())');
                $sqlParams = array(':username' => $username, ':lfdNrFavorit' => $lfdNr, ':lfdNrSpieler' => ($i + 1),
                                ':name' => $spielerName, ':istUsername' => false);
                $dbResult = $statement->execute($sqlParams);
                $i++;
            }while($i < $length and $dbResult);

            if(!$dbResult){
                $pdo->rollBack();
                //die("Zweite Abfrage fehlgeschlagen");
            }else{
                $pdo->commit();
                $result = StatusPhp::Erfolgreich;
            }
        }
    }
}

echo $result;

unset($pdo);
?>