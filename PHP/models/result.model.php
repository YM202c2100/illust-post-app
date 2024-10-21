<?php
namespace models;

require_once __DIR__."/abstract.model.php";
require_once __DIR__."/RecieveModel/contest.recieve.php";

class ResultModel extends IsLogin{
  public $isSubmitted = true;
  public $rankPosition;
  public $totalNumCompetitors;
  public $top3Images; //ImageWithRP[]
  public $beforeRP;
  public ImageWithRP $myImage;
  public $higherRankImages; //ImageWithRP[]
  public ContestWithoutPeriodInfo $prevContestInfo;
  
  public $debug;
}

class ImageWithRP {
  public $file_name;
  public $user_name;
  public $rank_points;
}

class ContestWithoutPeriodInfo {
  public $round_num;
  public $subject;

  public function __construct(ContestRecieveModel $contest) {
    $this->round_num = $contest->round_num;
    $this->subject = $contest->subject;
  }
}