<?php
namespace models;

require_once __DIR__."/abstract.model.php";

class RankingModel extends IsLogin{
  public $isSubmitted = true;
  public $rankPosition;
  public $totalNumCompetitors;
  public $top3Images; //ImageWithRP[]
  public $beforeRP;
  public ImageWithRP $myImage;
  public $higherRankImages; //ImageWithRP[]
}

class ImageWithRP {
  public $file_name;
  public $user_name;
  public $rank_points;
}