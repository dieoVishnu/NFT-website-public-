<?php

//start session on web page
session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
//config.php

//Include Google Client Library for PHP autoload file
require_once 'vendor/autoload.php';

//Make object of Google API Client for call Google API
$google_client = new Google_Client();

//Set the OAuth 2.0 Client ID
$google_client->setClientId('259448864576-icpu8u5hehe4crnug6dg1gppkmj6nlfp.apps.googleusercontent.com');

//Set the OAuth 2.0 Client Secret key
$google_client->setClientSecret('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');

//Set the OAuth 2.0 Redirect URI
$google_client->setRedirectUri('http://localhost:3000/login');

// to get the email and profile 
$google_client->addScope('email');

$google_client->addScope('profile');

?> 