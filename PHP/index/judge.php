<?php
namespace index\judge;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/helper.php";
require_once __DIR__."/../libs/session.php";
require_once __DIR__."/../models/storingModel/user.model.php";
require_once __DIR__."/../models/responseModel/judge.model.php";
require_once __DIR__."/../db/competitors.query.php";
require_once __DIR__."/../db/images.query.php";

use db\ImagesQuery;
use db\CompetitorsQuery;
use libs\Session;
use models\JudgeModel;
use models\UserModel;

if($_SERVER['REQUEST_METHOD']==="GET"){
  $judgeResponse = new JudgeModel();
  
  \libs\require_session();

  $user = UserModel::getFromSession();
  if(empty($user)){
    $judgeResponse->isLogin = false;
    $judgeResponse->returnJson();
  }
  
  if( !Session::isSubmitted() ){
    $judgeResponse->isSubmitted = false;
    $judgeResponse->returnJson();
  }

  $judgeResponse->limitCanJudge = CompetitorsQuery::getLimitCanJudge($user->id);
  
  // ユーザーが作品を提出済みなら、6つの画像を返す
  $rankPointsOfEvalator = CompetitorsQuery::getRankPointsOf($user);
  $fetchedImages = JudgeModel::getImagesToJudgeFromSession();
  if(isset($fetchedImages)){
    $judgeResponse->imagesToJudge = $fetchedImages;
    $judgeResponse->returnJson();
  }

  $fetchedImages = ImagesQuery::fetchImagesToJudge($user->id, $rankPointsOfEvalator);
  if( !is_array($fetchedImages) || (count($fetchedImages) !== 6) ){
    $fetchedImages = ImagesQuery::fetchImagesToJudge($user->id, $rankPointsOfEvalator, fetchHigher:false);
  }

  $judgeResponse->imagesToJudge = $fetchedImages;
  JudgeModel::setImagesToJudgeSession($fetchedImages);

  $judgeResponse->returnJson();
}

else if($_SERVER['REQUEST_METHOD'] === 'POST'){
  \libs\require_session();
  $user = UserModel::getFromSession();
  if(empty($user)){
    http_response_code(500);
    exit();
  }

  $reqData = \libs\getReqJsonBody();
  $winnerId = $reqData['winnerId'];
  $loserId = $reqData['loserId'];

  if(empty($winnerId)||empty($loserId)){
    http_response_code(500);
    exit();
  }

  $updatedRankPoints = getUpdatedRankPoints($winnerId, $loserId);
  CompetitorsQuery::updateRankPointAndJudgedCount($updatedRankPoints);
  $isSuccess = CompetitorsQuery::decrementLimitCanJudge($user->id);
  if(!$isSuccess){
    http_response_code(500);
    exit();
  }

  echo json_encode(['status'=>'ok', 'body'=>'更新されました']);
}


function getUpdatedRankPoints($winnerId, $loserId){
  $rankPoints = CompetitorsQuery::getAssocRankPointsOfUsers([$winnerId, $loserId]);
  return calcRankPointFluctuation($rankPoints, $winnerId, $loserId);
}


// イロレーティングを用いて連想配列[userID => newPoints]を出力
function calcRankPointFluctuation($rankPoints, $winnerId, $loserId){
  $x = ($rankPoints[$winnerId] - $rankPoints[$loserId])/400;
  $winProbability = 1 / ( 1 + 10**(-$x) );
  $K = 16; //任意定数(大きいほど変動が激しく、32が使われることが多い)
  $updatedRankPoints[$winnerId] = round($rankPoints[$winnerId] + $K*$winProbability);
  $updatedRankPoints[$loserId]  = round($rankPoints[$loserId]  - $K*$winProbability);

  if($updatedRankPoints[$loserId] < 0){
    $updatedRankPoints[$loserId] = 0;
  }

  return $updatedRankPoints;
}