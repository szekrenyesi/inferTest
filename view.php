<?php

include "settings.php";

$user = $_SESSION['user'];
$fullname = $_SESSION['fullname'];
$task = $_GET['task'];
$type = $_GET['type'];

$file = "data/result/" . $user . "_" . $code . "_" . $task . "_" . $type . "_final.json";
$submitdate = date ("Y-m-d H:i:s", filemtime($file));
$json = file_get_contents($file);
$obj = json_decode($json, true);

$main = new DOMDocument();
$main->formatOutput = true;
$main->loadHTMLFile("modules/html/result.html");
$css = $main->createElement("link");
$css->setAttribute("rel","stylesheet");
$css->setAttribute("href","modules/css/result.css");
$script = $main->createElement("script");
$script->setAttribute("src","modules/js/view.js");
$main->getElementsByTagName("head")[0]->appendChild($css);
$main->getElementsByTagName("head")[0]->appendChild($script);
$h2 = $main->getElementById("ddate");
$h2->textContent = $ddate;
$h3 = $main->getElementById("task");
$h3->textContent = "Feladat: " . $task;
$p = $main->createElement("p");
$p->textContent = "Neptunkód: $user";
$main->getElementById("hed")->appendChild($p);
$p = $main->createElement("p");
$p->textContent = "Név: $fullname";
$main->getElementById("hed")->appendChild($p);
$p = $main->createElement("p");
$p->textContent = "Leadás dátuma: $submitdate";
$main->getElementById("hed")->appendChild($p);
if (isset($obj['venn'])){
	$dia = $main->getElementById("method");
	$dia->setAttribute('id',"dia");
	$svg =  $main->createElement("svg");
	$svg->setAttribute("width","500px");
	$svg->setAttribute("height","500px");
	$dia->appendChild($svg);
	$script = $main->createElement("script");
	$script->setAttribute("src","modules/js/venn.js");
	$main->getElementsByTagName("body")[0]->appendChild($script);
}
$script = $main->createElement("script");
$script->textContent = "displayData(" . json_encode($json) . ");";
$main->getElementsByTagName("body")[0]->appendChild($script);
$exam = $main->saveHTML();
print_r($exam);

?>
