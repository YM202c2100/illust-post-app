<?php
// ログイン中なら、ユーザー情報を返し
// そうでないなら、nullを返す
namespace index\getUser;

require_once __DIR__."/../libs/header.php";

if(empty($_COOKIE['PHPSESSID'])){
  echo json_encode(['user'=>null]);
  exit();
}

session_start();
$user = $_SESSION['user'] ?? null;
echo json_encode(['user'=>$user]);