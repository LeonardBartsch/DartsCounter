<?php
session_start();
include('generalFunctions.inc.php');

$favoritenLokal = true;
if(isset($_SESSION['username'])){
    $favoritenLokal = false;
    $username = $_SESSION['username'];
    if(!isset($pdo)){
      $pdo = getPDO();
    }

    $statement = $pdo->prepare('select * from Favoriten where username = :username');
    $statement->execute(array(':username' => $username));
    
    $dbSpalteZuKey = array('legs' => 'AnzahlLegs', 'sets' => 'AnzahlSets', 'punkte' => 'Startpunktzahl', 'wurfIn' => 'InWurf',
                           'wurfOut' => 'OutWurf');
    $favoritenArray = array();
    
    foreach($statement->fetchAll() as $favorit){
      $nameFavorit = $favorit['Name'];
      $statementSpieler = $pdo->prepare('select * from FavoritenSpieler where username = :username and namefavorit = :nameFavorit order by lfdnr');
      $statementSpieler->execute(array(':username' => $username, ':nameFavorit' => $nameFavorit));

      //$spielerString = '';
      $spielerArray = array();
      foreach($statementSpieler->fetchAll() as $spieler){
        $spielerArray[] = $spieler['Name'];       
      }

      $favoritEinstellungen = array('spieler' => $spielerArray);
      //$parameterString = "spieler=$spielerString;";
      foreach($dbSpalteZuKey as $key => $spalte){
        $favoritEinstellungen[$key] = $favorit[$spalte];        
      }

      $favoritenArray[$nameFavorit] = $favoritEinstellungen;
      //$dic[$nameFavorit] = $parameterString;
    }
}

$result = array('favoritenLokal' => $favoritenLokal);

if(isset($favoritenArray)){
    $result['favoriten'] = $favoritenArray;
}

echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);

?>

