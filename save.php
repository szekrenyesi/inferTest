<?php

include "settings.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$user = $_SESSION['user'];
	$fullname = $_SESSION['fullname'];
	$trialstart = $_SESSION['trialstart'];
	$task = $_POST['task'];
	$tpye = $_POST['type'];
	$htmldata = $_POST['html'];
	$json = $_POST['json'];
	$final = $_POST['final'];

	if ($final == "true"){
		$post = "_final";
	} else {
		$post = "_saved";
	}

	$htmlfile = "data/result/" . $user . "_" . $code . "_" . $task . "_" . $tpye . "$post.html";
	$jsonfile = "data/result/" . $user . "_" . $code . "_" . $task . "_" . $tpye . "$post.json";
	$output = fopen($jsonfile, "w");
	#$cdata = mb_convert_encoding($json, 'HTML-ENTITIES', "UTF-8");
	fwrite($output, $json);
	fclose($output);
	if ($final == "true"){
		copy($jsonfile,"data/result/" . $user . "_" . $code . "_" . $task . "_" . $tpye . "_saved.json");
	}
	$res = new DOMDocument();
	$cdata = mb_convert_encoding($htmldata, 'HTML-ENTITIES', "UTF-8"); 
	libxml_use_internal_errors(true);
	$res->loadHTML($cdata);
	$result = $res->documentElement;
	$main = new DOMDocument();
	$main->formatOutput = true;
	$main->loadHTMLFile("modules/html/result.html");
	$h2 = $main->createElement("h2");
	$h2->textContent = $ddate;
	$main->getElementsByTagName('body')[0]->appendChild($h2);
	$h3 = $main->createElement("h3");
        $h3->textContent = "Feladat: " . $task;
        $main->getElementsByTagName('body')[0]->appendChild($h3);
	$adr = $main->importNode($result, true);
	$main->getElementsByTagName('body')[0]->appendChild($adr);
	$p = $main->createElement("p");
	$p->textContent = "Neptunkód: $user";
	$main->getElementById("hed")->appendChild($p);
	$p = $main->createElement("p");
        $p->textContent = "Név: $fullname";
        $main->getElementById("hed")->appendChild($p);
	$p = $main->createElement("p");
        $p->textContent = "Leadás dátuma: $current";
        $main->getElementById("hed")->appendChild($p);
	$exam = $main->saveHTML();
	$output = fopen($htmlfile, "w");
	fwrite($output, $exam);
	fclose($output);


	echo "Adatok mentve!";
}

?>
