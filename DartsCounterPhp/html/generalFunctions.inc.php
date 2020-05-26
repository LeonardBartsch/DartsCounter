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

function jsonEinlesen() {
    $rawBody = file_get_contents("php://input");
    return json_decode($rawBody, true);
}

function jsonAusgeben($jsonArray) {
    echo json_encode($jsonArray, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
}

function lfdNrErmitteln($tabelle, $lfdNrAttribut, $whereSql, $whereParams, &$out_Nr) {
    $sql = "select $lfdNrAttribut from $tabelle ";
    if($whereSql <> ""){
        $sql .= "where $whereSql "; 
    }

    $sql .= "order by $lfdNrAttribut desc limit 1";

    $resultRows = Db::get($sql, $whereParams, $success);

    if($success) {
        $out_Nr = $resultRows[0] ? $resultRows[0][$lfdNrAttribut] + 1 : 1;
    }

    return $success;
}

$pdo;
class Db {
    private const logFile = "../dbLog.txt";
    
    public static function execute($sql, $parameter) {
        global $pdo;
        $statement = $pdo->prepare($sql);
        $result = $statement->execute($parameter);
        
        if(!$result){
            Db::logError($statement->errorInfo()[2]);
        }

        return $result;
    }

    public static function get($sql, $parameter, &$success = false) {
        global $pdo;
        
        $statement = $pdo->prepare($sql);
        $success = $statement->execute($parameter);
        
        if($success) {
            return $statement->fetchAll();
        }else {
            Db::logError($statement->errorInfo()[2]);
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

    private static function logError($errorMsg) {
        file_put_contents(self::logFile, $errorMsg, FILE_APPEND);
    }
}