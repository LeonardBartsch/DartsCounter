<?php
session_start();
include('generalFunctions.inc.php');

include('favoritenErmittelnCore.inc.php');

// Variable wird durch favoritenErmittelnCore gesetzt
echo jsonAusgeben($result);

?>