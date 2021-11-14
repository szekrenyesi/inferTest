<html>
<head>
<style>
table {
	border-collapse:collapse;
}
table td,th {
	border:1px solid black;
	padding:10px;
}
</style>
</head>
<body>
<table>
<tr>
<th>File</th><th>Date</th>
<tr>
<?php
	include "../settings.php";

	$resdir = scandir("../../prod/data/result/");

	foreach($resdir as $file){
		$pinfo = pathinfo($file);
		if ($file != "." && $file != ".." && $pinfo['extension'] == "json"){
			echo "<tr>";
			echo "<td><a href='view.php?file=$file'>$file</a></td><td>" . date ("F d Y H:i:s.", filemtime("../../prod/data/result/$file")) ."</td>";
			echo "</tr>";
		}
	}

?>
