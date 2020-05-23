<?php 
session_start(); 
include('generalFunctions.inc.php');
include('enums.inc.php');
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Account</title>
    <?php include('inkludierungen.inc.php'); ?>
    <link rel="stylesheet" href="../css/stylesheet_account.css">
    <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css">
    <script src="../js/account.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  </head>
  <body>

<!--++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Upperpart++++++++++++++++++++++++++++++++++++++++++++++++++-->
<?php
include('header.inc.php');

$angemeldet = isset($_SESSION['username']);

// Änderungen speichern
if($angemeldet and $_SERVER["REQUEST_METHOD"] === "POST" and isset($_POST['submitAenderungen'])){
  $sicherheitsFrage = intval(test_input($_POST['sicherheitsFrageEinstellung']));
  $sicherheitsAntwort = $sicherheitsFrage === Sicherheitsfrage::Keine? '' : $_POST['sicherheitsfrageAntwortEinstellung'];
  $anzeigeName = $_POST['anzeigeNameEinstellung'];

  $sql = 'update Spieler set sicherheitsfrage = :sicherheitsfrage, sicherheitsfrageantwort = :antwort,
          anzeigename = :anzeigename, geaendertam = NOW() where username = :username';
  $params = array(':sicherheitsfrage' => $sicherheitsFrage, ':antwort' => $sicherheitsAntwort, 
                  ':anzeigename' => $anzeigeName, ':username' => $_SESSION['username']);
  $result = Db::execute($sql, $params);

  $speichernHinweistext = $result? "Änderungen wurden erfolgreich gespeichert" : "Fehler beim Speichern der Änderungen";
}

$userGefunden = false;

if($angemeldet) {
  $username = $_SESSION['username'];

  $sql = 'select * from Spieler where username = :username';
  $user = Db::single($sql, array('username' => $username), $success);

  if($success){
      $userGefunden = true;
      $sicherheitsFrage = intval($user['Sicherheitsfrage']);    
  }
}

if($userGefunden): 
?>

<div class="main" id="main">
  <form class="user" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
    <div class="userGrid">
      <div class="userpic">
        <img src="../pics/default-profile.jpeg" alt="PB" height="200px" width="200px">
      </div>
      <div class="username">
        <p class="orangeText"><?php echo $username ?></p>
      </div>
      <span class="einstellungName">E-Mail:</span>
      <div>
        <input type="text" class="einstellungenInput" name="emailEinstellung" value="<?php echo $user['EMail'] ?>">
        <img src="../pics/edit.png" alt="Edit" class="editPic">
      </div>
      <span class="einstellungName">Sicherheitsfrage:</span> 
      <select name="sicherheitsFrageEinstellung" class="einstellungenInput">
        <option value="<?php echo Sicherheitsfrage::Keine ?>" <?php if($sicherheitsFrage === Sicherheitsfrage::Keine) echo "selected"; ?>><?php echo sicherheitsFrageToString(Sicherheitsfrage::Keine); ?></option>
        <option value="<?php echo Sicherheitsfrage::LaengeDesGlieds ?>" <?php if($sicherheitsFrage === Sicherheitsfrage::LaengeDesGlieds) echo "selected"; ?>><?php echo sicherheitsFrageToString(Sicherheitsfrage::LaengeDesGlieds); ?></option>
        <option value="<?php echo Sicherheitsfrage::Lieblingsfilm ?>" <?php if($sicherheitsFrage === Sicherheitsfrage::Lieblingsfilm) echo "selected"; ?>><?php echo sicherheitsFrageToString(Sicherheitsfrage::Lieblingsfilm); ?></option>
        <option value="<?php echo Sicherheitsfrage::AnzahlSexpartner ?>" <?php if($sicherheitsFrage === Sicherheitsfrage::AnzahlSexpartner) echo "selected"; ?>><?php echo sicherheitsFrageToString(Sicherheitsfrage::AnzahlSexpartner); ?></option>
      </select>
      <span class="einstellungName">Antwort auf Sicherheitsfrage: </span>
      <div>
        <input type="text" class="einstellungenInput" name="sicherheitsfrageAntwortEinstellung" value="<?php echo $user['SicherheitsfrageAntwort']; ?>">
        <img src="../pics/edit.png" alt="Edit" class="editPic">
      </div>
      <span class="einstellungName">Anzeigename: </span>
      <div> 
        <input type="text" class="einstellungenInput" name="anzeigeNameEinstellung" value="<?php echo $user['Anzeigename']; ?>">
        <img src="../pics/edit.png" alt="Edit" class="editPic">
      </div>
      <div class="aenderungenButtonDiv">
        <input type="submit" name="submitAenderungen" value="Änderungen speichern" class="aenderungenButton">
        <span><?php echo $speichernHinweistext ?></span>
      </div>
    </div>
  </form>

  <h2 class="statistikenHeading">Statistiken</h2>
  <div class="statistikenDiv">
    <div class="menuepunkttabelle">
      <button id="buttonAllgemein" class="buttons ausgewaehlt" type="button" name="Allgemein" onclick="switchMenueStatistik('Allgemein');">Allgemein</button>
      <button id="buttonFreunde" class="buttons" type="button" name="Freunde" onclick="switchMenueStatistik('Freunde');">Freunde</button>
      <button id="buttonComingSoon" class="buttons" type="button" name="Comingsoon" onclick="switchMenueStatistik('ComingSoon');">Coming Soon</button>
    </div>
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
    <div class="untermenue ausgewaehlt" id="menueAllgemein">
      <p class="einstellungentext">Siege: ???</p>
      <!--<div class="bearbeiten" style="text-align: center;">
        <button type="button" name="bearbeiten" class="bottuns">bearbeiten</button>
      </div>-->
      <p class="einstellungentext">Niederlagen: ???</p>
      <p class="einstellungentext">Lieblingsgegner: ???</p>
      <p class="einstellungentext">Erzfeind: ???</p>
      <p class="einstellungentext">Average: ???</p>
    </div>
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
    <div class="untermenue unsichtbar" id="menueFreunde">
      <div class="benutzername">
        <p class="einstellungentext">Benutzername: ???</p>
      </div>
      <div class="bearbeiten" style="text-align: center;">
        <button type="button" name="bearbeiten" class="bottuns">bearbeiten</button>
      </div>
      <div class="email">
        <p class="einstellungentext">E-mail: ???</p>
      </div>
      <div class="bearbeiten" style="text-align: center;">
        <button type="button" name="bearbeiten" class="bottuns">bearbeiten</button>
      </div>
      <div class="Anzeigename">
        <p class="einstellungentext">Anzeigename: ???</p>
      </div>
      <div class="bearbeiten" style="text-align: center;">
        <button type="button" name="bearbeiten" class="bottuns">bearbeiten</button>
      </div>
    </div>
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
    <div class="untermenue unsichtbar" id="menueComingSoon">
      <div class="comingsoon1">
        <p class="einstellungentext">coming soon</p>
      </div>
      <div class="bearbeiten" style="text-align: center;">
        <button type="button" name="bearbeiten" class="bottuns">bearbeiten</button>
      </div>
      <div class="comingsoon2">
        <p class="einstellungentext">coming soon</p>
      </div>
      <div class="bearbeiten" style="text-align: center;">
        <button type="button" name="bearbeiten" class="bottuns">bearbeiten</button>
      </div>
      <div class="comingsoon3">
        <p class="einstellungentext">coming soon</p>
      </div>
      <div class="bearbeiten" style="text-align: center;">
        <button type="button" name="bearbeiten" class="bottuns">bearbeiten</button>
      </div>
    </div>
  </div>

  <!-- TODO: Favoriten bearbeiten implementieren
  <div class="favoritenDiv unsichtbar">
    <div class="menuepunkttabelle">
      <button id="buttonStatistikAllgemein" class="buttons ausgewaehlt" type="button" name="Sicherheit" onclick="switchMenue('Sicherheit');">Allgemein</button>
    </div>
    <div class="untermenue" id="menueFavoritenLol">

    </div>
  </div>-->
</div>

<?php else: ?>

  <div>
    <span class="nichtEingeloggtSpan"><?php echo $angemeldet? 'Fehler beim Ermitteln der Account-Daten!' : 'Bitte einloggen!'; ?></span>
  </div> 
<?php endif ?>
<!--++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++FOOTER++++++++++++++++++++++++++++++++++++++++++++-->

<footer class="footer">
  <div class="implinksdiv">
    <span class="centerblock"><a href="#">Kontakt</a></span>
    <span class="centerblock"><a href="#">Datenschutz</a></span>
  </div>
  <div class="copyrightdiv">
    <span class="centerblock">Copyright ©2019 Triple20</span>
  </div>
  <div class="backtotopdiv" id="backtotop" onclick="backtotop">
    <span class="centerblock backtotop">↑ Back To Top ↑ </span>
  </div>
</footer>

</body>
</html>
