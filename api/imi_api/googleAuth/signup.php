<?php

//index.php

//Include Configuration File
include('googleconfig.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

$login_button = '';
$resp = 0;
$p = null;
$error = 0;
$myObj = new \stdClass();

if(isset($_GET["code"]))
{
    $resp = $_GET["code"];

 $token = $google_client->fetchAccessTokenWithAuthCode($_GET["code"]);


//  if(!isset($token['error']))
//  {
 
//   $google_client->setAccessToken($token['access_token']);

 
//   $_SESSION['access_token'] = $token['access_token'];


//   $google_service = new Google_Service_Oauth2($google_client);

 
//   $data = $google_service->userinfo->get();

 
//   if(!empty($data['given_name']))
//   {
//    $_SESSION['user_first_name'] = $data['given_name'];
//   }

//   if(!empty($data['family_name']))
//   {
//    $_SESSION['user_last_name'] = $data['family_name'];
//   }

//   if(!empty($data['email']))
//   {
//    $_SESSION['user_email_address'] = $data['email'];
//   }

//   if(!empty($data['gender']))
//   {
//    $_SESSION['user_gender'] = $data['gender'];
//   }

//   if(!empty($data['picture']))
//   {
//    $_SESSION['user_image'] = $data['picture'];
//   }
//  }
}


// if(!isset($_SESSION['access_token']))
// {

//  $login_button = '<a href="'.$google_client->createAuthUrl().'">Login With Google</a>';
//   $p  = array(
//             "first_name" => $_SESSION['user_first_name'],
//             "last_name" => $_SESSION['user_last_name'],
//             "email_address" =>  $_SESSION['user_email_address']
//         );
// }
// $myObj->data = $p;
$myObj->response = $resp;
$myJSON = json_encode($myObj);
echo $myJSON;

?>
