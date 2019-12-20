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
$userGefunden = false;

if($angemeldet) {
  $username = $_SESSION['username'];

  if(!isset($pdo)) $pdo = getPDO();

  $statement = $pdo->prepare('select * from Spieler where username = :username');
  $result = $statement->execute(array('username' => $username));

  if($result){
    $user = $statement->fetch();
    if($user){
      $userGefunden = true;
      $sicherheitsFrage = $user['Sicherheitsfrage'];
    }
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
      <div class="userschrift userstats1">
        <p>
          <span class="einstellungName">E-Mail:</span>
          <input type="text" class="einstellungenInput" name="emailEinstellung" value="<?php echo $user['EMail'] ?>">
          <img src="../pics/edit.png" alt="Edit" class="editPic">
        </p>
        <br>
        <p>
          <span class="einstellungName">Sicherheitsfrage:</span> 
          <select name="sicherheitsFrageEinstellung" class="einstellungenInput">
            <option <?php if($sicherheitsFrage === Sicherheitsfrage::Keine) echo "selected"; ?>><?php echo sicherheitsFrageToString(Sicherheitsfrage::Keine); ?></option>
            <option <?php if($sicherheitsFrage === Sicherheitsfrage::LaengeDesGlieds) echo "selected"; ?>><?php echo sicherheitsFrageToString(Sicherheitsfrage::LaengeDesGlieds); ?></option>
            <option <?php if($sicherheitsFrage === Sicherheitsfrage::Lieblingsfilm) echo "selected"; ?>><?php echo sicherheitsFrageToString(Sicherheitsfrage::Lieblingsfilm); ?></option>
            <option <?php if($sicherheitsFrage === Sicherheitsfrage::AnzahlSexpartner) echo "selected"; ?>><?php echo sicherheitsFrageToString(Sicherheitsfrage::AnzahlSexpartner); ?></option>
          </select>
        </p>
        <br>
        <p>
          <span class="einstellungName">Antwort auf Sicherheitsfrage: </span>
          <input type="text" class="einstellungenInput" name="sicherheitsfrageAntwortEinstellung" value="<?php echo $user['SicherheitsfrageAntwort']; ?>">
          <img src="../pics/edit.png" alt="Edit" class="editPic">
        </p>
      </div>
      <div class="userschrift userstats2">
        <p>
          <span class="einstellungName">Anzeigename: </span> 
          <input type="text" class="einstellungenInput" name="anzeigeNameEinstellung" value="<?php echo $user['Anzeigename']; ?>">
          <img src="../pics/edit.png" alt="Edit" class="editPic">
        </p>
      </div>
    </div>
    <div style="text-align:right;">
      <input type="submit" name="submitAenderungen" value="Änderungen speichern" class="aenderungenButton">
    </div>
  </form>

  <h2>Statistiken</h2>
  <div class="einstellungen">
    <div class="menuepunkttabelle">
      <button id="buttonSicherheit" class="buttons ausgewaehlt" type="button" name="Sicherheit" onclick="switchMenue('Sicherheit');">Allgemein</button>
      <button id="buttonAccount" class="buttons" type="button" name="Accountinfo" onclick="switchMenue('Account');">Freunde</button>
      <button id="buttonComingSoon" class="buttons" type="button" name="Comingsoon" onclick="switchMenue('ComingSoon');">Favoriten</button>
    </div>
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
    <div class="untermenue1" id="einstellungenSicherheit">
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
    <div class="untermenue" id="einstellungenAccount">
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
    <div class="untermenue" id="einstellungenComingSoon">
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

</div>

<?php else: ?>

  <div>
    <span><?php echo $angemeldet? 'Fehler beim Ermitteln der Account-Daten!' : 'Bitte einloggen'; ?></span>
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
