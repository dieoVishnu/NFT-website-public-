<?php
$url = "http://localhost/sorce/imoodini/";
$sale = 1;

if (isset($_COOKIE['oncart']) && $_COOKIE['oncart'] != '') {
    $cartems = json_decode($_COOKIE['oncart']);
    $cartems_count = count($cartems);
} else {
    $cartems_count = 0;
}

if (isset($_COOKIE['currency']) && $_COOKIE['currency'] != '') {
    $selectedCurrency = $_COOKIE['currency'];
} else {
    $selectedCurrency = "USD";
}
