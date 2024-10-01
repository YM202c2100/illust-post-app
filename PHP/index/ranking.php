<?php
namespace index\ranking;

require_once "../libs/header.php";
require_once "../models/user.model.php";
require_once "../models/ranking.model.php";
require_once "../models/participant_info.model.php";
require_once "../db/participants_info.query.php";
use db\ParticipantsQuery;
use models\ParticipantModel;
use models\RankingModel;
use models\UserModel;

if($_SERVER['REQUEST_METHOD'] === "GET"){
  if(isset($_COOKIE["PHPSESSID"])){
    session_start();
  }
  $user = UserModel::getFromSession();
  if(empty($user)){
    echo json_encode(['status'=>'error', 'body'=>'ログインしてください']);
    exit();
  }

  if( !ParticipantModel::isSubmitted() ){
    echo json_encode(['status'=>'error', 'body'=>'作品を投稿してください']);
    exit(); 
  }
  $ranking = new RankingModel();
  $ranking->totalNumParticipants = ParticipantsQuery::getTotalNumParticipants();
  $ranking->rankPosition = ParticipantsQuery::getRankPosition($user->id);

  $ranking->calcPlacementPercentail();

  echo json_encode(['status'=>'ok', 'body'=>$ranking]);
}