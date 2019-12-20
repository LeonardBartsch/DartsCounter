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
            
            $pdo = getPDO();
            $statement = $pdo->prepare('Select * from Spieler where username=:username and emailbestaetigungNummer=:nummer');
            if($statement->execute(array(':username' => $username, ':nummer' => $zahl))){
                $user = $statement->fetch();
                if($user <> false){
                    if(intval($user['Status']) === Status::Offen){
                        $statement = $pdo->prepare('update Spieler set status = :status where username = :username');
                        if($statement->execute(array(':status' => Status::Aktiviert, ':username' => $username))){
                            $bestaetigungErfolgreich = true;
                            $hinweisText = 'Bestätigung erfolgreich!';
                        }
                    }else{
                        $hinweisText = "E-Mail wurde bereits bestätigt!";
                    }
                }
            }
        }

        if($hinweisText === ''){
            $hinweisText = 'Fehler!';
        }

        $pdo = null;
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