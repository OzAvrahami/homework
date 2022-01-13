<?php

function create ($jsonObj){

    $json = json_encode($jsonObj);

    if (file_put_contents("data.json", $json)) {
        echo "JSON file created successfully";
        return 1;
    } else {
        echo "Oops! Error creating json file";
        return 0;
    }
}

?>