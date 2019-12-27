<?php
session_start();
include('generalFunctions.inc.php');
include('enums.inc.php');
?> 
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Spielauswahl</title>
    <?php include('inkludierungen.inc.php'); ?>
    <link rel="stylesheet" href="../css/stylesheet_spielauswahl.css">
    <script src="../js/spielauswahl.js"></script>
  </head>
  <body>
    <?php include('header.inc.php'); ?>
    <!--++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Upperpart+++++++++++++++++++++++++++++++++++++++++++++++++++++-->
    <!--<header title="Upperpart" class="gridcontainer upperpart">
      <div class="grid1">
        <span class="adtext">Dein Darts-Counter!</span>
        <img class="adpic" src="../pics/dartpfeilpic.png" alt="">
        <div class="right">
          <form action="index.html" method="post">
            <table>
              <tr>
                <td><span class="loginfont">Username:</span> </td>
                <td><input type="text" style="width: 200px" name="Username" placeholder="Username"></td>
              </tr>
              <tr>
                <td><span class="loginfont">Password:</span> </td>
                <td><input type="text" style="width: 200px;" name="Password" placeholder="Password"></td>
              </tr>
              <tr>
                <td><input type="submit" class="accountButton orange" name="Login" value="Login"></td>
                <td><input type="submit" class="accountButton grey" style="width: 200px;" name="Registrieren" value="Registrieren"></td>
              </tr>
            </table>
          </form>
        </div>
      </div>
        <div class="grid2">
          <img src="../pics/Logo.png" class="logo customcursor" alt="">
        </div>
      </header>-->
      <!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Navbar+++++++++++++++++++++++++++++++++++++++++++-->
      <!--<div class="headddd" style="padding-bottom: 50px;">

        <div class="navwrapperrrr" style="height: 40px;">
          <nav class="navvvv" id="navvvv" style="height: 40px;">
            <ul class="ullll" id="names">
              <li class="liiii"> <a class="anchorrrr" id="homeNav">Home</a></li>
              <li class="liiii"> <a class="anchorrrr" id="auswahlNav">Spielauswahl</a></li>
              <li class="liiii" id="comingsoon"> <a class="anchorrrr">Dart-News</a></li>
              <li class="liiii"> <a class="anchorrrr" id="accountNav">Account</a></li>
            </ul>
            <ul class="ullll" id="icons">
              <li class="liiii"> <a class="anchorrrr" id="homeNav"><img src="../pics/homeicon.png" class="icon" /></a></li>
              <li class="liiii"> <a class="anchorrrr" id="auswahlNav"><img src="../pics/playingicon.png" class="icon" /></a></li>
              <li class="liiii" id="comingsoon"> <a class="anchorrrr"><img src="../pics/newsicon.png" class="icon"/></a></li>
              <li class="liiii"> <a class="anchorrrr" id="accountNav"><img src="../pics/Accounticon.png" class="icon" /></a></li>
            </ul>
          </nav>
        </div>
      </div>-->

      <!--+++++++++++++++++++++++++++++++++++++++++++++++++++ Spielmodi-Auswahl ++++++++++++++++++++++++++++++++++++++++++++++++++++-->
      <h1 class="ueberschrift">Spielauswahl</h1>
      <div class="einruecken">
        <div class="spielModiDiv">
          <table class="tabelle">
            <tr>
              <td>
                <div class="modi" onmouseover="beschreibungAnzeigen('standardText');" onmouseout="beschreibungAnzeigen('standardText');">
                  <a onclick="weiterleiten(1)" class="spielModiButton trenner oben customcursor" onmouseover="beschreibungAnzeigen('normal');" onmouseout="beschreibungAnzeigen('normal');">Normales Spiel</a><br>
                  <a onclick="comingsoon()" class="spielModiButton trenner customcursor" onmouseover="beschreibungAnzeigen('cricket');" onmouseout="beschreibungAnzeigen('cricket');">Cricket</a><br>
                  <a onclick="comingsoon()" class="spielModiButton unten customcursor" onmouseover="beschreibungAnzeigen('bob');" onmouseout="beschreibungAnzeigen('bob');">Bob's 27</a>
                </div>
              </td>
              <td>
                <div class="beschreibungDiv">
                  <span id="standardText" style="display: block;" class="beschreibungText">
                    Such dir einen Spielmodus aus oder springe über deine Favoriten direkt ins Spiel! <br>
                    Viel Spaß!
                  </span>
                  <span id="normal" class="unsichtbar beschreibungText">
                    Normales Spiel:<br><br>
                    Du hast hintereinander drei Würfe, bei denen die Pfeile auf die Scheibe geworfen werden und stecken bleiben müssen.
                    Die dabei geworfenen Punkte werden von der zu erreichenden Punktzahl (301/501/701) abgezogen.
                    Anschließend ist der nächste Spieler mit drei Würfen dran, bis man selbst wieder an der Reihe ist.
                    Das Spiel gewinnst Du, wenn dein Ausgangspunktestand zuerst auf genau NULL herunter gespielt ist!
                    Schaffst Du das nicht, weil mit Deiner letzten Runde zu viele Punkte erzielt wurden, wird diese Runde annulliert und es müssen nochmals mit drei Würfen die Felder getroffen werden, um genau auf Null zu kommen und das Spiel zu gewinnen.
                  </span>
                  <span id="cricket" class="unsichtbar beschreibungText">
                    Scoring-Spiel:<br><br>
                    Du versuchst die Segmente #15 bis #20 und das Bull möglichst schnell dreimal zu treffen.
                    Sobald ein Feld, entweder durch dreimal ein Single-, je einmal ein Single- und Double- oder einmal das Triple-Segment getroffen wurde, ist es geschlossen.
                    Jeder weitere Treffer von Dir wird als Punktzahl notiert, sofern der Gegner es noch nicht dreimal getroffen hat.
                    Beispiel: Du beginnst, triffst Single #5 (Fehlwurf), Single #20 (ein Treffer) und Triple #20 (drei Treffer), so hast Du das #20er Segment geschlossen und bekommst weitere 20 Punkte als Guthaben notiert.
                    Das Spiel gewinnt der Spieler, der ALLE Zahlen und das Bull abgedeckt, und die MEISTEN Punkte erzielt hat!
                  </span>
                  <span id="bob" class="unsichtbar beschreibungText">
                    Doppel-Felder-Trainingsspiel:<br><br>
                    Du bekommst 27 Punkte gutgeschrieben.
                    Starte mit Doppel 1, wirf alle 3 Pfeile auf die Doppel 1!
                    Triffst Du die Doppel 1 einmal, dann addiere 2 Punkte zu den 27 = 29 Punkte.
                    Solltest Du die Doppel 1 zwei mal treffen, dann addiere 4 Punkte = 31.
                    Solltest die Doppel 1 NICHT getroffen werden, dann subtrahiere 2 Punkte = 25 Punkte.
                    Danach geht es auf die Doppel 2, wirf alle 3 Pfeile!
                    Jetzt gehst Du jedes Doppel der Reihe nach durch, immer alle drei Pfeile auf dieses Doppel.
                    Das Spiel endet wenn Du auf das BullEye geworfen hast ODER wenn das Guthaben einen negativen Wert hat.
                  </span>
                </div>
              </td>
            </tr>
          </table>
        </div>

      <!--+++++++++++++++++++++++++++++++++++++++++++++++++++ Favoriten ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
        <div class="favoritenDiv">
          <h2 id="favoriten" class="unsichtbar">Favoriten</h1>
          <ul id="favoritenListe">
          </ul>
        </div>
      </div>

<!--++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++FOOTER+++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
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
