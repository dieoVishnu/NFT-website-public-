<?php
// include('../imi_configuration/user_indicator.php');
include('../imi_configuration/D3sS0L4aToR.php');
include('../imi_includes/imi_config.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

//Constants
$auction = 0;
$resp = 10; //default null
$Todate = date("Y-m-d");
$option = 0;


$postID = postNewId($conn);
$catchData = $_POST;
$postCategory = $catchData['uploadPhoto'];
$person = 'd805034f75345ebb50d102f555f1f2ea';

if ($postID != null) {
    uploadPostDetails($conn, $catchData, $postID, $person, $postCategory, $Todate);
    addPostDetails($conn, $postID, $catchData, $postCategory);
    uploadPostImages($conn, $postID, $person, $_FILES['upload']);
} else {
    exit();
}

function uploadPostDetails($conn, $contentData, $id, $person, $category, $Todate)
{

    switch ($category) {
        case 1:
            $postCategory = 'Car';
            break;
        case 2:
            $postCategory = 'Motor';
            break;
        case 3:
            $postCategory = 'Real Estate';
            break;
        case 4:
            $postCategory = 'Limited';
            break;
        default:
            exit();
            break;
    }
    
    $fID = $id;
    $ad_title = htmlspecialchars($contentData['list_title'], ENT_QUOTES);
    $ad_price = $contentData['list_price'];
    $ad_location = $contentData['list_location'];
    $ad_details_clean = htmlspecialchars($contentData['list_details'], ENT_QUOTES);
    $ad_number = $contentData['list_contact'];

    $ad_slug = slugify($ad_title, '-');
    $ad_tags = slugify($ad_title . " " . $ad_location . " " . $postCategory, '-');

    $insertList = "INSERT INTO `ad_list` (`id`, `eg_adid`, `u5er_id`, `eg_title`, `eg_price`, `eg_category`, `eg_location`, `eg_dateAdd`, `eg_dateEnd`, `eg_isAuction`, `eg_isVerified`, `eg_ad_details`, `ad_contact`, `ad_tag`, `ad_url_slug`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $listStmt = $conn->prepare($insertList);
    $listStmt->execute([$fID, $person, $ad_title, $ad_price, $postCategory, $ad_location, $Todate, '', 0, 0, $ad_details_clean, $ad_number, $ad_tags, $ad_slug]);
}

function addPostDetails($conn, $id, $contentData, $category)
{
    //For post details
    //TODO: 1 Classic Cars, 4 Sports Collection

    switch ($category) {
        case 1:
            $ad_make = $contentData['car_make'];
            $ad_year = $contentData['car_year'];
            $ad_km = $contentData['car_kilometers'];
            $ad_condition = $contentData['car_condition'];
            $ad_transmission = $contentData['car_transmission'];
            $ad_color = $contentData['car_color'];
            $ad_body = $contentData['car_bodytype'];
            $ad_fuel = $contentData['car_fueltype'];
            $ad_specs = $contentData['car_specs'];
            $ad_doors = $contentData['car_doors'];
            // $ad_doors = 2;

            $carsStatement = "INSERT INTO `ad_cars` (`id`, `eg_adid`, `ad_make`, `ad_year`, `ad_cartype`, `ad_doors`, `ad_color`, `ad_drive`, `ad_fuel`, `ad_kms`, `ad_transmission`, `ad_condition`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            $prep_carStatement = $conn->prepare($carsStatement);
            $prep_carStatement->execute([$id, $ad_make, $ad_year, $ad_body, $ad_doors, $ad_color, $ad_specs, $ad_fuel, $ad_km, $ad_transmission, $ad_condition]);

            break;
        case 2:
            $ad_make = $contentData['bike_make'];
            $ad_year = $contentData['bike_year'];
            $ad_km = $contentData['bike_kilometer'];
            $ad_condition = $contentData['bike_condition'];
            $ad_system = $contentData['bike_system'];
            $ad_color = $contentData['bike_color'];
            $ad_manufacturer = $contentData['bike_manufacturer'];
            $ad_engine = $contentData['bike_engine'];



            break;
        case 3:
            $ad_prop_type = $contentData['prop_type'];
            $ad_estate_sqm = $contentData['estate_sqm'];
            $ad_estate_bed = $contentData['estate_bed'];
            $ad_estate_bath = $contentData['estate_bath'];
            $ad_estate_parking = $contentData['estate_parking'];
            $ad_estate_developer = $contentData['estate_developer'];
            $ad_estate_mfee = $contentData['estate_mfee'];
            $ad_estate_propID = $contentData['estate_propID'];


            break;
        case 4:
            $ad_limited_age = $contentData['limited_age'];
            $ad_limited_condition = $contentData['limited_condition'];
            $ad_limited_category = $contentData['limited_category'];

            $lmtdStatement = "INSERT INTO `ad_classifi` (`id`, `eg_adid`, `ad_brand`, `ad_category`, `ad_year`, `ad_condition`) VALUES (NULL, ?, ?, ?, ?, ?)";

            $prep_lmtdStatement = $conn->prepare($lmtdStatement);
            $prep_lmtdStatement->execute([$id, 'idk', $ad_limited_category, $ad_limited_age, $ad_limited_condition]);

            break;
        default:
            echo "No data";
    }
}



//Get new ID for the post
function postNewId($conn)
{
    //New ID
    try {
        $latestID = "SELECT eg_adid FROM `ad_list` GROUP BY eg_adid DESC LIMIT 1";
        $stmtID = $conn->prepare($latestID);
        $stmtID->execute();
        $row = $stmtID->fetch();
        $rowCount = $stmtID->rowCount();

        if ($rowCount > 0) {
            $lID = $row['eg_adid'];
            return $lID + 1;
        } else {
            return 1000;
            
        }
    } catch (PDOException $e) {
        $resp = 11; //SQL Error
    }
}

function slugify($text, $divider)
{
    // replace non letter or digits by divider
    $text = preg_replace('~[^\pL\d]+~u', $divider, $text);

    // transliterate
    $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

    // remove unwanted characters
    $text = preg_replace('~[^-\w]+~', '', $text);

    // trim
    $text = trim($text, $divider);

    // remove duplicate divider
    $text = preg_replace('~-+~', $divider, $text);

    // lowercase
    $text = strtolower($text);

    if (empty($text)) {
        return 'n-a';
    }

    return $text;
}

function uploadPostImages($conn, $fID, $person, $photos)
{

    // Count # of uploaded files in array
    $total = count($photos['name']);

    // Loop through each file
    for ($i = 0; $i < $total; $i++) {

        $img_name = $photos['name'][$i];

        // Get the temp file path
        $tmpFilePath = $photos['tmp_name'][$i];

        $file_basename = substr($img_name, 0, strripos($img_name, '.')); // get file extention
        $file_ext = substr($img_name, strripos($img_name, '.')); // get file name
        $newName = "imoodini_" . $fID . "_" . $i . $file_ext;

        // //Make sure we have a file path
        if ($tmpFilePath != "") {
            //Setup our new file path
            $newFilePath = "../imi_includes/media/listing-img/" . $newName;

            //Upload the file into the temp dir
            if (move_uploaded_file($tmpFilePath, $newFilePath)) {

                try {
                    //Save to database 

                    $insertImg = "INSERT INTO `ad_media_imgs` (`id`, `eg_adid`, `u5er_id`, `ad_img_url`, `ImgNo`) VALUES (NULL, '$fID', '$person', '$newName', '$i')";
                    $stmt = $conn->prepare($insertImg);
                    $stmt->execute();
                } catch (PDOException $e) {
                    //Image didn't insert
                }
            }
        }
    }
    
}
