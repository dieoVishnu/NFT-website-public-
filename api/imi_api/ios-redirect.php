<?php
include('../imi_configuration/D3sS0L4aToR.php');
session_start();

$userToken = new \stdClass();

if(isset($_GET['auth_token'])){
    $userToken->getID =  $_GET['auth_userID'];
    $userToken->getReason = $_GET['auth_reason'];
    $userToken->getToken = $_GET['auth_token'];
    $userToken->getName = $_GET['auth_userName'];

    try {
        $searchUser = "SELECT * FROM `auth_tokener` WHERE `u5er_id` = '$userToken->getID' AND `u5er_token` = '$userToken->getToken' AND `token_reason` = '$userToken->getReason' LIMIT 1";
        $prepSearchUser = $conn->prepare($searchUser);
        $prepSearchUser->execute();

        if ($prepSearchUser->rowCount() > 0) {
            $_SESSION['person_inside'] = $userToken->getID;
            $_SESSION['person_name'] = $userToken->getName;

            header("Location: https://imoodini.com/index.php");

        }
    } catch (PDOException $e) {
        // echo $e;
    }

}
?>