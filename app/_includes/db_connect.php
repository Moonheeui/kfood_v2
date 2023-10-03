<?php

$host = "localhost:3306";
$db_name = "moonhee42_kfood_v2_db";
$username = "moonhee42_kfood_v2_db";
$password = "*********";

$link = mysqli_connect($host, $username, $password, $db_name);

$db_response = [];
$db_response['success'] = 'not set';

if (!$link) {
    $db_response['success'] = 'false';
} else {
    $db_response['success'] = 'true';
}
