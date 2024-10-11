<?php
namespace index\ranking;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/session.php";
require_once __DIR__."/../models/ranking.model.php";
require_once __DIR__."/../db/competitors.query.php";
require_once __DIR__."/../db/contests.query.php";
require_once __DIR__."/../db/images.query.php";
use db\CompetitorsQuery;
use db\ContestsQuery;
use db\ImagesQuery;
use libs\Session;
use models\RankingModel;

if($_SERVER['REQUEST_METHOD'] === "GET"){
  $rankingResponse = new RankingModel();
  try {

  \libs\require_session();
  $user = Session::getUser();
  if(empty($user)){
    $rankingResponse->isLogin = false;
    $rankingResponse->returnJson();
  }
  
  ContestsQuery::$targetId = ContestsQuery::fetchPrevContestId();

  $isSubmitted = CompetitorsQuery::getIsSubmitted($user->id);
  if(!$isSubmitted){
    $rankingResponse->isSubmitted = false;
    $rankingResponse->returnJson();
  }

  $rankingResponse = fillRankingResponse($rankingResponse, $user->id);

  $rankingResponse->returnJson();

  } catch (\Throwable $th) {
    $rankingResponse->debug = $th->getMessage();
    $rankingResponse->returnJson();
  }
}

function fillRankingResponse(RankingModel $response, $userId):RankingModel{
  $response->totalNumCompetitors = CompetitorsQuery::getTotalNumCompetitors();
  $response->rankPosition = CompetitorsQuery::getRankPosition($userId);
  $response->top3Images = ImagesQuery::fetchImagesTop3();
  $response->myImage = ImagesQuery::fetchPrevSubmission($userId);
  $response->beforeRP = CompetitorsQuery::fetchRankPointsBeforePrevContest($userId);

  $higherRankImages = ImagesQuery::fetchHigherRankThan($response->myImage->rank_points);
  if(!is_array($higherRankImages) || count($higherRankImages) !== 3){
    $response->higherRankImages = $response->top3Images;
  }else{
    $response->higherRankImages = $higherRankImages;
  }

  return $response;
}