<?php 
session_start();
include('generalFunctions.inc.php');
include('enums.inc.php');
 ?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Startseite</title>
    <?php include('inkludierungen.inc.php'); ?>
    <link rel="stylesheet" href="../css/stylesheet_start.css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="../js/start.js"></script>
  </head>
  <body>
<!--++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Upperpart+++++++++++++++++++++++++++++++++++++++++++++++++++++-->
<?php 
include('header.inc.php');
?>

<main class="maincontainer">
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++SpielenAuswahl+++++++++++++++++++++++++++++++++++++++++++-->
<br><br>
<div class="gridcontainer spielenDiv">
  <div class="spielen1 whitec">
    <h2>Spielen</h2>
  </div>
    <div class="spielen2">

        <a class="spielenButton orange customcursor" onclick="weiterleiten(true)">Spielen mit <br /> Account</a>
        <a class="spielenButton grey customcursor" onclick="weiterleiten(false)">Spielen ohne <br />Account</a>

    </div>
    <div class="spielen3 whitec">
      <div class="textdiv">
        <h4 class="advantageheadline"><u>Deine Vorteile als registrierter Spieler</u></h4>
        <div class="vorteilediv">
        <ul style="margin-left:0px;">
          <li>ein personalisiertes Spielerlebnis!</li>
          <li>mit allen persönlichen Statistiken!</li>
          <li>und unmittelbarem Vergleich zu anderen Triple20-Usern!</li>
        </ul>
        </div>

      </div>
  </div>
</div>

    <hr title="Platzhalter erstmal">



<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ NEWSABTEILUNG +++++++++++++++++++++++++++++++++++++++++++++++-->
<h2 class="whitec" style="margin-bottom:20px; margin-left:5%; margin-right:5%;">Dart-News</h2>
<div class="newscontainer whitec" title="Newsabteilung">
  <div id="newscarousel" class="carousel slide" data-ride="carousel">
  <!--Indicators-->
  <ol class="carousel-indicators">
    <li data-target="#newscarousel" data-slide-to="0" class="active"></li>
    <li data-target="#newscarousel" data-slide-to="1"></li>
    <li data-target="#newscarousel" data-slide-to="2"></li>
  </ol>
  <!--/.Indicators-->
  <!--Slides-->
  <div class="carousel-inner" role="listbox">
    <div class="carousel-item active">
      <div class="view">
        <div class="crop">
          <a href="news.html"><img class="d-block w-100" src="../pics/MvG.jpg" /></a>
        </div>
        <div class="mask rgba-black-light"></div>
      </div>
      <div class="carousel-caption">
        <h4 class="h3-responsive">Michael van Gerwen ist Darts Premier League Sieger!</h4>
      </div>
    </div>
    <div class="carousel-item">
      <div class="view">
        <div class="crop">
        <a href="news2.html"><img class="d-block w-100" src="../pics/HoppUndSchindler.jpg" /></a>
      </div>
        <div class="mask rgba-black-strong"></div>
      </div>
      <div class="carousel-caption">
        <h3 class="h3-responsive">Deutschland im Achtelfinale gescheitert!</h3>
      </div>
    </div>
    <div class="carousel-item">
      <div class="view">
        <div class="crop">
      <a href="news3.html"><img class="d-block w-100" src="../pics/Scotland.jpg" /></a>
      </div>
        <div class="mask rgba-black-slight"></div>
      </div>
      <div class="carousel-caption">
        <h3 class="h3-responsive">World Cup: Triumph für Schottland</h3>

      </div>
    </div>
  </div>
  <!--/.Slides-->
  <!--Controls-->
  <a class="carousel-control-prev" href="#newscarousel" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#newscarousel" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  <!--/.Controls-->
  </div>
</div>
<!--+++++++++++++++++++++++++++++++++++++++++++++++++++++++++NEWSCONTAINER2++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
<div class="newscontainer2 whitec" title="Newsabteilung">
  <div id="newscarousel2" class="carousel slide" data-ride="carousel">
  <!--Slides-->
  <div class="carousel-inner" role="listbox">
    <div class="carousel-item active">
      <div class="view">
        <p class="newstext"><a href="news.html">Michael van Gerwen ist Darts Premier League Sieger!</a></p>
        <div class="mask rgba-black-light"></div>
      </div>
    </div>
    <div class="carousel-item">
      <!--Mask color-->
      <div class="view">
        <p class="newstext"><a href="news2.html">Deutschland im Achtelfinale gescheitert!</a></p>
        <div class="mask rgba-black-strong"></div>
      </div>
    </div>
    <div class="carousel-item">
      <!--Mask color-->
      <div class="view">
      <p class="newstext"><a href="news3.html">World Cup: Triumph für Schottland</a></p>
        <div class="mask rgba-black-slight"></div>
      </div>
    </div>
  </div>
  <!--/.Slides-->
  <!--Controls-->
  <a class="carousel-control-prev" href="#newscarousel2" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#newscarousel2" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
  <!--/.Controls-->
  </div>
</div>

<hr title="Platzhalter erstmal" class="hrspecial">

<!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++TEAMABTEILUNG++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
<div class="gridcontainer teamcontainer" tilte="Teamabteilung">
  <div class="headline whitec">
    <h2>Das Team</h2>
  </div>
  <div class="leo gridcontainer profilegridleft whitebc">
    <div class="profilepicgrid">
      <img src="../pics/leopic.jpg" class="profilepic" style="float:right" alt="">
    </div>
    <div class="profiletextgrid">
      <h2 class="nameheadline">Leo Bartsch</h2>
    </div>
  </div>
  <div class="moritz gridcontainer profilegridright whitebc">
    <div class="profilepicgrid">
      <img src="../pics/moritzpic.jpg" class="profilepic" alt="">
    </div>
    <div class="profiletextgrid">
      <h2 class="nameheadline" style="text-align:right;">Moritz Weinrich</h2>
    </div>
  </div>
  <div class="fabian gridcontainer profilegridleft whitebc">
    <div class="profilepicgrid">
      <img src="../pics/fabianpic.jpg" class="profilepic" style="float:right" alt="">
    </div>
    <div class="profiletextgrid">
      <h2 class="nameheadline">Fabian Liebing</h2>
    </div>
  </div>
  <div class="phillip gridcontainer profilegridright whitebc">
    <div class="profilepicgrid">
      <img src="../pics/phillipppic.jpg" class="profilepic" alt="">
    </div>
    <div class="profiletextgrid">
      <h2 class ="nameheadline">Philipp Raumanns</h2>
    </div>
  </div>
</div>
</main>

<!--+++++++++++++++++++++++++++++++++++++++++++++++++FOOTER++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
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
<!--++++++++++++++++++++++++++++++++++++++++++++++++++SCRIPTS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-->
</body>
</html>
