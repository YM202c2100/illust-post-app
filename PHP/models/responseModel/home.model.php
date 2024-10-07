<?php
namespace models;

require_once __DIR__."/abstract.model.php";

class HomeModel extends IsLogin {
  public $submittedFileName;
  public ContestModel $contest;
}

class ContestModel {
  public int $roundNum;
  public string $subject;
  public PeriodModel $applicationPeriod;
  public PeriodModel $judgePeriod;

  public function __construct($roundNum, $subject, $applicationPeriod, $judgePeriod) {
    $this->roundNum = $roundNum;
    $this->subject = $subject;
    $this->applicationPeriod = $applicationPeriod;
    $this->judgePeriod = $judgePeriod;
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

class ContestRecieveModel{
  private $id;
  public $round_num;
  public $subject;
  public $application_start_date;
  public $application_end_date;
  public $judge_start_date;
  public $judge_end_date;

  public function createContestResponse(){
    $applicationPeriod = new PeriodModel(
                            $this->application_start_date, 
                            $this->application_end_date
                          );
    $judgePeriod = new PeriodModel(
                      $this->judge_start_date,
                      $this->judge_end_date
                    );

    return new ContestModel(
              $this->round_num,
              $this->subject,
              $applicationPeriod,
              $judgePeriod
            );
  }
}