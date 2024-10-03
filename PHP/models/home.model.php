<?php
namespace models;

require_once "../models/jsonSerializable.abstract.php";

class HomeModel extends JsonSerializable {
  public $isLogin;
  public $submittedFileName;

  public function __construct($isLogin=true) {
    $this->isLogin = $isLogin;
  }
}