<?php
namespace index\ranking;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/session.php";
require_once __DIR__."/../models/responseModel/ranking.model.php";
require_once __DIR__."/../db/competitors.query.php";
require_once __DIR__."/../db/images.query.php";
use db\CompetitorsQuery;
use db\ImagesQuery;
use libs\Session;
use models\RankingModel;

if($_SERVER['REQUEST_METHOD'] === "GET"){
  $ranking = new RankingModel();

  \libs\require_session();
  $user = Session::getUser();
  if(empty($user)){
    $ranking->isLogin = false;
    $ranking->returnJson();
  }

  if( !Session::isSubmitted() ){
    $ranking->isSubmitted = false;
    $ranking->returnJson();
  }
  
  $ranking->totalNumCompetitors = CompetitorsQuery::getTotalNumCompetitors();
  $ranking->rankPosition = CompetitorsQuery::getRankPosition($user->id);
  $ranking->top3Images = ImagesQuery::fetchImagesTop3();
  $ranking->myImageSrc = ImagesQuery::fetchNameByUserId($user->id);
  $ranking->myRankPoints = CompetitorsQuery::getRankPointsOf($user);

  $higherRankImages = ImagesQuery::fetchHigherRankThan($ranking->myRankPoints);
  if(!is_array($higherRankImages) || count($higherRankImages) !== 3){
    $ranking->higherRankImages = $ranking->top3Images;
  }else{
    $ranking->higherRankImages = $higherRankImages;
  }

  $ranking->returnJson();
}