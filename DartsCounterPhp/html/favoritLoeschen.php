<?php
session_start();
include('generalFunctions.inc.php');
include('enums.inc.php');

abstract class Status{
    const Fehlgeschlagen = 0;
    const Erfolgreich = 1;
    const NichtAngemeldet = 2;
    const FavoritNichtVorhanden = 3;
}

$result = Status::Fehlgeschlagen;

if($_SERVER['REQUEST_METHOD'] == "POST"){
    if(!isset($_SESSION['username'])){
        echo Status::NichtAngemeldet;
        exit();
    }

    $username = $_SESSION['username'];

    if(isset($_POST['favoritName'])){
        $name = $_POST['favoritName'];

        $sql = 'select * from Favoriten where username = ? and name = ?';
        $sqlParams = array($username, $name);
        Db::single($sql, $sqlParams, $success);
        if(!$success){
            echo Status::FavoritNichtVorhanden;
            exit();
        }

        $dbResult = Db::runTransaction(function() use($sqlParams) {

            $sql = 'delete from Favoriten where username = ? and name = ?';
            $dbResult = Db::execute($sql, $sqlParams);

            if(!$dbResult) return false;
                            
            $sql = 'delete from FavoritenSpieler where username = ? and namefavorit = ?';
            $dbResult = Db::execute($sql, $sqlParams);

            if(!$dbResult) return false;

            return true;
        });

        if($dbResult)
            $result = Status::Erfolgreich;            
    }
}

echo $result;

?>