<?php

include('../../imi_configuration/D3sS0L4aToR.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conditions = array();
$response_data = array();

if (!empty(isset($_GET['term']))) {
    $term = htmlspecialchars($_GET['term']);
    $conditions[] = "`eg_title` LIKE '%$term%' AND (`eg_isVerified` >= 1)";
} else {
    $term = "";
}

if (!empty(isset($_GET['listall']))) {
    $listall = $_GET['listall'];

} else {
    $listall = 0;
}

if (!empty(isset($_GET['items']))) {
    $no_items = $_GET['items'];

} else {
    $no_items = 12;
}

if (!empty(isset($_GET['page']))) {
    $page = $_GET['page'];
    if(is_numeric($page)) {
        $present_page = (int) $page;
    } else {
        $present_page = 1;
    }
} else {
    $present_page = 1;
}

// if (! empty(isset($_REQUEST['sort']))) {
//     $sort = $_REQUEST['sort'];
// } 

if (!empty(isset($_REQUEST['price']))) {
    $filter = $_REQUEST['price'];
    switch ($filter) {
        case 'rel':
            $by = '`eg_title` ASC';
            break;
        case 'rec':
            $by = '`eg_date` ASC';
            break;
        case 'lh':
            $by = '`eg_price` ASC';
            break;
        case 'hl':
            $by = '`eg_price` DESC';
            break;
    }
    $conditions[] = "ORDER BY $by";
}

if ($term != "") {

    $offset = ($present_page - 1) * $no_items;

    $query = "SELECT eg_adid, eg_title, eg_price, eg_location, eg_isVerified, eg_ad_details FROM `ad_list`";
    $queryCount = "SELECT COUNT(*) FROM ad_list";

    $sqlStmt = $query;

    if (count($conditions) > 0) {
        $sqlStmt .= " WHERE " . implode(' ', $conditions) . " LIMIT $offset, $no_items";
        $queryCount .= " WHERE " . implode(' AND ', $conditions);

    }

    // echo $sqlStmt;

    try {
        $queryCar = $sqlStmt;
        $stmt = $conn->prepare($queryCar);
        $stmt->execute();

        $res_count = $conn->prepare($queryCount);
        $res_count->execute();

        $rowCount = $res_count->fetch();

        $result = $stmt->rowCount();

        $urlToImg = "https://imoodini.com/imi_includes/media/listing-img/";

        if ($result > 0) {

            $row = $stmt->fetchAll();

            for($i = 0; ($result) > $i; $i++){
                // echo "Data available";

                // print_r($row[$i]['eg_title']);

                $finalImgUrl = "";

                $ad_id = $row[$i]['eg_adid'];
                $ad_provider = $row[$i]['eg_isVerified'];
                $adtitle = $row[$i]['eg_title'];
                $adprice = $row[$i]['eg_price'];
                $adlocation = $row[$i]['eg_location'];

                $getIMG = "SELECT ad_img_url FROM `ad_media_imgs` WHERE `eg_adid` = '$ad_id' LIMIT 1";
                $stmtIMG = $conn->prepare($getIMG);
                $stmtIMG->execute();

                $imgQ = $stmtIMG->fetch();
                $img = $imgQ['ad_img_url'];

                if ($ad_provider >= 101) {
                    $finalImgUrl = $img;
                    $ad_link = $row[$i]['eg_ad_details'];
                } else {
                    $finalImgUrl .= $urlToImg . $img;
                    $ad_link = "";
                }

                //Compile as an array object
                $p  = array(
                    "ad_id" => (int) $ad_id,
                    "ad_provider" => $ad_provider,
                    "ad_title" => "$adtitle",
                    "ad_price" => (int) $adprice,
                    "ad_location" => "$adlocation",
                    "ad_cover_image" => "$finalImgUrl",
                    "ad_link" => "$ad_link"
                );

                $response_data[] = $p;

            }

            $response_code = 200;
            $response_msg = "Success";
            $response_desc = "Watches";
            $total_items = $rowCount[0];
        
            $conn = null;

            response($response_data, $response_code, $response_desc, $response_msg, $total_items, $present_page, $no_items);

        } else {

            $response_code = 404;
            $response_msg = "No Data found";
            $response_desc = "Watches";
            $response_data = null;
            $total_items = 0;

            $conn = null;

            response($response_data, $response_code, $response_desc, $response_msg, $total_items, $present_page, $no_items);        }

    } catch (PDOException $e) {

        // Put debugger here for dev purposes.

        $response_code = 2;
        $response_msg = "Invalid Query";
        $response_desc = "Watches";
        $response_data = null;
        $total_items = $result;
        $total_items = 0;

        $conn = null;

        response($response_data, $response_code, $response_desc, $response_msg, $total_items, $present_page, $no_items);    }

    }
// } else {

//     $response_code = -2;
//     $response_msg = "Invalid Request";
//     $response_desc = "Watches";
//     $response_data = null;
//     $total_items = 0;
//     $total_items = 0;

//     response($response_data, $response_code, $response_desc, $response_msg, $total_items, $present_page);

// }

if($listall == 1){

    $offset = ($present_page - 1) * 12;

    $query = "SELECT eg_adid, eg_title, eg_price, eg_location, eg_isVerified, eg_ad_details FROM `ad_list` WHERE `eg_category` = 'Watches' LIMIT $offset, $no_items";
    $queryCount = "SELECT COUNT(*) FROM ad_list WHERE `eg_category` = 'Watches'";

    // echo $sqlStmt;

    try {
        $queryCar = $query;
        $stmt = $conn->prepare($queryCar);
        $stmt->execute();

        $res_count = $conn->prepare($queryCount);
        $res_count->execute();

        $rowCount = $res_count->fetch();

        $result = $stmt->rowCount();

        $urlToImg = "https://imoodini.com/imi_includes/media/listing-img/";

        if ($result > 0) {

            $row = $stmt->fetchAll();

            for($i = 0; ($result) > $i; $i++){
                // echo "Data available";

                // print_r($row[$i]['eg_title']);

                $finalImgUrl = "";

                $ad_id = $row[$i]['eg_adid'];
                $ad_provider = $row[$i]['eg_isVerified'];
                $adtitle = $row[$i]['eg_title'];
                $adprice = $row[$i]['eg_price'];
                $adlocation = $row[$i]['eg_location'];

                $getIMG = "SELECT ad_img_url FROM `ad_media_imgs` WHERE `eg_adid` = '$ad_id' LIMIT 1";
                $stmtIMG = $conn->prepare($getIMG);
                $stmtIMG->execute();

                $imgQ = $stmtIMG->fetch();
                $img = $imgQ['ad_img_url'];

                if ($ad_provider >= 101) {
                    $finalImgUrl = $img;
                    $ad_link = $row[$i]['eg_ad_details'];
                } else {
                    $finalImgUrl .= $urlToImg . $img;
                    $ad_link = "";
                }

                //Compile as an array object
                $p  = array(
                    "ad_id" => (int) $ad_id,
                    "ad_provider" => $ad_provider,
                    "ad_title" => "$adtitle",
                    "ad_price" => (int) $adprice,
                    "ad_location" => "$adlocation",
                    "ad_cover_image" => "$finalImgUrl",
                    "ad_link" => "$ad_link"
                );

                $response_data[] = $p;

            }

            $response_code = 200;
            $response_msg = "Success";
            $response_desc = "Watches";
            $total_items = $rowCount[0];
        
            $conn = null;

            response($response_data, $response_code, $response_desc, $response_msg, $total_items, $present_page, $no_items);

        } else {

            $response_code = 404;
            $response_msg = "No Data found";
            $response_desc = "Watches";
            $response_data = null;
            $total_items = 0;

            $conn = null;

            response($response_data, $response_code, $response_desc, $response_msg, $total_items, $present_page, $no_items);        }

    } catch (PDOException $e) {

        // Put debugger here for dev purposes.

        $response_code = 2;
        $response_msg = "Invalid Query";
        $response_desc = "Watches";
        $response_data = null;
        $total_items = $result;
        $total_items = 0;

        $conn = null;

        response($response_data, $response_code, $response_desc, $response_msg, $total_items, $present_page, $no_items);    }
}

function response($data, $response_code, $response_desc, $response_msg, $items, $current_page, $no_items)
{
    $response['response_desc'] = $response_desc;
    $response['response_code'] = $response_code;
    $response['response_msg'] = $response_msg;
    $response['data'] = $data;

    if($items < 10){
        $response['pages'] = 1;
    } else {
        $response['pages'] = ceil($items / $no_items);
    }

    $response['current_page'] = $current_page;
    $response['item_count'] = $items;

    $json_response = json_encode($response);
    echo $json_response;
}

?>