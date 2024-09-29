<?php
namespace models;

class ParticipantModel{
  private $user_id;
  public $rank_points;
  private $submitted;
  private $judged_count;

  public static function isSubmitted(){
    $submitted = $_SESSION['submitted'] ?? null;
    return ($submitted === true);
  }
}