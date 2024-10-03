<?php
namespace models;

class JsonSerializable {
  function returnJson(){
    $properties = get_object_vars($this);

    echo json_encode($properties);
    exit();
  }
}