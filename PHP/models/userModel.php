<?php
namespace models;

class UserModel {
  public $id;
  public $pwd;
  public $userName;

  public function __construct($id, $pwd, $userName) {
    $this->id = $id;
    $this->pwd = $pwd;
    $this->userName = $userName;
  }

  public static function setSession(UserModel $user){
    $_SESSION['user'] = $user;
  }
}