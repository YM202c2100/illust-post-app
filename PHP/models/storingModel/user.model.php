<?php
namespace models;

require_once __DIR__."/../../libs/validate.php";
use libs\Validate;

class UserModel {
  public $id;
  public $pwd;
  public $user_name;

  public function __construct($id=null, $pwd=null, $userName=null) {
    $this->id = $id;
    $this->pwd = $pwd;
    $this->user_name = $userName;
  }

  public static function setSession(UserModel $user){
    $_SESSION['user'] = $user;
  }

  public static function getFromSession(){
    return $_SESSION['user'] ?? null;
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