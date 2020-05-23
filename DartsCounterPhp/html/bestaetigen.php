<?php 
include('enums.inc.php'); 
include('generalFunctions.inc.php');
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>E-Mail-Bestätigung</title>
        <?php include('inkludierungen.inc.php'); ?>
        <link rel="stylesheet" href="../css/stylesheet_bestaetigen.css">
    </head>
    <body>
        <?php
        $bestaetigungErfolgreich = false;
        $hinweisText = '';
        if(isset($_GET['username']) and isset($_GET['zahl'])){
            $username = $_GET['username'];
            $zahl = $_GET['zahl'];
            
            $sql = 'Select * from Spieler where username=:username and emailbestaetigungNummer=:nummer';
            $params = array(':username' => $username, ':nummer' => $zahl);
            $user = Db::single($sql, $params, $success);
            if($success){
                if(intval($user['Status']) === AccountStatus::Offen){
                    $sql = 'update Spieler set status = :status where username = :username';
                    $params = array(':status' => AccountStatus::Aktiviert, ':username' => $username);
                    if(Db::execute($sql, $params)){
                        $bestaetigungErfolgreich = true;
                        $hinweisText = 'Bestätigung erfolgreich!';
                    }
                }else{
                    $hinweisText = "E-Mail wurde bereits bestätigt!";
                }
            }
        }

        if($hinweisText === ''){
            $hinweisText = 'Fehler!';
        }

        ?>
        <header>
            <img src="../pics/Logo.png" class="logo customcursor" alt="">
        </header>
        <main class="content">
            <span><?php echo $hinweisText ?></span>
            <p>Zurück zur <a href="index.php" class="zurStartseite">Startseite</a></p>
        </main>
    </body>
</html>