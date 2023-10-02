<?php

//connect to db - $link is the connection object
require_once "_includes/db_connect.php";


//favourites for users
// $stmt = mysqli_prepare($link, "SELECT  kfood_v2.name, kfood_v2.timeStamp, menu.menuTitle, menu.taste, menu.menuInfo  FROM kfood_v2, favourites, menu WHERE favourites.menuID = menu.menuID AND favourites.userID = kfood_v2.userID");


// count number of favourites per menu and show in order (even if they have no votes)
$stmt = mysqli_prepare(
    $link,
    "SELECT menu.menuTitle, menu.taste, menu.menuInfo, COUNT(favourites.menuID) AS countedFavourites
    FROM favourites
    RIGHT JOIN menu ON menu.menuID = favourites.menuID 
    GROUP BY menu.menuID 
    ORDER BY countedFavourites DESC"
);


mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

while ($row = mysqli_fetch_assoc($result)) {
    $results[] = $row;
}

echo json_encode($results);

mysqli_close($link);
