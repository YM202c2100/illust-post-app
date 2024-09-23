<?php
namespace models;

use libs\Validate;

class UserModel {
  public $id;
  public $pwd;
  public $userName;

  public function __construct($id=null, $pwd=null, $userName=null) {
    $this->id = $id;
    $this->pwd = $pwd;
    $this->userName = $userName;
  }

  public static function setSession(UserModel $user){
    $_SESSION['user'] = $user;
  }

  public static function getValidationErrors($paramMap){
    $validate = new Validate();

    foreach($paramMap as $label=>$value){
      if($label === 'id'){
        $validate->label = $label;
        $validate->requiered($value);
      }
      else if($label === 'pwd'){
        $validate->label = $label;
        $validate->requiered($value);
      }
      else if($label === 'userName'){
        $validate->label = $label;
        $validate->requiered($value);
      }
    }

    return $validate->getErrors();
  }
}