<?php
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function getPDO() {
    return new PDO('mysql:host=localhost;dbname=triple20_test', 'triple20_Leo', 'triple20');
}