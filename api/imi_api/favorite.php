<?php

include('../imi_configuration/D3sS0L4aToR.php');
include('../imi_configuration/app_indicator.php');
include('../imi_includes/imi_config.php');

header("Content-Type: application/json; charset=UTF-8");

$myObj = new \stdClass();
$dateTimeToday = date("Y-m-d");
$userID = 'nobody';
$item = 1000;

if (isset($_GET['action']) && $_GET['action'] != null) {
    if (isset($_GET['fav']) && $_GET['fav'] != null) {
        $item = $_GET['fav'];
        switch ($_GET['action']) {
            case 'add':
                addFavorite($conn, $myObj, $userID, $item, $dateTimeToday);
                break;
            case 'delete':
                deleteFavorite($conn, $myObj, $userID, $item);
                break;
            default:
                exit();
        }
    }
} else {
    exit();
}

function addFavorite($db, $myObj, $userID, $itemFave, $toDate)
{
    $query = "INSERT INTO `user_fav` (`id`, `u5er_id`, `fave_item`, `fave_date`) VALUES (NULL, ?, ?, ?)";
    $stmt_prepare = $db->prepare($query);
    if ($stmt_prepare->execute([$userID, $itemFave, $toDate])) {
        compileAPI($myObj, 200, "Added");
    }
}

function deleteFavorite($db, $myObj, $userID, $itemFave)
{
    $query = "DELETE FROM `user_fav` WHERE `u5er_id` = ? AND `fave_item` = ?";
    $stmt_prepare = $db->prepare($query);
    if ($stmt_prepare->execute([$userID, $itemFave])) {
        compileAPI($myObj, 201, "Deleted");
    }
}

function compileAPI($myObj, $error, $resp)
{
    $myObj->api = "userFavorite";
    $myObj->status = $error;
    $myObj->response = $resp;

    $myJSON = json_encode($myObj);

    echo $myJSON;
}
