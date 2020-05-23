<?php
$favoritenLokal = true;
if(isset($_SESSION['username'])){
    $favoritenLokal = false;
    $username = $_SESSION['username'];
    
    $sql = 'select * from Favoriten where username = :username';
    $favoriten = Db::get($sql, array(':username' => $username));
    
    $dbSpalteZuKey = array('legs' => 'AnzahlLegs', 'sets' => 'AnzahlSets', 'punkte' => 'Startpunktzahl', 'wurfIn' => 'InWurf',
                           'wurfOut' => 'OutWurf');
    $favoritenArray = array();
    
    foreach($favoriten as $favorit){
      $nameFavorit = $favorit['Name'];
      $sql = 'select * from FavoritenSpieler where username = :username and namefavorit = :nameFavorit order by lfdnr';
      $spielerVonDb = Db::get($sql, array(':username' => $username, ':nameFavorit' => $nameFavorit));

      //$spielerString = '';
      $spielerArray = array();
      foreach($spielerVonDb as $spieler){
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

/* Struktur $result: ['favoritenLokal' => false, 
                      'favoriten' => ['Favorit1' => ['spieler' => ['Moritz', 'Fabi'],
                                                     'legs' => 1, 'sets' => 1, 'punkte' => 501,
                                                     'wurfIn' => 3, 'wurfOut' => 2],
                                      'Favorit2' => [...]
                                     ]
                     ]
*/
?>

