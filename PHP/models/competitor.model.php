<?php
namespace models;

class CompetitorModel{
  public $user_id;
  public $rank_points;
  public $submitted;
  public $judged_count;

  public static function isSubmitted(){
    $isSubmitted = $_SESSION['submitted'] ?? null;
    return ($isSubmitted == true);
  }

  public static function setSubmittedSession($boolean){
    $_SESSION['submitted'] = $boolean;
  }
}