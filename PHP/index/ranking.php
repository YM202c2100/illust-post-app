<?php
namespace index\ranking;

require_once "../libs/header.php";
require_once "../models/user.model.php";
require_once "../models/ranking.model.php";
require_once "../models/competitor.model.php";
require_once "../db/competitors.query.php";
require_once "../db/images.query.php";
use db\CompetitorsQuery;
use db\ImagesQuery;
use models\CompetitorModel;
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

  if( !CompetitorModel::isSubmitted() ){
    echo json_encode(['status'=>'error', 'body'=>'作品を投稿してください']);
    exit(); 
  }
  $ranking = new RankingModel();
  $ranking->totalNumCompetitors = CompetitorsQuery::getTotalNumCompetitors();
  $ranking->rankPosition = CompetitorsQuery::getRankPosition($user->id);
  $ranking->top3Images = ImagesQuery::fetchImagesTop3();
  $ranking->myImageSrc = ImagesQuery::fetchNameByUserId($user->id)->file_name;
  $ranking->myRankPoints = CompetitorsQuery::getRankPointsOf($user);

  $ranking->calcPlacementPercentail();

  echo json_encode(['status'=>'ok', 'body'=>$ranking]);
}