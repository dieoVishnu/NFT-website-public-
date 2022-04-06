<?php
session_start();

include('../imi_configuration/D3sS0L4aToR.php');
include('../imi_configuration/app_indicator.php');

header("Content-Type: application/json; charset=UTF-8");

$ZaWarud0 = "Q2fUSbJGmc5VTheVe9gb6nHY84uqYg";
$handler_uname = "";
$handler_email = "";
$resp = 0;
$p = null;
$error = 0;
$myObj = new \stdClass();

$usname = $_POST['email'];
$uspass = $_POST['login_pasp'];

$usname = strtolower($usname);

$encpo = hash('sha256', '4ll3g0r14' . $uspass . '3qu1pg3nt5');

try {
    $searchUser = "SELECT * FROM `user_account` WHERE `u5er_email` = '$usname' AND `u5er_pass` = '$encpo' AND `u5er_VaRFN` = '$ZaWarud0' LIMIT 1";
    $prepSearchUser = $conn->prepare($searchUser);
    $prepSearchUser->execute();

    if ($prepSearchUser->rowCount() > 0) {
        $result = $prepSearchUser->fetch();
        $userID = $result['u5er_id'];
        $userName = $result['u5er_name'];

        //Get date today
        $dateNow = date("Y-m-d h:i:sa");
        //Get date until next month
        $d = strtotime("+1 Month");
        $dateExpire = date("Y-m-d h:i:sa", $d);

        //Enc Token
        $token_saltbay = "".$userID.$dateNow.$dateExpire.$userName;
        $token_gen = md5($token_saltbay);

        //Insert Token to db
        $addToken = "INSERT INTO `auth_tokener` (`id`, `u5er_id`, `u5er_token`, `token_reason`, `token_date_start`, `token_date_end`) VALUES (NULL, '$userID', '$token_gen', 'Login', '$dateNow', '$dateExpire')";
        $prepTokenGen = $conn->prepare($addToken);
        $prepTokenGen->execute();

        $p  = array(
            "user_ID" => "$userID",
            "user_Name" => "$userName",
            "token_splat" => $token_gen
        );

        $_SESSION['person_inside'] = $userID;
        $_SESSION['person_name'] = $userName;

        $error = 200;
        $resp = "Success";

    } else {
        $error = 404;
        $resp = "User not found";
    }
} catch (PDOException $e) {
    $error = 300;
    $resp = "Query Error";
}

$conn = null;

$myObj->api = "user-portal";
$myObj->status = $error;
$myObj->response = $resp;
$myObj->data = $p;

$myJSON = json_encode($myObj);

echo $myJSON;

?>