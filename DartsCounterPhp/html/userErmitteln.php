<?php
session_start();

if(isset($_SESSION["username"]) and $_SESSION["username"] <> '') {
    echo $_SESSION["username"];
}

echo "";
?>