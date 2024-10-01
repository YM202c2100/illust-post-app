<?php
namespace models;

class RankingModel {
  public $rankPosition;
  public $totalNumCompetitors;
  public $percentail;
  public $top3Images;
  public $myImageSrc;

  public function calcPlacementPercentail(){
    $this->percentail = $this->rankPosition / $this->totalNumCompetitors * 100;
  }
}