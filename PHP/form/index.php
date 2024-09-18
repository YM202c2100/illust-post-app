<?php
require_once "./formQuery.php";

if($_SERVER['REQUEST_METHOD'] === 'POST'){
  $image = $_FILES['image_uploads'] ?? null;
  if(!isset($image)){
    http_response_code(500);
    throw new Error("image not found");
  }

  $isSuccess = FormQuery::insert($image['name']);
  if($isSuccess){
    move_uploaded_file($image['tmp_name'], '../../public/'. $image['name']);
  }
}