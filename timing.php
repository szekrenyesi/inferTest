<?php 

include "settings.php";

$user = $_GET['user'];


$sql = "SELECT laststart from applications WHERE neptun = '" . $user . "' AND exam = '" . $code . "';";
$result = $conn->query($sql);
if ($result->num_rows == 1)
	$row = $result -> fetch_object();
	$laststart = $row->laststart;

	$diff = strtotime($end) - strtotime($laststart);
	if ($diff >= $tlimit){
		$dur = $tlimit;
	} else {
		$dur = $diff;
	}
	$toend = strtotime($laststart) + $dur;
	$remain = $toend - strtotime($current);
	echo "$remain";
?>
