<?php
	include "settings.php";
	
	$type = $_GET['type'];
	$task = $_GET['task'];

	$url = "data/result/" . $_SESSION['user'] . "_" . $code . "_" . $task . "_" . $type . "_final.html";
	$new = "data/result/" . $_SESSION['user'] . "_" . $code . "_" . $task . "_" . $type . "_saved.html";

	rename($url,$new);
	header("Location: index.php?stage=2&task=$task&type=$type");
?>
