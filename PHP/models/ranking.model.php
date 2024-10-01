<?php
namespace models;

class RankingModel {
  public $rankPosition;
  public $totalNumCompetitors;
  public $percentail;

  public function calcPlacementPercentail(){
    $this->percentail = $this->rankPosition / $this->totalNumCompetitors * 100;
  }
}