<?php
namespace models;

class RankingModel {
  public $rankPosition;
  public $totalNumParticipants;
  public $percentail;

  public function calcPlacementPercentail(){
    $this->percentail = $this->rankPosition / $this->totalNumParticipants * 100;
  }
}