<?php
session_start();
include('generalFunctions.inc.php');
include('enums.inc.php');
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Spielkonfiguration</title>
    <?php include('inkludierungen.inc.php'); ?>
    <link rel="stylesheet" href="../css/stylesheet_spielkonfiguration.css">
    <script src="../js/spielkonfiguration.js"></script>
  </head>
  <body>
    <?php include('header.inc.php'); ?>

<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++SpielenAuswahl+++++++++++++++++++++++++++++++++++++++++++-->
    <main>
      <table>
        <form id="spielEinstellungen" method="POST">
          <h2>Spieleinstellungen</h2>
          <div class="Spieler">
            <h3>Spieler</h3>
            <input class="button plusMinus" type="button" id="1spieler" value="+" onclick="plusClick()">
            <input class="button plusMinus" type="button" id="2spieler" value="-" onclick="minusClick()">
            <div class="namen">
              <span class="spielerSpan" id="name1">Spieler 1:</span>
                <input class="spName" type="text" id="name1" placeholder="Spieler 1"><br id="name1">
              <span class="spielerSpan" id="name2">Spieler 2:</span>
                <input class="spName" type="text" id="name2" placeholder="Spieler 2"><br id="name2">
              <span class="spielerSpan unsichtbar" id="name3">Spieler 3:</span>
                <input class="spName unsichtbar" type="text" id="name3" placeholder="Spieler 3"><br id="name3" class="unsichtbar">
              <span class="spielerSpan unsichtbar" id="name4">Spieler 4:</span>
                <input class="spName unsichtbar" type="text" id="name4" placeholder="Spieler 4"><br id="name4" class="unsichtbar">
              <span class="spielerSpan unsichtbar" id="name5">Spieler 5:</span>
                <input class="spName unsichtbar" type="text" id="name5" placeholder="Spieler 5"><br id="name5" class="unsichtbar">
              <span class="spielerSpan unsichtbar" id="name6">Spieler 6:</span>
                <input class="spName unsichtbar" type="text" id="name6" placeholder="Spieler 6"><br id="name6" class="unsichtbar">
              <span class="spielerSpan unsichtbar" id="name7">Spieler 7:</span>
                <input class="spName unsichtbar" type="text" id="name7" placeholder="Spieler 7"><br id="name7" class="unsichtbar">
              <span class="spielerSpan unsichtbar" id="name8">Spieler 8:</span>
                <input class="spName unsichtbar" type="text" id="name8" placeholder="Spieler 8"><br id="name8" class="unsichtbar">
            </div>
          </div>
          <div class="Dauer">
            <h3>Dauer</h3>
            <div class="Sets">
              <h4>Sets</h4>
              <input class="button auswahl" type="button" id="1set" value="1" onclick="setsClick('1set')">
              <input class="button" type="button" id="3set" value="3" onclick="setsClick('3set')">
              <input class="button" type="button" id="5set" value="5" onclick="setsClick('5set')">
              <input class="button" type="number" id="mehrSet" value="other" placeholder="other" min="7" step="2" onclick="setsClick('mehrSet')"
                    onblur="setsClick('mehrSet')">
            </div>
            <div class="Legs">
              <h4>Legs</h4>
              <input class="button auswahl" type="button" id="1leg" value="1" onclick="legsClick('1leg')">
              <input class="button" type="button" id="3leg" value="3" onclick="legsClick('3leg')">
              <input class="button" type="button" id="5leg" value="5" onclick="legsClick('5leg')">
              <input class="button" type="button" id="7leg" value="7" onclick="legsClick('7leg')">
              <input class="button" type="number" id="mehrLeg" placeholder="other" min="9" step="2" onclick="legsClick('mehrLeg')"
                    onblur="legsClick('mehrLeg')">
            </div>
          </div>
          <div class="Punktanzahl">
            <h3>Punktanzahl</h3>
            <input class="button"type="button" id="301Punkte" value="301" onclick="punktzahlClick('301Punkte')">
            <input class="button auswahl" type="button" id="501Punkte" value="501" onclick="punktzahlClick('501Punkte')">
            <input class="button" type="button" id="701Punkte" value="701" onclick="punktzahlClick('701Punkte')">
          </div>
          <div class="In/Out">
            <h3>In/Out</h3>
            <div class="grid">
              <span class="inOutSpan">In:</span>
              <div>
                <input class="button auswahl" type="button" id="singleIn" value="Single" onclick="inClick(1, 'singleIn')">
                <input class="button" type="button" id="doubleIn" value="Double" onclick="inClick(2, 'doubleIn')">
                <input class="button" type="button" id="masterIn" value="Master" onclick="inClick(3, 'masterIn')">
              </div>
              <span class="inOutSpan">Out:</span>
              <div>
                <input class="button" type="button" id="singleOut" value="Single" onclick="outClick(1, 'singleOut')">
                <input class="button auswahl" type="button" id="doubleOut" value="Double" onclick="outClick(2, 'doubleOut')">
                <input class="button" type="button" id="masterOut" value="Master" onclick="outClick(3, 'masterOut')">
              </div>
            </div>
          </div>
          <div>
            <h3></h3>
            <input class="spielenButton" type="button" value="Spielen!" onclick="weiterleiten()">
            <input class="favoritButton" type="button" value="Als Favorit speichern" onclick="openDialog()">
            <span id="favoritSpeichernHinweistext"></span>
          </div>
        </form>
      </table>
      <div role="dialog" class="unsichtbar" id="favoritenDialog">
        <h2>Favorit speichern...</h2>
        <p> Geben Sie den Namen des Favoriten ein: </p>
        <input type="text" id="favoritEingabe"><br>
        <button class="dialogButton" onclick="closeDialog()">Bestätigen</button>
        <button class="dialogButton" onclick="closeDialog(true)">Abbrechen</button>
      </div>
    </main>

<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++FOOTER++++++++++++++++++++++++++++++++++++++++++-->
    <footer class="footer">
      <div class="implinksdiv">
        <span class="centerblock"><a href="#">Kontakt</a></span>
        <span class="centerblock"><a href="#">Datenschutz</a></span>
      </div>
      <div class="copyrightdiv">
        <span class="centerblock">Copyright ©2019 Triple20</span>
      </div>
      <div class="backtotopdiv" id="backtotop" onclick="backtotop">
        <span class="centerblock backtotop" style="margin-top:10px">↑ Back To Top ↑ </span>
      </div>
    </footer>
  </body>
</html>
