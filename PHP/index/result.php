<?php
namespace index\result;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/session.php";
require_once __DIR__."/../models/result.model.php";
require_once __DIR__."/../db/competitors.query.php";
require_once __DIR__."/../db/contests.query.php";
require_once __DIR__."/../db/images.query.php";
use db\CompetitorsQuery;
use db\ContestsQuery;
use db\ImagesQuery;
use libs\Session;
use models\ResultModel;

if($_SERVER['REQUEST_METHOD'] === "GET"){
  $resultResponse = new ResultModel();
  try {

  \libs\require_session();
  $user = Session::getUser();
  if(empty($user)){
    $resultResponse->isLogin = false;
    $resultResponse->returnJson();
  }
  
  ContestsQuery::$targetId = ContestsQuery::fetchPrevContestId();

  $isSubmitted = CompetitorsQuery::getIsSubmitted($user->id);
  if(!$isSubmitted){
    $resultResponse->isSubmitted = false;
    $resultResponse->returnJson();
  }

  $resultResponse = fillResultResponse($resultResponse, $user->id);

  $resultResponse->returnJson();

  } catch (\Throwable $th) {
    $resultResponse->debug = $th->getMessage();
    $resultResponse->returnJson();
  }
}

function fillResultResponse(ResultModel $response, $userId):ResultModel{
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