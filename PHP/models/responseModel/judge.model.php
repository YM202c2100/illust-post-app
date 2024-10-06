<?php
namespace models;

require_once __DIR__."/abstract.model.php";
use models\IsLogin;

class JudgeModel extends IsLogin{
  public $isSubmitted=true;
  public $limitCanJudge;
  public $imagesToJudge; //file_nameとuser_idをキーに持つ連想配列の配列

  public static function setImagesToJudgeSession($images){
    $_SESSION['ImagesToJudge'] = $images;
  }

  public static function getImagesToJudgeFromSession(){
    if(isset($_SESSION['ImageToJudge'])){
      return $_SESSION['ImagesToJudge'];
    }
  }
}
