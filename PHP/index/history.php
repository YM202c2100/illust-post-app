<?php
namespace index\history;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/session.php";
require_once __DIR__."/../db/contests.query.php";
require_once __DIR__."/../models/history.model.php";

use db\ContestsQuery;
use libs\Session;
use models\HistoryModel;

if($_SERVER["REQUEST_METHOD"] === "GET"){
  try {
    $response = new HistoryModel();
    Session::require_session();

    $user = Session::getUser();
    if(empty($user)){
      $response->isLogin = false;
      $response->returnJson();
    }

    $response = fillHistoryResponse($response, $user->id);
    $response->returnJson();

  } catch (\Throwable $th) {
    http_response_code(500);
    echo json_encode(['errMsg'=>$th->getMessage()]);
  }
}

function fillHistoryResponse(HistoryModel $response, $userId):HistoryModel{
  $recievedHistoryInfo = ContestsQuery::fetchContestHistory($userId);
  $response->history = HistoryModel::convFromReceiveModel($recievedHistoryInfo);
  
  return $response;
}