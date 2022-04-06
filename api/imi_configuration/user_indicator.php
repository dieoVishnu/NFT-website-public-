<?php
    $person = $_COOKIE['person_inside'];

    if($person == ""){
        header('Location: ../dashboard/login');
    }
?>