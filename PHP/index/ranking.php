<?php
namespace index\ranking;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/helper.php";
require_once __DIR__."/../models/storingModel/user.model.php";
require_once __DIR__."/../models/responseModel/ranking.model.php";
require_once __DIR__."/../models/storingModel/competitor.model.php";
require_once __DIR__."/../db/competitors.query.php";
require_once __DIR__."/../db/images.query.php";
use db\CompetitorsQuery;
use db\ImagesQuery;
use models\CompetitorModel;
use models\RankingModel;
use models\UserModel;

if($_SERVER['REQUEST_METHOD'] === "GET"){
  \libs\require_session();
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
  $ranking->myImageSrc = ImagesQuery::fetchNameByUserId($user->id);
  $ranking->myRankPoints = CompetitorsQuery::getRankPointsOf($user);
  $ranking->higherRankImages = ImagesQuery::fetchHigherRankThan($ranking->myRankPoints);

  $ranking->calcPlacementPercentail();

  echo json_encode(['status'=>'ok', 'body'=>$ranking]);
}