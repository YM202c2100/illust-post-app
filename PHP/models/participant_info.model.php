<?php
namespace models;

class ParticipantModel{
  public $user_id;
  public $rank_points;
  public $submitted;
  public $judged_count;

  public static function isSubmitted(){
    $isSubmitted = $_SESSION['submitted'] ?? null;
    return ($isSubmitted === 1);
  }

  public static function setSubmittedSession($boolean){
    $_SESSION['submitted'] = $boolean;
  }
}