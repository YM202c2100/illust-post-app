<?php
namespace index\judge;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/helper.php";
require_once __DIR__."/../libs/session.php";
require_once __DIR__."/../models/judge.model.php";
require_once __DIR__."/../db/competitors.query.php";
require_once __DIR__."/../db/contests.query.php";
require_once __DIR__."/../db/images.query.php";

use DateTime;
use db\ImagesQuery;
use db\CompetitorsQuery;
use db\ContestsQuery;
use libs\Session;
use models\JudgeModel;

try {
  if($_SERVER['REQUEST_METHOD']==="GET"){
    $judgeResponse = new JudgeModel();

    ContestsQuery::$targetId = ContestsQuery::fetchCurrentContestId();
    if(!isWithinJudgingPeriod()){
      $judgeResponse->isWithinPeriod = false;
      $judgeResponse->returnJson();
    }
    
    Session::require_session();

    $user = Session::getUser();
    if(empty($user)){
      $judgeResponse->isLogin = false;
      $judgeResponse->returnJson();
    }
    
    if( !Session::isSubmitted() ){
      $judgeResponse->isSubmitted = false;
      $judgeResponse->returnJson();
    }

    $judgeResponse = fillJudgeResponse($judgeResponse, $user->id);

    Session::setImagesToJudge($judgeResponse->imagesToJudge);

    $judgeResponse->returnJson();
  }

  else if($_SERVER['REQUEST_METHOD'] === 'POST'){
    Session::require_session();
    $user = Session::getUser();
    if(empty($user)){
      throw new \Exception("ログインしてください");
    }

    $reqData = \libs\getReqJsonBody();
    $judgedUserIds = getJudgedUserIds($reqData);

    ContestsQuery::$targetId = ContestsQuery::fetchCurrentContestId();

    $updatedRankPoints = getUpdatedRankPoints($judgedUserIds['winnerId'], $judgedUserIds['loserId']);
    CompetitorsQuery::updateRankPointAndJudgedCount($updatedRankPoints);
    $isSuccess = CompetitorsQuery::decrementLimitCanJudge($user->id);
    if(!$isSuccess){
      throw new \Exception("予期せぬエラーが発生しました");
    }

    http_response_code(200);
    echo json_encode([]);
  }

} catch (\Throwable $th) {
  http_response_code(500);
  echo json_encode(['errMsg'=>$th->getMessage()]);
}


function isWithinJudgingPeriod():bool{
  if(empty(ContestsQuery::$targetId)){
    return false;
  }

  $contestInfo = ContestsQuery::fetchContestInfo(ContestsQuery::$targetId);

  $currentDate = new DateTime();
  $startDate = new DateTime($contestInfo->judge_start_date);
  $endDate = new DateTime($contestInfo->judge_end_date);

  return ($startDate <= $currentDate && $currentDate < $endDate);
}


function fillJudgeResponse(JudgeModel $response, $userId):JudgeModel{
  $response->limitCanJudge = CompetitorsQuery::fetchLimitCanJudge($userId);
  
  // 過去に審査対象を取得済みなら、それを使用する
  $fetchedImages = Session::getImagesToJudge();
  if(isset($fetchedImages)){
    $response->imagesToJudge = $fetchedImages;
    return $response;
  }
  
  // 自分より上のランクポイントを持つ6つの画像を取得
  // 6つも画像が取得できない場合は自分より下のランクから6つの画像を取得
  $EvalatorRP = CompetitorsQuery::fetchRankPoints($userId);
  $fetchedImages = ImagesQuery::fetchImagesToJudge($userId, $EvalatorRP);
  if( !is_array($fetchedImages) || (count($fetchedImages) !== 6) ){
    $fetchedImages = ImagesQuery::fetchImagesToJudge($userId, $EvalatorRP, fetchHigher:false);
  }
  $response->imagesToJudge = $fetchedImages;

  return $response;
}

function getJudgedUserIds($requestData){
  $winnerIndex = $requestData['winnerIndex'];
  $loserIndex = $requestData['loserIndex'];

  if(is_null($winnerIndex)||is_null($loserIndex)){
    throw new \Exception("入力が正しくありません");
  }

  $images = Session::getImagesToJudge();
  return [
    'winnerId'=> $images[$winnerIndex]['user_id'],
    'loserId' => $images[$loserIndex ]['user_id']
  ];
}

function getUpdatedRankPoints($winnerId, $loserId){
  $rankPoints = CompetitorsQuery::fetchRankPointsToJudgeOthers([$winnerId, $loserId]);
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