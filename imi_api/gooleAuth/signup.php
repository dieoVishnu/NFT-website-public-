<?php


include('../../imi_configuration/D3sS0L4aToR.php');
include('../../imi_includes/imi_config.php');


// Include Configuration File

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");




$login_button = '';
$resp = 0;
$p = null;
$error = 0;
$myObj = new \stdClass();

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$familyName = $data->familyName;
$givenName = $data->givenName;
$googleId = $data->passph;
// $imageUrl = $data->imageUrl;

$encpo = hash('sha256', '4ll3g0r14' . $googleId . '3qu1pg3nt5');
$usrid = md5($givenName . $email);
$ouTL4sT = uniqid(md5(time()));
$email = strtolower($email);



if(isset($data->email)
	&& isset($data->passph)
	&& isset($data->email)
	){
		
        $searchUser = "SELECT * FROM `user_account` WHERE `u5er_email` = '$email' AND `u5er_pass` = '$encpo' LIMIT 1";
        $prepSearchUser = $conn->prepare($searchUser);
        $prepSearchUser->execute();
		
		if($prepSearchUser->rowCount() > 0){
			$result = $prepSearchUser->fetch();
            $userID = $result['u5er_id'];
            $userName = $result['u5er_name'];
			echo json_encode(["success"=>true,"account"=>true,"usersid"=>$userID,"user_Name" => "$userName"]);
			return;
		}
		else {
			$date = date('Y-m-d H:i:s');
            $insertuser =
            "INSERT INTO `user_account` (`u5er_FID`, 
        `u5er_MeTy`, 
        `u5er_id`, 
        `u5er_name`, 
        `u5er_email`, 
        `u5er_Number`, 
        `u5er_pass`, 
        `u5er_VaRFN`, 
        `u5er_ViDate`, 
        `u5er_DMos`,
        `u5er_DDat`, 
        `u5er_DYey`, 
        `u5er_GenD`, 
        `u5er_NaTio`) 
        VALUES (
            NULL, 
            '1', 
            '$usrid', 
            '$givenName', 
            '$email', 
            '' , 
            '$encpo',
            '$ouTL4sT', 
            NULL, 
            NULL, 
            NULL, 
            NULL, 
            NULL, 
            NULL)";
			$prepInsertuser = $conn->prepare($insertuser);

            $prepInsertuser->execute();
		}
	}

    echo json_encode(["success"=>true]);


    

?>

