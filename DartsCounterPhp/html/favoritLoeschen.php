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

        $pdo = getPDO();
        $statement = $pdo->prepare('select * from Favoriten where username = ? and name = ?');
        $sqlParams = array($username, $name);
        $statement->execute($sqlParams);
        if(!$statement->fetch()){
            echo Status::FavoritNichtVorhanden;
            exit();
        }

        $pdo->beginTransaction();

        $statement = $pdo->prepare('delete from Favoriten where username = ? and name = ?');
        $dbResult = $statement->execute($sqlParams);

        if(!$dbResult){
            $pdo->rollBack();
        }else{
            $statement = $pdo->prepare('delete from FavoritenSpieler where username = ? and namefavorit = ?');
            $dbResult = $statement->execute($sqlParams);

            if(!$dbResult){
                $pdo->rollBack();
            }else{
                $pdo->commit();
                $result = Status::Erfolgreich;
            }
        }
    }
}

echo $result;

unset($pdo);
?>