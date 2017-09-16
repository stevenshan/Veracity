<?php
$servername = "localhost";
$username = "user";
$password = "password";
$dbname = "tst2";
$rayorder = [];
$superay = [[]];

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT Lbt, Lib, Con, G, name FROM articles";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // output data of each row
	i = 0;
    while($row = mysqli_fetch_assoc($result)) {
        if ($rayorder.indexOf($row["name"]) == -1){
			$rayorder[rayorder.length] = $row["name"];
			$superay[rayorder.length][0] = $row["G"];
			$superay[rayorder.length][1] = $row["Con"];
			$superay[rayorder.length][2] = $row["Lib"];
			$superay[rayorder.length][3] = $row["Libt"];
			$superay[rayorder.length][4] = 1;
		}
		else{
			$superay[$rayorder.indexOf($row["name"]) - 1][0] = (($superay[$rayorder.indexOf($row["name"]) - 1][0] * $superay[$rayorder.indexOf($row["name"]) - 1][4] + $row["G"])/ ($superay[$rayorder.indexOf($row["name"]) - 1][4] + 1));
			$superay[$rayorder.indexOf($row["name"]) - 1][1] = (($superay[$rayorder.indexOf($row["name"]) - 1][1] * $superay[$rayorder.indexOf($row["name"]) - 1][4] + $row["Con"])/ ($superay[$rayorder.indexOf($row["name"]) - 1][4] + 1));
			$superay[$rayorder.indexOf($row["name"]) - 1][2] = (($superay[$rayorder.indexOf($row["name"]) - 1][2] * $superay[$rayorder.indexOf($row["name"]) - 1][4] + $row["Lib"])/ ($superay[$rayorder.indexOf($row["name"]) - 1][4] + 1));
			$superay[$rayorder.indexOf($row["name"]) - 1][3] = (($superay[$rayorder.indexOf($row["name"]) - 1][3] * $superay[$rayorder.indexOf($row["name"]) - 1][4] + $row["G"])/ ($superay[$rayorder.indexOf($row["name"]) - 1][4] + 1));
			$superay[$rayorder.indexOf($row["name"]) - 1][4] = $superay[$rayorder.indexOf($row["name"]) - 1][4] + 1;
		}
    }
} else {
    echo "0 results";
}

for (i = 0, i < $rayorder.length, i++){
	$sql = "UPDATE journalists (G, Con, Lib, G)
	VALUES ('"+ $superay[i][0] + "', '" + $superay[i][1] + "', '" + $superay[i][2] + "', '" + $superay[i][3] + "') WHERE user = '" + $rayorder[i] + "'";

	if (mysqli_query($conn, $sql)) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}
}




echo $result;

mysqli_close($conn);
?>
