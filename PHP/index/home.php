<?php
namespace index\home;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/session.php";
require_once __DIR__."/../models/home.model.php";
require_once __DIR__."/../db/images.query.php";
require_once __DIR__."/../db/contests.query.php";
require_once __DIR__."/../db/competitors.query.php";

use db\CompetitorsQuery;
use db\ContestsQuery;
use db\ImagesQuery;
use libs\Session;
use models\ContestModel;
use models\HomeModel;

if($_SERVER['REQUEST_METHOD'] === "GET"){
  try {
    $homeResponse = new HomeModel();
    \libs\require_session();
  
    $user = Session::getUser();
    if(empty($user)){
      $homeResponse->isLogin = false;
      $homeResponse->returnJson();
      exit();
    }

    ContestsQuery::$targetId = ContestsQuery::fetchCurrentContestId();
    if(empty(ContestsQuery::$targetId)){
      ContestsQuery::$targetId = ContestsQuery::fetchNextScheduledId();
    }

    $homeResponse = fillHomeResponse($homeResponse, $user->id);
    
    $homeResponse->returnJson();

  } catch (\Throwable $th) {
    echo json_encode(['status'=>'error', 'body'=>$th->getMessage()]);
    exit();
  }
}

function fillHomeResponse(HomeModel $response, $userId){
  $contestData = ContestsQuery::fetchContestInfo();
  $response->contest = new ContestModel($contestData);

  $response->limitCanJudge = CompetitorsQuery::fetchLimitCanJudge($userId);
  $response->submittedFileName = ImagesQuery::fetchNameByUserId($userId);

  $response->rankPoints = CompetitorsQuery::fetchLastRankPoints($userId);
  
  return $response;
}