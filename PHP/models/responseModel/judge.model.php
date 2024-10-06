<?php
namespace models;

require_once __DIR__."/abstract.model.php";
use models\IsLogin;

class JudgeModel extends IsLogin{
  public $isSubmitted=true;
  public $imagesToJudge; //file_nameとuser_idをキーに持つ連想配列の配列
}
