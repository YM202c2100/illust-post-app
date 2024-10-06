<?php
namespace index\judge;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/helper.php";
require_once __DIR__."/../models/storingModel/user.model.php";
require_once __DIR__."/../models/storingModel/competitor.model.php";
require_once __DIR__."/../models/responseModel/judge.model.php";
require_once __DIR__."/../db/competitors.query.php";
require_once __DIR__."/../db/images.query.php";

use db\ImagesQuery;
use db\CompetitorsQuery;
use models\CompetitorModel;
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
  
  if( !CompetitorModel::isSubmitted() ){
    $judgeResponse->isSubmitted = false;
    $judgeResponse->returnJson();
  }
  
  // ユーザーが作品を提出済みなら、二つの画像を返す
  $rankPointsOfEvalator = CompetitorsQuery::getRankPointsOf($user);
  $judgeResponse->imagesToJudge = ImagesQuery::fetchImagesToJudge($rankPointsOfEvalator);
  // if( !is_array($images) || (count($images) !== 2) ){
  //   echo json_encode(['status'=>'error', 'body'=>'レコード不足']);
  //   exit();
  // }
  $judgeResponse->returnJson();
}

else if($_SERVER['REQUEST_METHOD'] === 'POST'){
  $reqData = \libs\getReqJsonBody();
  $winnerId = $reqData['winnerId'];
  $loserId = $reqData['loserId'];

  if(empty($winnerId)||empty($loserId)){
    echo json_encode(['status'=>'error', 'body'=>'データが正しく取得できませんでした']);
    exit();
  }

  $updatedRankPoints = getUpdatedRankPoints($winnerId, $loserId);
  CompetitorsQuery::updateRankPointAndJudgedCount($updatedRankPoints);

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