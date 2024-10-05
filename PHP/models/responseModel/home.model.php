<?php
namespace models;

require_once __DIR__."/abstract.model.php";

class HomeModel extends IsLogin {
  public $submittedFileName;
  public $contest;

  public static function createContestResponse(ContestModel $contest){
    $applicationPeriod = static::createPeriod(
                            $contest->application_start_date, 
                            $contest->application_end_date
                          );
    $judgePeriod = static::createPeriod(
                      $contest->judge_start_date,
                      $contest->judge_end_date
                    );

    return [
      'round_num'=>$contest->round_num,
      'subject'=>$contest->subject,
      'applicationPeriod'=>$applicationPeriod,
      'judgePeriod' => $judgePeriod
    ];
  }

  public static function createPeriod($start_at, $end_at){
    return ['start_at'=>$start_at, 'end_at'=>$end_at];
  }

}