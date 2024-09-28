<?php
namespace models;

require_once "../libs/validate.php";
use libs\Validate;

class UserModel {
  public $id;
  public $pwd;
  public $user_name;
  public $rank_points;
  public $submitted;

  public function __construct($id=null, $pwd=null, $userName=null, $rank_points=0, $submitted=0) {
    $this->id = $id;
    $this->pwd = $pwd;
    $this->user_name = $userName;
    $this->rank_points = $rank_points;
    $this->submitted = $submitted;
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