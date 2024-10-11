<?php
namespace models;

require_once __DIR__."/abstract.model.php";
use models\IsLogin;

class JudgeModel extends IsLogin{
  public $isWithinPeriod=true;
  public $isSubmitted=true;
  public $limitCanJudge;
  public $imagesToJudge; //file_nameとuser_idをキーに持つ連想配列の配列
}
