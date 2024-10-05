<?php
namespace models;

abstract class JsonSerializable {
  function returnJson(){
    $properties = get_object_vars($this);

    echo json_encode($properties);
    exit();
  }
}

abstract class IsLogin extends JsonSerializable {
  public $isLogin = true;
}