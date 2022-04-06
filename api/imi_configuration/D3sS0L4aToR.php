<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "imoosarveri_3GuIm00S42";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
  $conn->setAttribute(PDO::MYSQL_ATTR_INIT_COMMAND, "SET NAMES 'utf8'");
  
} catch(PDOException $e) {
  // echo $sql . "<br>" . $e->getMessage();
}
?>