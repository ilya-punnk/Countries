<?php

$request = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['PATH_INFO'];

$parsed = parse_path($path);
$query_str="";

switch($request){
	case 'GET':
	$p_len=count($parsed);
	if($p_len%2==1){
		switch($p_len){
			case 1:
				$query_str = "SELECT * FROM Countries";
				break;
			case 3:
				$query_str = "select Cities.id, Cities.name from Countries, Cities where Countries.id = Cities.country_id and Countries.id = ".$parsed[1];
				break;
			case 5:
				$query_str = "select Languages.id, Languages.name from Languages, Cities, City_lang where Cities.id = City_lang.city_id and Languages.id = City_lang.language_id and Cities.id=".$parsed[3];
				break;
		}
		
	} else{
		switch($p_len){
			case 2:
				$query_str = "SELECT * FROM Countries WHERE id=".$parsed[$p_len-1];
				break;
			case 4:
				$query_str = "select Cities.id, Cities.name from Countries, Cities where Countries.id = Cities.country_id and Countries.id = ".$parsed[1]." and Cities.id=".$parsed[3];
				break;
			case 6:
				$query_str = "select Languages.id, Languages.name from Languages, Cities, City_lang where Cities.id = City_lang.city_id and Languages.id = City_lang.language_id and Cities.id=".$parsed[3]." and Languages.id=".$parsed[5];
				break;
		}
			
	}
	break;
}

include "db_login_data.php";

$mysqli = new mysqli($db_host_addr, $db_user_name, $db_user_pass, $db_name);
$result_set = $mysqli->query($query_str);
while ($row = $result_set->fetch_assoc()) {
		$result[$row["id"]]=$row["name"];
}
$result_set->close();
$mysqli->close();
if($result==null){
	$result=Array();
}
echo json_encode($result);

function parse_path($_path)
{
	$pos = 0;
	$offset = 1;
	$i=0;
	while(($pos=strpos($_path,'/',$offset))!==FALSE){
		$parsed[$i]=substr($_path,$offset,$pos-$offset);
		$i=$i+1;
		$offset=$pos+1;
		$last_pos=$pos;
	}
	$pos=$last_pos;
	if($pos<strlen($_path)-1){
		$parsed[$i]=substr($_path,$pos+1,strlen($_path)-$pos-1);
	}
    return $parsed;
}


?>
