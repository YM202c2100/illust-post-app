<?php
namespace models;

class ParticipantModel{
  private $user_id;
  private $rank_points;
  private $submitted;
  private $judged_count;

  public static function isSubmitted(){
    return $_SESSION['submitted'] === true;
  }
}