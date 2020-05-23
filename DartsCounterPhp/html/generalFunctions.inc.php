<?php

setPDO();

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function setPDO() {
    global $pdo;
    $pdo = new PDO('mysql:host=localhost;dbname=triple20_test', 'triple20_Leo', 'triple20');
}

/*function getPDO() {
    return new PDO('mysql:host=localhost;dbname=triple20_test', 'triple20_Leo', 'triple20');
}*/

function jsonAusgeben($jsonArray) {
    echo json_encode($jsonArray, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
}

$pdo;
class Db {
    
    public static function execute($sql, $parameter) {
        global $pdo;
        $statement = $pdo->prepare($sql);
        return $statement->execute($parameter);
    }

    public static function get($sql, $parameter, &$success = false) {
        global $pdo;
        
        $statement = $pdo->prepare($sql);
        $success = $statement->execute($parameter);

        if($success) {
            return $statement->fetchAll();
        }else {
            return array();
        }
    }

    public static function single($sql, $parameter, &$success) {
        $result = Db::get($sql, $parameter, $success);

        $success = $success and count($result) == 1;

        if($success)
            return $result[0];
        else
            return array();
    }

    public static function runTransaction($func) {
        global $pdo;

        $pdo->beginTransaction();
        $result = $func();

        if($result)
            $pdo->commit();
        else
            $pdo->rollback();

        return $result;
    }
}