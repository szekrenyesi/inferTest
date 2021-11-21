<html>
<head>
<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
<title>Logika vizsga</title>
<link rel="stylesheet" href="modules/css/style.css?v=1.5">
<script src="modules/js/main.js?v1"></script>
<script src='modules/js/timer.js?v=1.2'></script>
<script src="https://d3js.org/d3.v4.min.js"></script>
<style>
	h2 {
		color:white;
	}
</style>
</head>
<body>
<h2 id="message"></h2>
<div id="timer"></div>
<h1>Logika vizsgafeladat</h1>
<?php

include "settings.php";


if (!isset($_GET['stage'])){
	$_GET['stage'] = 1;
} 

if (isset($_SESSION['user'])){
	if ($_SESSION['code'] != $code){
		header("Location: logout.php");
	}
	$user = $_SESSION['user'];
	if ($_GET['stage'] == 1){
		echo "<h2>$ddate</h2>";
		$task = new DOMDocument();
		$task->formatOutput = true;
		$html = file_get_contents('data/task/task.html', true);
		$htmlx = mb_convert_encoding($html, 'HTML-ENTITIES', "UTF-8");
		libxml_use_internal_errors(true);
		$task->loadHTML($htmlx);
		$tnum = 1;
		foreach($task->childNodes as $t){
			foreach($methods as $method){
				$id = "task" . $tnum . $method;
				if ($task->getElementById($id)){
					$file = "data/result/" . $user . "_" . $code . "_" . $tnum . "_" . $method . "_final.json";
					if (is_readable($file)){
						$sp = $task->createElement("span");
						$sp->textContent = "(Kész)";
						$sp->setAttribute("class","ready");
						$task->getElementById($id)->appendChild($sp);
						$href = "view.php?task=" . $tnum . "&type=" . $method;
						$task->getElementById($id)->getElementsByTagName("a")[0]->setAttribute("target","_blank");
						$task->getElementById($id)->getElementsByTagName("a")[0]->setAttribute("href",$href);
						$reset = $task->createElement("a");
						$reset->setAttribute("href","modify.php?task=$tnum&type=$method");
						$reset->setAttribute('target','_blank');
						$but = $task->createElement("button");
						$but->textContent = "Javítás";
						$but->setAttribute("class","reset");
						$reset->appendChild($but);
						$task->getElementById($id)->appendChild($reset);
					} else {
						$sp = $task->createElement("span");
						$sp->textContent = "(Függőben)";
						 $sp->setAttribute("class","pending");
                                                $task->getElementById($id)->appendChild($sp);
					}
				}
			}
			$tnum++;
		}

		echo $task->saveHTML();

		echo "<a href='logout.php' id='exit'><button>Kilépés</button></a>";
		echo "<script>getRTime('$user');</script>";
	}
	if ($_GET['stage'] == 2){
		$task=$_GET['task'];
		$type=$_GET['type'];
		switch ($type) {
			case "atable":
				$title = "analitikus táblázattal";
			break;
			case "itable":
				$title = "igazságtáblázattal";
			break;
			case "venn":
				$title = "Venn diagrammal";
			break;
		}
		echo "<h2>A következtetés helyességének ellenőrzése<br> <span>$title</span></h2>";
		include "modules/html/setprem.html";
		if ($type == "venn"){
			include "modules/html/prnum.html";
			include "modules/html/setmonp.html";
			include "modules/html/formula1.html";
			include "modules/html/venn.html";
		} else {
			include "modules/html/anum.html";
			include "modules/html/setam.html";
			include "modules/html/formula0.html";
			if ($type == "atable"){
				include "modules/html/atable.html";
			} else {
				include "modules/html/itable.html";
			}
		}
		include "modules/html/correct.html";
		echo "<a href='javascript:saveTask($task," . '"' . $type . '"' . ",false)' id='exit'><button>Mentés</button></a>";
		echo '<div class="center">';
		echo "<button class='final' onclick='saveTask($task," . '"' . $type . '"' . ",true)'>Beküldés</button>";
		echo "</div>";
		echo "<script src='modules/js/$type.js'></script>";
		echo "<script>\n";
		$file = "data/result/" . $user . "_" . $code . "_" . $task . "_" . $type . "_saved.json";
		if (is_readable($file)){
			$json = file_get_contents($file);
			echo "loadData('$json','$type');";
		} else {
			echo "anChange();\n";
		}
		echo "getRTime('$user');\n";
		echo "</script>";
	}

} else {
	echo "<h2>$ddate</h2>";
	echo "<form name='form1' method='post' action='index.php'>";
	include "modules/html/login.html";
	echo "</form>";
	echo "<div id='error'></div>";
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $mypassword=test_input($_POST['mypassword']);
        $neptun=test_input($_POST['id']);
	$sql = "SELECT students.neptun,convert(fullname using utf8) as fullname,password,trials,laststart from applications INNER JOIN students 
		ON students.neptun = applications.neptun WHERE students.neptun = '" . $neptun . "' AND exam = '" . $code . "';";
	$conn->set_charset("utf8");
	print_r($conn->error);
	$conn->query("SET character_set_results=utf8");
	$conn->query("SET CHARACTER SET utf8mb4");
	$conn->set_charset('utf8mb4');
	print_r($conn->error);
	$conn->query("SET NAMES 'utf8'");
	print_r($conn->error);
        $result = $conn->query($sql);
        print_r($conn->error);
        if ($result->num_rows < 1) {
                print "<script type=\"text/javascript\">";
                print "document.getElementById('error').innerHTML = 'Nincs feljelentkezve erre a vizsgára!';";
                print "</script>";
                exit;
	}

        if (!check_in_range($start,$end,$current)){
                print "<script type=\"text/javascript\">";
                print "document.getElementById('error').innerHTML = 'A vizsga megtekintése jelenleg nem lehetséges';";
                print "</script>";
                exit;
        }

	$row = $result -> fetch_object();
	$trials = (int)$row->trials;
	$first = false;
	if ($row->laststart == null){
		$laststart = $current;
		$first = true;
	} else {
		$laststart = $row->laststart;
	}

        if ($mypassword != $row->password){
                print "<script type=\"text/javascript\">";
                print "document.getElementById('error').innerHTML = 'Helytelen jelszó';";
                print "</script>";
                exit;
	}

	if ($maxtrial <= $trials && strtotime($current) - strtotime($laststart) > $tlimit){
		print "<script type=\"text/javascript\">";
                print "document.getElementById('error').innerHTML = 'Már elérte a maximális próbálkozások számát!';";
                print "</script>";
		exit;
	} else {
		if (strtotime($current) - strtotime($laststart) > $tlimit || $first == true){
			$trials = $trials + 1;
			$sql = "UPDATE applications SET laststart = '$current', trials = $trials WHERE neptun = '$neptun' AND exam = '$code'";
			$result = $conn->query($sql);
			print_r($conn->error);
		}
	}

	$_SESSION['user'] = $neptun;
	$_SESSION['fullname'] = $row->fullname;
	$_SESSION['trialstart'] = $laststart;
	$_SESSION['code'] = $code;
        header("Location:index.php");


}

ob_end_flush();
?>

</body>
</html>
