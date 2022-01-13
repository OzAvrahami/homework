<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'createjson.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id) && !empty($data->genes)) {
    
    $jsonObj -> id = $data->id;
    $jsonObj -> genes = $data->genes;

    if (create($jsonObj)){
        http_response_code(200);
        echo json_encode(array("message" => "Json file update."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to update json"));
    }
    echo json_encode($jsonObj);
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create json. Data is incomplete."));
}


?>