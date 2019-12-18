<?php session_start(); ?>
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
?>

<div class="main" id="main">
  <div class="user">
    <div class="userpic">
      <img src="../pics/default-profile.jpeg" alt="PB" height="200px" width="200px">
    </div>
    <div class="username">
      <p>Max Mustermann</p>
    </div>
    <div class="userschrift userstats1">
      <p>Siege: ???</p>
      <br>
      <p>Niederlagen: ???</p>
      <br>
      <p>S/N-Quote: ???</p>
    </div>
    <div class=" userschrift userstats2">
      <p>Erzfeind: ???</p>
      <br>
      <p>Lieblingsgegner: ???</p>
      <br>
      <p>Average: ???</p>
    </div>
  </div>

  <div class="einstellungen">
    <div class="menuepunkttabelle">
      <button id="buttonSicherheit" class="buttons ausgewaehlt" type="button" name="Sicherheit" onclick="switchMenue('Sicherheit');">Sicherheit</button>
      <button id="buttonAccount" class="buttons" type="button" name="Accountinfo" onclick="switchMenue('Account');">Accountinfo</button>
      <button id="buttonComingSoon" class="buttons" type="button" name="Comingsoon" onclick="switchMenue('ComingSoon');">Coming soon</button>
    </div>
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
    <div class="untermenue1" id="einstellungenSicherheit">
      <div class="passwort">
        <p class="einstellungentext">Passwort: ???</p>
      </div>
      <div class="bearbeiten" style="text-align: center;">
        <button type="button" name="bearbeiten" class="bottuns">bearbeiten</button>
      </div>
      <div class="sicherheitsfrage">
        <p class="einstellungentext">Sicherheitsfrage: ???</p>
      </div>
      <div class="bearbeiten" style="text-align: center;">
        <button type="button" name="bearbeiten" class="bottuns">bearbeiten</button>
      </div>
      <div class="antwortSFrage">
        <p class="einstellungentext">Antwort für die Frage: ???</p>
      </div>
      <div class="bearbeiten" style="text-align: center;">
        <button type="button" name="bearbeiten" class="bottuns">bearbeiten</button>
      </div>
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
