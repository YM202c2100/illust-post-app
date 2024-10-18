<?php
namespace models;

require_once __DIR__."/RecieveModel/contest.recieve.php";
use \models\ContestRecieveModel;

require_once __DIR__."/abstract.model.php";

class HomeModel extends IsLogin {
  public $isCurrentlyHeld = true;
  public $submittedFileName;
  public ContestModel $contest;
  public $limitCanJudge;
  public $rankTier;
}

class ContestModel {
  public int $roundNum;
  public string $subject;
  public PeriodModel $applicationPeriod;
  public PeriodModel $judgePeriod;

  public function __construct(ContestRecieveModel $contest){
    $this->roundNum = $contest->round_num;
    $this->subject = $contest->subject;
    $this->applicationPeriod = new PeriodModel(
                                  $contest->application_start_date, 
                                  $contest->application_end_date
                                );
    $this->judgePeriod = new PeriodModel(
                            $contest->judge_start_date,
                            $contest->judge_end_date
                          );
  }
}

class PeriodModel {
  public $startAt;
  public $endAt;

  public function __construct($startAt, $endAt) {
    $this->startAt = $startAt;
    $this->endAt = $endAt;
  }
}

