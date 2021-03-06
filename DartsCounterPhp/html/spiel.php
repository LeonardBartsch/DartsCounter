<?php 
session_start(); 
include('generalFunctions.inc.php');
include('enums.inc.php');
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Spielen</title>
        <?php include('inkludierungen.inc.php'); ?>
        <link rel="stylesheet" href="../css/stylesheet_spiel.css">
        <script src="../js/spielen.js"></script>
    </head>
    
    <?php include('header.inc.php'); ?>

    <main>
        <!--+++++++++++++++++++++++++++++++++++++++++++Spielbeschreibung+++++++++++++++++++++++++++++++++-->
        <div class="spielartDiv">
            <h2 id="spielart"></h2>
            <span id="spielbeschreibung"></span>
            <h3 id="legAnzeige">Set 1, Leg 1</h3>
        </div>
        <!--+++++++++++++++++++++++++++++++++++++++++++Zwischenstände der Spieler++++++++++++++++++++++++-->
        <div class="divWrapper">
            <div class="spielerkachel ausgewaehlt" id="spieler1">
                <h3 id="name1">Spieler 1</h3>
                <p>
                    <span>Punkte: <span id="punkte1">501</span></span><br>
                    <span>Würfe: <span id="wuerfe1">0</span></span><br>
                    <span>3 Dart Average: <span id="average1">0</span></span><br>
                </p>
            </div>
            <div class="spielerkachel unsichtbar" id="spieler2">
                <h3 id="name2">Spieler 2</h3>
                <p>
                    <span>Punkte: <span id="punkte2">501</span></span><br>
                    <span>Würfe: <span id="wuerfe2">0</span></span><br>
                    <span>3 Dart Average: <span id="average2">0</span></span><br>
                </p>
            </div>
            <div class="spielerkachel unsichtbar" id="spieler3">
                <h3 id="name3">Spieler 3</h3>
                <p>
                    <span>Punkte: <span id="punkte3">501</span></span><br>
                    <span>Würfe: <span id="wuerfe3">0</span></span><br>
                    <span>3 Dart Average: <span id="average3">0</span></span><br>
                </p>
            </div>
            <div class="spielerkachel unsichtbar" id="spieler4">
                <h3 id="name4">Spieler 4</h3>
                <p>
                    <span>Punkte: <span id="punkte4">501</span></span><br>
                    <span>Würfe: <span id="wuerfe4">0</span></span><br>
                    <span>3 Dart Average: <span id="average4">0</span></span><br>
                </p>
            </div>
            <div class="spielerkachel unsichtbar" id="spieler5">
                <h3 id="name5">Spieler 5</h3>
                <p>
                    <span>Punkte: <span id="punkte5">501</span></span><br>
                    <span>Würfe: <span id="wuerfe5">0</span></span><br>
                    <span>3 Dart Average: <span id="average5">0</span></span><br>
                </p>
            </div>
            <div class="spielerkachel unsichtbar" id="spieler6">
                <h3 id="name6">Spieler 6</h3>
                <p>
                    <span>Punkte: <span id="punkte6">501</span></span><br>
                    <span>Würfe: <span id="wuerfe6">0</span></span><br>
                    <span>3 Dart Average: <span id="average6">0</span></span><br>
                </p>
            </div>
            <div class="spielerkachel unsichtbar" id="spieler7">
                <h3 id="name7">Spieler 7</h3>
                <p>
                    <span>Punkte: <span id="punkte7">501</span></span><br>
                    <span>Würfe: <span id="wuerfe7">0</span></span><br>
                    <span>3 Dart Average: <span id="average7">0</span></span><br>
                </p>
            </div>
            <div class="spielerkachel unsichtbar" id="spieler8">
                <h3 id="name8">Spieler 8</h3>
                <p>
                    <span>Punkte: <span id="punkte8">501</span></span><br>
                    <span>Würfe: <span id="wuerfe8">0</span></span><br>
                    <span>3 Dart Average: <span id="average8">0</span></span><br>
                </p>
            </div>
        </div>
        <div class="linie obere"></div>

        <!--++++++++++++++++++++++++++++++++++++++++++Wurf-Anzeige++++++++++++++++++++++++++++++++++++-->

        <div class="wurfAnzeige">
            <span id="wurf1" class="wurf ausgewaehlt">0</span>
            <span id="wurf2" class="wurf">0</span>
            <span id="wurf3" class="wurf">0</span>
        </div>

        <div class="linie"></div>

        <!--++++++++++++++++++++++++++++++++++++++++++Punkte-Eingabe++++++++++++++++++++++++++++++++++-->

        <div class="divWrapper">
            <div id="punkteButtonsDiv">
                <div>
                    <button type="button" class="punktButton">1</button>
                    <button type="button" class="punktButton">2</button>
                    <button type="button" class="punktButton">3</button>
                    <button type="button" class="punktButton">4</button>
                    <button type="button" class="punktButton">5</button>
                </div>
                <div>
                    <button type="button" class="punktButton">6</button>
                    <button type="button" class="punktButton">7</button>
                    <button type="button" class="punktButton">8</button>
                    <button type="button" class="punktButton">9</button>
                    <button type="button" class="punktButton">10</button>
                </div>
                <div>
                    <button type="button" class="punktButton">11</button>
                    <button type="button" class="punktButton">12</button>
                    <button type="button" class="punktButton">13</button>
                    <button type="button" class="punktButton">14</button>
                    <button type="button" class="punktButton">15</button>
                </div>
                <div>
                    <button type="button" class="punktButton">16</button>
                    <button type="button" class="punktButton">17</button>
                    <button type="button" class="punktButton">18</button>
                    <button type="button" class="punktButton">19</button>
                    <button type="button" class="punktButton">20</button>
                </div>
                <div>
                    <button type="button" class="punktButton untereReihe">0</button>
                    <button type="button" class="punktButton untereReihe">25</button>
                    <button type="button" class="punktButton untereReihe">50</button>
                </div>
            </div>

            <div class="vl"></div>

            <div id="extraButtons">
                <div id="multiplierButtonsDiv">
                    <button type="button" id="single" class="multiplierButton ausgewaehlt" onclick="selectMultiplier('single', '')">Single</button>
                    <button type="button" id="double" class="multiplierButton" onclick="selectMultiplier('double', 'D')">Double</button>
                    <button type="button" id="triple" class="multiplierButton" onclick="selectMultiplier('triple', 'T')">Triple</button>
                </div>

                <button type="button" class="undoButton" onclick="undo()">Undo</button>
            </div>
        </div>

        <div id="spielAbschluss" class="unsichtbar">
            <span class="gewonnen" id="spielAbschlussText">Gewonnen!</span><br>
            <img src="https://media.giphy.com/media/6nuiJjOOQBBn2/giphy.gif" alt="Party-GIF" class="partyGif" id="gifLeg">
            <img src="https://media.giphy.com/media/hTh9bSbUPWMWk/giphy.gif" alt="Party-GIF" class="partyGif" id="gifSet">
            <img src="https://media.giphy.com/media/ZdFxoPhIS4glG/giphy.gif" alt="Party-GIF" class="partyGif" id="gifMatch">
            <br>
            <input type="button" value="Continue" class="continueButton" onclick="handleContinue()">
        </div>
    </main>

<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++FOOTER++++++++++++++++++++++++++++++++++++++++++++-->
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

</html>
