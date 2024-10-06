<?php
namespace models;

class CompetitorModel{
  public $user_id;
  public $rank_points;
  public $is_submitted;
  public $judged_count;

  public static function isSubmitted(){
    $isSubmitted = $_SESSION['isSubmitted'] ?? null;
    return ($isSubmitted == true);
  }

  public static function setIsSubmittedSession($boolean){
    $_SESSION['isSubmitted'] = $boolean;
  }
}