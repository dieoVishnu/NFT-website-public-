<?php
// include('../imi_configuration/user_indicator.php');
include('../imi_configuration/D3sS0L4aToR.php');
include('../imi_includes/imi_config.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");


$catchData = $_POST;
$person = $catchData['user'];

$getDashboardData = "SELECT * FROM ad_list WHERE u5er_id = '$person' AND (eg_isVerified = '0' OR eg_isVerified = '1' OR eg_isVerified = '2') ORDER BY eg_isVerified  DESC, eg_adid DESC";
$stmtGetData = $conn->prepare($getDashboardData);
$stmtGetData->execute();

$countAll = $stmtGetData->rowCount();


// data 

if ($countAll > 0) {
    while ($row = $stmtGetData->fetch()) {
        $aduser = $row['u5er_id'];
        $ad_id = $row['eg_adid'];
        $ad_type = $row['eg_isAuction'];
        $ad_category = $row['eg_category'];
        $adtitle = $row['eg_title'];
        $adprice = $row['eg_price'];
        $ad_details = $row['eg_ad_details'];
        $isAuction = $row['eg_isAuction'];
        $isVerified = $row['eg_isVerified'];

        $getIMG = "SELECT * FROM `ad_media_imgs` WHERE `eg_adid` = '$ad_id' LIMIT 1";
        $stmtIMG = $conn->prepare($getIMG);
        $stmtIMG->execute();

        $imgQ = $stmtIMG->fetch();
        $img = $imgQ['ad_img_url'];
    }
}

$p  = array(
    "ad_id" => "$ad_id",
    "user_name" => "$userName",
    "ad_title" => "$adtitle",
    "ad_category" => "$itemCategory",
    "ad_price" => "$adprice",
    "ad_cover_image" => "$imgOP",
    "ad_details" => "$ad_details",
    "adlocation" => "$adlocation",
    "adcondition" => "$adcondition",
    "adyear" => "$adyear",
    "ad_cover_image" => $urlToImg . "$img",
);

echo json_encode(["success"=>true,"data"=>$p]);