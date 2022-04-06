<?php

include('../imi_configuration/D3sS0L4aToR.php');
include('../imi_configuration/app_indicator.php');
include('../imi_includes/imi_config.php');

header("Content-Type: application/json; charset=UTF-8");

//Initialize variables with defaul values
$search_term = null;
$sort = "";
$category = 0;
$limit = 12;
$current_page = 1;
$urlToImg = $url . "imi_includes/media/listing-img/";

//This is needed to initialize $myObj as an Object
$myObj = new \stdClass();


//Check if there is 'page' parameter
if (isset($_GET['page'])) {
    $current_page = $_GET['page'];
}

//Check if there is 'limit' parameter
if (isset($_GET['limit'])) {
    $limit = $_GET['limit'];
}

//For search term, category, and sorting
if (isset($_GET['category']) && isset($_GET['term']) && isset($_GET['sort'])) {

    $category = $_GET['category'];
    $search_term = $_GET['term'];
    $sort = $_GET['sort'];

    listSearch($conn, $myObj, $search_term, $category, $sort, $current_page, $limit, $urlToImg);

} else if (isset($_GET['category']) && isset($_GET['term'])) {

    //For Search with sorting

    $category = $_GET['category'];
    $search_term = $_GET['term'];

    if ($category != "") {
        listSearch($conn, $myObj, $search_term, $category, $sort, $current_page, $limit, $urlToImg);
    } else {
        listCategory($conn, $myObj, 0, $sort, $current_page, $limit, $urlToImg);
    }
} else if (isset($_GET['category']) && isset($_GET['sort'])) {

    //Category sorting

    $category = $_GET['category'];
    $sort = $_GET['sort'];

    if ($category != "") {
        listCategory($conn, $myObj, $category, $sort, $current_page, $limit, $urlToImg);
    } else {
        listCategory($conn, $myObj, 0, $sort, $current_page, $limit, $urlToImg);
    }
} else if (isset($_GET['category'])) {

    //Get data from specific category

    $category = $_GET['category'];
    if ($category != "") {
        listCategory($conn, $myObj, $category, $sort, $current_page, $limit, $urlToImg);
    } else {
        listCategory($conn, $myObj, 0, $sort, $current_page, $limit, $urlToImg);
    }
} else if (isset($_GET['term'])) {

    //Search for a term

    $search_term = $_GET['term'];
    if ($search_term != "") {
        listSearch($conn, $myObj, $search_term, $category, $sort, $current_page, $limit, $urlToImg);
    } else {
        compileAPI($myObj, 2, "Invalid request", null, 0, 0);
    }
} else if (isset($_GET['sort'])) {

    //Sort all items (No category)

    $sort = $_GET['sort'];

    if ($sort != "") {
        listCategory($conn, $myObj, $category, $sort, $current_page, $limit, $urlToImg);
    } else {
        listCategory($conn, $myObj, 0, $sort, $current_page, $limit, $urlToImg);
    }
} else {

    compileAPI($myObj, 2, "Invalid request", null, 0, 0);
}

function listCategory($conn, $myObj, $category, $sort, $page, $limit, $urlToImg)
{

    $queryCount = "";
    $cond = "";
    $present_page = $page;
    $no_items = $limit;

    //Array for the conditions like category
    $cond = array();

    try {

        //Page number
        $offset = ($present_page - 1) * $no_items;

        //Build initial SQL Query with or without categories
        switch ($category) {
            case 1:
                $queryCategory = "SELECT * FROM `ad_list` INNER JOIN `ad_cars` ON `ad_list`.`eg_adid` = `ad_cars`.`eg_adid`";
                $queryCount = "SELECT COUNT(*) AS 'items' FROM ad_list INNER JOIN `ad_cars` ON `ad_list`.`eg_adid` = `ad_cars`.`eg_adid`";
                $cond[] = "`eg_isVerified` = 1 AND `eg_category` LIKE 'Car'";
                break;
            case 2:
                $queryCategory = "SELECT * FROM `ad_list` INNER JOIN `ad_classifi` ON `ad_list`.`eg_adid` = `ad_classifi`.`eg_adid`";
                $queryCount = "SELECT COUNT(*) AS 'items' FROM ad_list INNER JOIN `ad_classifi` ON `ad_list`.`eg_adid` = `ad_classifi`.`eg_adid`";
                $cond[] = "`eg_isVerified` = 1 AND `eg_category` LIKE 'Limited'";
                break;
            default:
                $queryCategory = "SELECT * FROM ad_list";
                $queryCount = "SELECT COUNT(*) AS 'items' FROM ad_list";
                $cond[] = "`eg_isVerified` = 1";
                break;
        }

        //Sorting code that is added to the final SQL Query
        switch ($sort) {
            case 'rel':
                $sort_condition = ' ORDER BY `ad_list`.`eg_adid`';
                break;
            case 'az':
                $sort_condition = ' ORDER BY `ad_list`.`eg_title` ASC';
                break;
            case 'za':
                $sort_condition = ' ORDER BY `ad_list`.`eg_title` DESC';
                break;
            case 'lh':
                $sort_condition = ' ORDER BY `ad_list`.`eg_price` ASC';
                break;
            case 'hl':
                $sort_condition = ' ORDER BY `ad_list`.`eg_price` DESC';
                break;
            default:
                $sort_condition = ' ORDER BY `ad_list`.`eg_adid`';
                break;
        }

        //Assign the conditions to $sqlStmt
        $sqlStmt = $queryCategory;

        //Check if the $cond array is empty
        if (!empty($cond)) {
            //Combine base and conditions into 1 SQL Query (Result and Count)
            $sqlStmt .= " WHERE " . implode(' AND ', $cond) . $sort_condition . " LIMIT $offset, $no_items";
            $queryCount .= " WHERE " . implode(' AND ', $cond);
        }

        //Execute Query for Results
        $stmt = $conn->prepare($sqlStmt);
        $stmt->execute();

        //Execute Query for item count
        $res_count = $conn->prepare($queryCount);
        $res_count->execute();

        //Assign $res_count result to $rowCount
        $rowCount = $res_count->fetch();

        //Set total pages but you need to round up if there are excess items
        $totalPage = ceil(($rowCount[0] / $no_items));

        $result = $stmt->rowCount();

        if ($result > 0) {

            while ($row = $stmt->fetch()) {

                $ad_id = $row['eg_adid'];
                $adtitle = $row['eg_title'];
                $adprice = $row['eg_price'];
                $adCategory = $row['eg_category'];
                $adlocation = $row['eg_location'];
                $adSlug = $row['ad_url_slug'];

                $getIMG = "SELECT * FROM `ad_media_imgs` WHERE `eg_adid` = '$ad_id' LIMIT 1";
                $stmtIMG = $conn->prepare($getIMG);
                $stmtIMG->execute();

                $imgQ = $stmtIMG->fetch();
                $img = $imgQ['ad_img_url'];

                //Compile as an array object
                $p  = array(
                    "ad_id" => "$ad_id",
                    "ad_title" => "$adtitle",
                    "ad_price" => (float)"$adprice",
                    "ad_category" => $adCategory,
                    "ad_location" => "$adlocation",
                    "ad_cover_image" => $urlToImg . "$img",
                    "ad_slug" => $adSlug
                );

                //Store to Array
                $dataCont[] = $p;
            }

            $error = 200;
            $resp = "Success";

            //Compile API to be shown
            compileAPI($myObj, $error, $resp, $dataCont, $rowCount[0], $totalPage);

            $conn = null;
            
        } else {
            $error = 404;
            $resp = "No Data found";

            $conn = null;

            compileAPI($myObj, $error, $resp, null, 0, 0);
        }
    } catch (PDOException $e) {
        // Put debugger here for dev purposes.

        // Error 2 is for Invalid Query or if the query fails to get data
        $resp = "Invalid Query";
        $error = 2;

        $conn = null;

        compileAPI($myObj, $error, $resp, null, 0, 0);
    }
}

//Function for search results
function listSearch($conn, $myObj, $search_term, $category, $sort, $page, $limit, $urlToImg)
{

    //Initialize default values
    $query = "";
    $queryCount = "";

    $present_page = $page;
    $no_items = $limit;

    $cond = array();

    try {

        //Page number to be used in the query for pagination
        $offset = ($present_page - 1) * $limit;

        switch ($category) {
            case 1:
                $query = "SELECT * FROM `ad_list` INNER JOIN `ad_cars` ON `ad_list`.`eg_adid` = `ad_cars`.`eg_adid`";
                $queryCount = "SELECT COUNT(*) FROM ad_list INNER JOIN `ad_cars` ON `ad_list`.`eg_adid` = `ad_cars`.`eg_adid`";
                $cond[] = "`eg_title` LIKE '%$search_term%' AND (`eg_isVerified` = 1) AND `eg_category` LIKE 'Car'";
                break;
            case 2:
                $query = "SELECT * FROM `ad_list` INNER JOIN `ad_classifi` ON `ad_list`.`eg_adid` = `ad_classifi`.`eg_adid`";
                $queryCount = "SELECT COUNT(*) FROM ad_list INNER JOIN `ad_classifi` ON `ad_list`.`eg_adid` = `ad_classifi`.`eg_adid`";
                $cond[] = "`eg_title` LIKE '%$search_term%' AND (`eg_isVerified` = 1) AND `eg_category` LIKE 'Limited'";
                break;
            default:
                $query = "SELECT * FROM `ad_list`";
                $queryCount = "SELECT COUNT(*) FROM ad_list";
                $cond[] = "`eg_title` LIKE '%$search_term%' AND (`eg_isVerified` = 1)";
                break;
        }

        switch ($sort) {
            case 'rel':
                $sort_condition = "ORDER BY eg_adid";
                break;
            case 'az':
                $sort_condition = "ORDER BY eg_title ASC";
                break;
            case 'za':
                $sort_condition = "ORDER BY eg_title DESC";
                break;
            case 'hl':
                $sort_condition = "ORDER BY eg_price DESC";
                break;
            case 'lh':
                $sort_condition = "ORDER BY eg_price ASC";
                break;
            default:
                $sort_condition = "";
                break;
        }

        $sqlStmt = $query;

        if (!empty($cond)) {
            $sqlStmt .= " WHERE " . implode(' AND ', $cond) . " " . $sort_condition . " LIMIT $offset, $limit";
            $queryCount .= " WHERE " . implode(' AND ', $cond);
        }

        $stmt = $conn->prepare($sqlStmt);
        $stmt->execute();

        $res_count = $conn->prepare($queryCount);
        $res_count->execute();

        $rowCount = $res_count->fetch();

        $totalPage = ceil(($rowCount[0] / $no_items));
        

        $result = $stmt->rowCount();

        if ($result > 0) {

            while ($row = $stmt->fetch()) {

                $ad_id = $row['eg_adid'];
                $adtitle = $row['eg_title'];
                $adprice = $row['eg_price'];
                $adlocation = $row['eg_location'];
                $adCategory = $row['eg_category'];
                $adSlug = $row['ad_url_slug'];

                $getIMG = "SELECT * FROM `ad_media_imgs` WHERE `eg_adid` = '$ad_id' LIMIT 1";
                $stmtIMG = $conn->prepare($getIMG);
                $stmtIMG->execute();

                $imgQ = $stmtIMG->fetch();
                $img = $imgQ['ad_img_url'];

                //Compile as an array object
                $p  = array(
                    "ad_id" => "$ad_id",
                    "ad_title" => "$adtitle",
                    "ad_price" => (float)"$adprice",
                    "ad_location" => "$adlocation",
                    "ad_category" => "$adCategory",
                    "ad_cover_image" => $urlToImg . "$img",
                    "ad_slug" => $adSlug
                );

                //Store to Array
                $dataCont[] = $p;
            }

            $error = 200;
            $resp = "Success";

            $conn = null;

            compileAPI($myObj, $error, $resp, $dataCont, $rowCount[0], $totalPage);
        } else {

            $error = 404;
            $resp = "No Data found";

            $conn = null;

            compileAPI($myObj, $error, $resp, null, 0, 0);
        }
    } catch (PDOException $e) {

        $resp = "Invalid Query";
        $error = 2;

        $conn = null;

        compileAPI($myObj, $error, $resp, null, 0, 0);
    }
}

function compileAPI($myObj, $error, $resp, $data, $item, $page)
{
    $myObj->api = "adData";
    $myObj->status = $error;
    $myObj->response = $resp;
    $myObj->data = $data;
    $myObj->items = $item;
    $myObj->pages = $page;

    $myJSON = json_encode($myObj);

    echo $myJSON;
}
