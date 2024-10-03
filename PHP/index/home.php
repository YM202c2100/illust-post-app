<?php
namespace index\home;

require_once __DIR__."/../libs/header.php";
require_once __DIR__."/../libs/helper.php";
require_once __DIR__."/../models/storingModel/user.model.php";
require_once __DIR__."/../models/responseModel/home.model.php";
require_once __DIR__."/../db/images.query.php";

use db\ImagesQuery;
use models\HomeModel;
use models\UserModel;

if($_SERVER['REQUEST_METHOD'] === "GET"){
  try {
    $homeModel = new HomeModel();
    \libs\require_session();
  
    $user = UserModel::getFromSession();
    if(empty($user)){
      $homeModel->isLogin = false;
      $homeModel->returnJson();
      exit();
    }
    $homeModel->submittedFileName = ImagesQuery::fetchNameByUserId($user->id);
    
    $homeModel->returnJson();

  } catch (\Throwable $th) {
    echo json_encode(['status'=>'error', 'body'=>$th->getMessage()]);
    exit();
  }
}