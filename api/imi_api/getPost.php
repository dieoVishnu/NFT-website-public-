<?php

include('../imi_configuration/D3sS0L4aToR.php');
// include('../imi_includes/imi_config.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");



$myObj = new \stdClass();
$adid = $_GET['product_id'];
$catid = $_GET['category_id'];

// 1 cars
// 2 memerobilia

    try{
        // $searchUser = "SELECT * FROM ad_list INNER JOIN ad_classifi ON ad_list.eg_adid = ad_classifi.eg_adid WHERE ad_list.ad_url_slug = '$adid' AND (ad_list.eg_isVerified = '1' OR ad_list.eg_isVerified = '4')";
        // $prepSearchUser = $conn->prepare($searchUser);
        // $prepSearchUser->execute();

        //Build initial SQL Query with or without categories
        switch ($catid) {
            case 2:
                $searchUser = "SELECT * FROM ad_list INNER JOIN ad_classifi ON ad_list.eg_adid = ad_classifi.eg_adid WHERE ad_list.ad_url_slug = '$adid' AND (ad_list.eg_isVerified = '1' OR ad_list.eg_isVerified = '4')";
                $prepSearchUser = $conn->prepare($searchUser);
                $prepSearchUser->execute();

                // 
                $result = $prepSearchUser->rowCount();

        
        if ($prepSearchUser->rowCount() > 0){
            while ($row = $prepSearchUser->fetch()) {
                $aduser = $row['u5er_id'];
                $ad_id = $row['eg_adid'];
                $ad_type = $row['eg_isAuction'];
                $ad_verify = $row['eg_isVerified'];
                $adtitle = $row['eg_title'];
                $adprice = $row['eg_price'];
                $ad_details = $row['eg_ad_details'];
                $adyear = $row['ad_year'];
                $adlocation = $row['eg_location'];
                $adcondition = $row['ad_condition'];
                $itemCategory = $row['ad_category'];

                $posted = $row['eg_dateAdd'];
                $datePost = date_create($posted);
            }

            //    Image for Header
            $getOPIMG = "SELECT * FROM `ad_media_imgs` WHERE `eg_adid` = '$ad_id' LIMIT 1";
            $stmtOPIMG = $conn->prepare($getOPIMG);
            $stmtOPIMG->execute();

            $result = $stmtOPIMG->rowCount();

            if ($result > 0) {
                $row = $stmtOPIMG->fetch();
                $imgOP = $row['ad_img_url'];
            } else {
                $imgOP = 'https://imoodini.com/imi-media/og-image-home.jpg';
            }

             //    Name and Number
             $NamePlus = "SELECT * FROM user_account WHERE u5er_id = '$aduser'";
             $stmtYeet = $conn->prepare($NamePlus);
             $stmtYeet->execute();
             $result = $stmtYeet->rowCount();
             if ($result > 0) {
                 while ($row = $stmtYeet->fetch()) {
                     $userName = $row['u5er_name'];
                     $userNumber = $row['u5er_Number'];
                 }
             } else {
                 $userName = "Unknown";
                 $userNumber = "Unknown";
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
                    );

                    $error = 200;
                    $resp = "Success";
        }
        else {
            $error = 404;
            $resp = "User not found";
        }
                break;
            case 1:
                $searchUser = "SELECT * FROM ad_list INNER JOIN ad_cars ON ad_list.eg_adid = ad_cars.eg_adid WHERE ad_list.ad_url_slug = '$adid' AND (ad_list.eg_isVerified = '1' OR ad_list.eg_isVerified = '4')";
                $prepSearchUser = $conn->prepare($searchUser);
                $prepSearchUser->execute();

                // 

                $result = $prepSearchUser->rowCount();

        
                if ($prepSearchUser->rowCount() > 0){
                    while ($row = $prepSearchUser->fetch()) {
                        $aduser = $row['u5er_id'];
                        $ad_id = $row['eg_adid'];
                        $ad_type = $row['eg_isAuction'];
                        $ad_verify = $row['eg_isVerified'];
                        $adtitle = $row['eg_title'];
                        $adprice = $row['eg_price'];
                        $ad_contact = $row['ad_contact'];
                        $ad_details = $row['eg_ad_details'];
                        $admake = $row['ad_make'];
                        $adyear = $row['ad_year'];
                        $adcartype = $row['ad_cartype'];
                        $addoor = $row['ad_doors'];
                        $adlocation = $row['eg_location'];
                        $adtype = $row['ad_cartype'];
                        $adcolor = $row['ad_color'];
                        $adfuel = $row['ad_fuel'];
                        $adcondition = $row['ad_condition'];
                        $adkms = $row['ad_kms'];
                        $adtrans = $row['ad_transmission'];
                        
                        $posted = $row['eg_dateAdd'];
                        $datePost = date_create($posted);
                    }
        
                    //    Image for Header
                    $getOPIMG = "SELECT * FROM `ad_media_imgs` WHERE `eg_adid` = '$ad_id' LIMIT 1";
                    $stmtOPIMG = $conn->prepare($getOPIMG);
                    $stmtOPIMG->execute();
        
                    $result = $stmtOPIMG->rowCount();
        
                    if ($result > 0) {
                        $row = $stmtOPIMG->fetch();
                        $imgOP = $row['ad_img_url'];
                    } else {
                        $imgOP = 'https://imoodini.com/imi-media/og-image-home.jpg';
                    }
        
                     //    Name and Number
                     $NamePlus = "SELECT * FROM user_account WHERE u5er_id = '$aduser'";
                     $stmtYeet = $conn->prepare($NamePlus);
                     $stmtYeet->execute();
                     $result = $stmtYeet->rowCount();
                     if ($result > 0) {
                         while ($row = $stmtYeet->fetch()) {
                             $userName = $row['u5er_name'];
                             $userNumber = $row['u5er_Number'];
                         }
                     } else {
                         $userName = "Unknown";
                         $userNumber = "Unknown";
                     }
        
                    $p  = array(
                                "ad_id" => "$ad_id",
                                "user_name" => "$userName",
                                "ad_title" => "$adtitle",
                                "ad_price" => "$adprice",
                                "ad_cover_image" => "$imgOP",
                                "ad_details" => "$ad_details",
                                "adlocation" => "$adlocation",
                                "adcondition" => "$adcondition",
                                "ad_make" => "$admake",
                                "ad_doors" => "$addoor",
                                "adyear" => "$adyear",
                                "ad_color" => "$adcolor",
                                "ad_fuel" => "$adfuel",
                                "ad_transmission" => "$adtrans",
                                "ad_kms" => "$adkms",
                                "datePost" => "$posted",
                            );
        
                            $error = 200;
                            $resp = "Success1";
                }
                else {
                    $error = 404;
                    $resp = "User not found";
                }
                
                break;
            default:
            $searchUser = "SELECT * FROM ad_list INNER JOIN ad_cars ON ad_list.eg_adid = ad_cars.eg_adid WHERE ad_list.ad_url_slug = '$adid' AND (ad_list.eg_isVerified = '1' OR ad_list.eg_isVerified = '4')";
            $prepSearchUser = $conn->prepare($searchUser);
            $prepSearchUser->execute();
                break;
        }

        $result = $prepSearchUser->rowCount();

        
        // if ($prepSearchUser->rowCount() > 0){
        //     while ($row = $prepSearchUser->fetch()) {
        //         $aduser = $row['u5er_id'];
        //         $ad_id = $row['eg_adid'];
        //         $ad_type = $row['eg_isAuction'];
        //         $ad_verify = $row['eg_isVerified'];
        //         $adtitle = $row['eg_title'];
        //         $adprice = $row['eg_price'];
        //         $ad_details = $row['eg_ad_details'];
        //         $adyear = $row['ad_year'];
        //         $adlocation = $row['eg_location'];
        //         $adcondition = $row['ad_condition'];
        //         $itemCategory = $row['ad_category'];

        //         $posted = $row['eg_dateAdd'];
        //         $datePost = date_create($posted);
        //     }

        //     //    Image for Header
        //     $getOPIMG = "SELECT * FROM `ad_media_imgs` WHERE `eg_adid` = '$ad_id' LIMIT 1";
        //     $stmtOPIMG = $conn->prepare($getOPIMG);
        //     $stmtOPIMG->execute();

        //     $result = $stmtOPIMG->rowCount();

        //     if ($result > 0) {
        //         $row = $stmtOPIMG->fetch();
        //         $imgOP = $row['ad_img_url'];
        //     } else {
        //         $imgOP = 'https://imoodini.com/imi-media/og-image-home.jpg';
        //     }

        //      //    Name and Number
        //      $NamePlus = "SELECT * FROM user_account WHERE u5er_id = '$aduser'";
        //      $stmtYeet = $conn->prepare($NamePlus);
        //      $stmtYeet->execute();
        //      $result = $stmtYeet->rowCount();
        //      if ($result > 0) {
        //          while ($row = $stmtYeet->fetch()) {
        //              $userName = $row['u5er_name'];
        //              $userNumber = $row['u5er_Number'];
        //          }
        //      } else {
        //          $userName = "Unknown";
        //          $userNumber = "Unknown";
        //      }

        //     $p  = array(
        //                 "ad_id" => "$ad_id",
        //                 "user_name" => "$userName",
        //                 "ad_title" => "$adtitle",
        //                 "ad_category" => "$itemCategory",
        //                 "ad_price" => "$adprice",
        //                 "ad_cover_image" => "$imgOP",
        //                 "ad_details" => "$ad_details",
        //                 "adlocation" => "$adlocation",
        //                 "adcondition" => "$adcondition",
        //                 "adyear" => "$adyear",
        //             );

        //             $error = 200;
        //             $resp = "Success";
        // }
        // else {
        //     $error = 404;
        //     $resp = "User not found";
        // }

        // if ($prepSearchUser->rowCount() > 0) {
        //     $result = $prepSearchUser->fetch();
        //     $userID = $result['id'];
        //     $userName = $result['u5er_name'];
        //     $adtitle = $row['eg_title'];

    
        //     $p  = array(
        //         "user_ID" => "$userID",
        //         "user_Name" => "$userName",
        //         "user_title" => "$adtitle",
        //     );
    
        //     $_SESSION['person_inside'] = $userID;
        //     $_SESSION['person_name'] = $userName;
    
        //     $error = 200;
        //     $resp = "Success";
    
        // } else {
        //     $error = 404;
        //     $resp = "User not found";
        // }
    }
    catch (PDOException $e){
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