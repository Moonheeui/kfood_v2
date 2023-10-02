<?php

session_start();
require_once "_includes/db_connect.php";


function getMenuID($link)
{
    $stmt = mysqli_prepare($link, "SELECT menu.menuID FROM menu WHERE menu.menuTitle = ?");
    mysqli_stmt_bind_param($stmt, "s", trim($_REQUEST["menu"]));

    mysqli_stmt_execute($stmt);

    //get results
    $result = mysqli_stmt_get_result($stmt);
    mysqli_num_rows($result);

    //loop through
    while ($row = mysqli_fetch_assoc($result)) {
        $results[] = $row;
    }
    //echo $results[0]["menuID"];
    //return $results[0]["menuID"];
    if (mysqli_num_rows($result)) {
        insertFavourite($link, $results[0]["menuID"]);
    } else {
        //insert menu
        insertMenu($link);
    }
}

function insertFavourite($link, $menuID)
{
    $query = "INSERT INTO favourites (userID, menuID) VALUES (?, $menuID)";
    $userID = $_SESSION["userID"];

    //echo $userID;
    if ($stmt = mysqli_prepare($link, $query)) {
        mysqli_stmt_bind_param($stmt, "s", $userID);
        mysqli_stmt_execute($stmt);
        $insertedRows = mysqli_stmt_affected_rows($stmt);

        if ($insertedRows > 0) {
            $results[] = [
                "insertedRows" => $insertedRows,
                "id" => $link->insert_id
            ];
        } else {
            throw new Exception("No rows were inserted: " . $_SESSION["userID"]);
        }

        //removed the echo from here
        echo json_encode($results);
    }
}

function insertMenu($link)
{
    $query = "INSERT INTO menu (menuTitle, taste, menuInfo) VALUES (?,?,?)";

    //echo $userID;
    if ($stmt = mysqli_prepare($link, $query)) {
        mysqli_stmt_bind_param($stmt, "sss", $_REQUEST["menu"], $_REQUEST["taste"], $_REQUEST["info"]);
        mysqli_stmt_execute($stmt);
        $insertedRows = mysqli_stmt_affected_rows($stmt);

        if ($insertedRows > 0) {
            $results[] = [
                "insertedRows" => $insertedRows,
                "id" => $link->insert_id
            ];
        } else {
            throw new Exception("No rows were inserted: " . $_SESSION["userID"]);
        }

        //now insert into "favourites table"
        insertFavourite($link, $link->insert_id);

        //removed the echo from here
        echo json_encode($results);
    }
}

//main logic of the application is in this try{} block of code.
try {

    //see if user has entered data
    if (!isset($_REQUEST["menu"]) || !isset($_SESSION["userID"])) {
        throw new Exception('Required data is missing i.e. menu, userID');
    } else {

        //get menuID then insert favourite
        getMenuID($link);
    }
} catch (Exception $error) {

    //add to results array rather than echoing out errors
    $results[] = ["error" => $error->getMessage()];
    echo json_encode($results);
}
