<?php

ini_set( 'display_errors', 1 );
error_reporting( E_ALL );


function check_in_range($start_date, $end_date, $date_from_user)
{
  // Convert to timestamp
  $start_ts = strtotime($start_date);
  $end_ts = strtotime($end_date);
  $user_ts = strtotime($date_from_user);

  // Check that user date is between start & end
  return (($user_ts >= $start_ts) && ($user_ts <= $end_ts));
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;

}

require_once 'dbconnect.php';
ini_set('session.gc_maxlifetime',60*60);
ini_set('session.cookie_lifetime',60*60);

ob_start();
session_start(['cookie_lifetime' => 86400]);
date_default_timezone_set("Europe/Budapest");
$config = parse_ini_file('conf/config.ini');
$maxtrial = $config['maxtrial'];
$ddate = $config['date'];
$tlimit = $config['tlimit'];
$code = $config['examid'];
$current = date("Y-m-d H:i:s");
$start = $config['startdate'];
$end = $config['enddate'];
$methods = ['atable','itable','venn'];
header('Content-Type: text/html; charset=utf-8');


?>
