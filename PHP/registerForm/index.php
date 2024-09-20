<?php
namespace registerForm;
require_once "../models/userModel.php";
require_once "./registerQuery.php";

use Error;
use models\UserModel;

header('Content-Type: application/json');


if($_SERVER['REQUEST_METHOD'] === "POST"){
  $id = $_POST['id'] ?? null;
  $pwd = $_POST['pwd'] ?? null;
  $userName = $_POST['userName'] ?? null;

  if(!isset($id, $pwd, $userName)) {
    throw new Error("need form data");
  };

  $user = new UserModel($id, $pwd, $userName);

  // dbにユーザー情報を格納
  if(RegisterQuery::registUser($user)){
    echo json_encode([
      'id'=>$id,
      'pwd'=>$pwd,
      'userName'=>$userName
    ]);
  }
}