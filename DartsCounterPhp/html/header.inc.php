<?php
$error = $loginErfolgreich = false;
$errorText = $eingeloggterUser = '';
$geradeEingeloggt = (isset($_GET['login']) and $_SERVER["REQUEST_METHOD"] == "POST" and isset($_POST['usernameLogin']));
if($geradeEingeloggt){
  $username = test_input($_POST['usernameLogin']);
  $passwort = test_input($_POST['passwortLogin']);
  if($username === '' or $passwort === ''){
    $error = true;
    $errorText = 'Username oder Passwort nicht angegeben!';
  }else{
    if(!isset($pdo)){
      $pdo = new PDO('mysql:host=localhost;dbname=triple20_test', 'triple20_Leo', 'triple20');
    }
    $statement = $pdo->prepare('select * from Spieler where username = :username');
    $statement->execute(array(':username' => $username));
    $user = $statement->fetch();

    if($user !== false and password_verify($passwort, $user['Passwort'])){
      $_SESSION['username'] = $username;
      $loginErfolgreich = true;
      $eingeloggterUser = $username;
    }else{
      $error = true;
      $errorText = 'Username oder Passwort falsch!';
    }
  }
}else{
  if(isset($_GET['logout'])){
    unset($_SESSION['username']);
  }else{
    if(isset($_SESSION['username'])){
      $eingeloggterUser = $_SESSION['username'];
    }
  }
}
?>
<header class="gridcontainer upperpart">
  <div class="grid1">
    <span class="adtext">Dein Darts-Counter!</span>
    <img class="adpic" src="../pics/dartpfeilpic.png" alt="">
    <div class="right">
      <?php if($eingeloggterUser === ''): ?>    
      <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]) . '?login=1';?>" method="POST">
        <table>
          <tr>
            <td><span class="loginfont">Username:</span> </td>
            <td><input type="text" class="fixedwidth" name="usernameLogin" placeholder="Username"></td>
          </tr>
          <tr>
            <td><span class="loginfont">Password:</span> </td>
            <td><input type="password" class="fixedwidth" name="passwortLogin" placeholder="Password"></td>
          </tr>
          <tr>
            <td colspan="2"><input type="submit" class="accountButton orange customcursor" style="height:28px;" name="Login" value="Login">
            <!--<td><input type="submit" class="accountButton grey fixedwidth customcursor" style="height:28px;" id="comingsoon" name="Registrieren" value="Registrieren"></td>-->
            <a href="javascript:undefined;" style="cursor: pointer;" class="link" onclick="showHideRegistrieren();">Noch nicht registriert?</a></td>
          </tr>
        </table>
      </form>
      <?php if($error) echo "<span>" . $errorText . "</span>"; ?>
      <?php else: ?>
      <span>Eingeloggt als: <?php echo $eingeloggterUser ?></span><br>
      <a href="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]) . '?logout=1' ?>">Ausloggen</a>
      <?php endif ?>
    </div>
  </div>
  <div class="grid2">
    <img src="../pics/Logo.png" class="logo customcursor" alt="">
  </div>
</header>
<div class="headddd">
 <div class="navwrapperrrr" style="height: 60px;">
    <nav class="navvvv" id="navvvv" style="height: 60px;">
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
</div>

<?php
$errorText = $username = $email = $passwort = $passwortWiederholung = '';
$error = $anmeldungErfolgreich = false;
$registrierenAnzeigen = (isset($_GET["register"]) and $_SERVER["REQUEST_METHOD"] == "POST" and isset($_POST['username']));

if($registrierenAnzeigen){
  $username = test_input($_POST['username']);
  if($username == ''){
    $error = true;
    $errorText = 'Kein Username angegeben!';
  }
  $email = test_input($_POST['email']);
  if(!$error and !filter_var($email, FILTER_VALIDATE_EMAIL)){
    $error = true;
    $errorText = 'Keine gültige E-Mail angegeben!';
  }
  $passwort = test_input($_POST['passwort']);
  if(!$error and strlen($passwort) < 8){
    $error = true;
    $errorText = 'Passwort muss mindestens 8 Zeichen lang sein!';
  }
  $passwortWiederholung = test_input($_POST['passwortWiederholen']);
  if(!$error and $passwortWiederholung <> $passwort){
    $error = true;
    $errorText = 'Passwörter stimmen nicht überein!';
  }

  if(!isset($pdo)){
    $pdo = new PDO('mysql:host=localhost;dbname=triple20_test', 'triple20_Leo', 'triple20');
  }

  if(!$error){
    // schauen, ob es bereits jemanden mit diesem Username oder dieser E-Mail gibt
    $statement = $pdo->prepare('select * from Spieler where username = :username or email = :email');
    if($statement->execute(array(':username' => $username, ':email' => $email))){
      if($statement->fetch() <> false){
        $error = true;
        $errorText = 'Es gibt bereits einen Spieler mit diesem Benutzernamen oder mit dieser E-Mail!';
      }
    }else{
      $error = true;
      $errorText = 'Ein Fehler ist aufgetreten!';
    }
  }

  if(!$error){
    // Zufällige Zahl zur Bestätigung der E-Mail generieren
    $randomNumber = random_int(0, 1000000);
    // Daten speichern
    $statement = $pdo->prepare('insert into Spieler (username, email, passwort, status, emailBestaetigungNummer, angelegtam, geaendertam) 
                                values (:username, :email, :passwort, :status, :randomNummer, NOW(), NOW())');
    $result = $statement->execute(array(':username' => $username, ':email' => $email, 
                                        ':passwort' => password_hash($passwort, PASSWORD_DEFAULT), ':status' => Status::Offen,
                                        ':randomNummer' => $randomNumber));
    if(!$result){
      $error = true;
      $errorText = 'Registrierung fehlgeschlagen!';
    }else{
      $anmeldungErfolgreich = true;

      // Bestätigungs-Mail schicken
      $betreff = 'Anmeldung bei Triple20';
      $header = "Content-type: text/html; charset=utf-8\r\n";
      $body = "
      <html>
        <body>
          Hallo $username,
          <p>
            Wir freuen uns, dass du jetzt Teil der Triple20-Community bist! 
            Damit du den kompletten Spielspaß erfahren kannst, bestätige deine E-Mail bitte mit dem folgenden Link:
            <p><a href='triple20.bplaced.net/html/bestaetigen.php?username=$username&zahl=$randomNumber'>Link</a></p>                
            <p>Viel Spaß beim Spielen,<br>
               Dein Triple20-Team
            </p>
          </p>
        </body>
      </html>";

      mail($email, $betreff, $body, $header);
    }
  }

  $pdo = null;

  echo "<div id='backdrop'></div>";
}
?>
<div id="registrieren" <?php if($registrierenAnzeigen) {echo "style=display:block;";} ?>>
  <div style="text-align: right;"><span class="schliessenX" onclick="showHideRegistrieren();">x</span></div>
  <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]) . '?register=1';?>" method="POST">
    <div class="grid-container">
      <span class="label">Username: </span><input type="text" name="username" placeholder="z. Bsp. &quot;MaxMustermann1999&quot;" value="<?php echo $username ?>">
      <span class="label">E-Mail: </span><input type="text" name="email" placeholder="E-Mail" value="<?php echo $email ?>">
      <span class="label">Passwort: </span><input type="password" name="passwort" placeholder="Passwort" value="<?php echo $passwort ?>">
      <span class="label">Passwort wiederholen: </span><input type="password" name="passwortWiederholen" placeholder="Passwort wiederholen" value="<?php echo $passwortWiederholung ?>">
      <input type="submit" class="buttonColumn" value="Registrieren">
    </div>
  </form>
  <?php
    $hinweisText = '';
    if($error){
      $hinweisText = $errorText;
    }elseif($anmeldungErfolgreich){
      $hinweisText = 'Registrierung erfolgreich! Es wurde eine Bestätigungs-Mail verschickt! Sie können sich nun einloggen!';
    }
    if($hinweisText <> ''){
      echo "<span class='hinweisTextRegistrieren'> " . $hinweisText . "</span>";
    }
  ?>
</div>