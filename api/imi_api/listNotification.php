<?php

include('../imi_configuration/D3sS0L4aToR.php');

header("Content-Type: application/json; charset=UTF-8");

$myObj = new \stdClass();

try {
    $queryCar = "SELECT * FROM user_notification";
    $stmt = $conn->prepare($queryCar);
    $stmt->execute();

    $result = $stmt->rowCount();

    if ($result > 0) {
        while ($row = $stmt->fetch()) {
            $user = $row['u5er_id'];
            $notification_title = $row['notif_title'];
            $notification_content = $row['notif_content'];
            $notification_type = $row['notif_type'];
            $notification_status = $row['notif_status'];

            //Compile as an array object
            $p  = array(
                "user_id" => "$user",
                "n_title" => "$notification_title",
                "n_content" => "$notification_content",
                "n_type" => "$notification_type",
                "n_stat" => $notification_status
            );

            //Store to Array
            $userData_List[] = $p;
        }

        $error = 200;
        $resp = "Success";
    } else {
        $error = 404;
        $resp = "No Data found";
    }
} catch (PDOException $e) {
    $resp = "Invalid Query";
    $error = 2;
}

$conn = null;

$myObj->api = "userNotification";
$myObj->status = $error;
$myObj->response = $resp;
$myObj->data = $userData_List;

$myJSON = json_encode($myObj);

echo $myJSON;

?>