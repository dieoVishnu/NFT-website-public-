<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function

// require 'PHPMailer/PHPMailer/src/PHPMailer.php';
// require 'PHPMailer/PHPMailer/src/SMTP.php';
// require 'PHPMailer/PHPMailer/src/Exception.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


//Load Composer's autoloader
require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

$validation = 1;
$resp = 0;
$error = 0;
$myObj = new \stdClass();

// if ($validation == 1) {

    $request = $_GET;
//     // sendEmail($mail, $request);
// } else {

//     print_r($testData);

//     // exit(404);

// }

// function sendEmail($mail, $request)


    try {
        //Server settings
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'imap.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'contact@imoodini.com';                     //SMTP username
        $mail->Password   = 'TruestormsAlpha21';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('verify@imoodini.com', 'User Inquiry');
        $mail->addAddress('info@dieofficial.com', $request['inquiryUserName']);     //Add a recipient

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = '[Inquiry] ' . $request['inquiryItemNumber'] . ' - ' . $request['inquiryItemTitle'];
        $mail->Body    = "Inquiry from: {$request['inquiryUserName']} <br />
        Email: {$request['inquiryUserEmail']} <br />
        Contact Number: {$request['inquiryUserNumber']} <br />
        Inquiry for: {$request['inquiryItemNumber']} - {$request['inquiryItemTitle']} <br />
        Inquiry Message: {$request['inquiryBody']} <br />
        ";

        if($mail->send()){
            // header("Location: {$request['returnUrl']}");
            $error = 200;
            $resp = "Success";
            
           
        }

    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }


$myObj->api = "email portel";
$myObj->status = $error;
$myObj->response = $resp;
$myJSON = json_encode($myObj);
echo $myJSON;

?>