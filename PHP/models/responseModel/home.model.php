<?php
namespace models;

require_once __DIR__."/jsonSerializable.abstract.php";
class HomeModel extends JsonSerializable {
  public $isLogin;
  public $submittedFileName;

  public function __construct($isLogin=true) {
    $this->isLogin = $isLogin;
  }
}