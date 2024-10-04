<?php
namespace models;

require_once __DIR__."/jsonSerializable.abstract.php";

class HomeModel extends JsonSerializable {
  public $isLogin;
  public $submittedFileName;
  public $contest;

  public function __construct($isLogin=true) {
    $this->isLogin = $isLogin;
  }

  public function createContestResponse($round_num, $subject, $applicationPeriod, $judgePeriod){
    $this->contest = [
      'round_num'=>$round_num,
      'subject'=>$subject,
      'applicationPeriod'=>$applicationPeriod,
      'judgePeriod' => $judgePeriod
    ];
  }

  public static function createPeriod($start_at, $end_at){
    return ['start_at'=>$start_at, 'end_at'=>$end_at];
  }

}