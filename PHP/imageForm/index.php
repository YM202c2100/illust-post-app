<?php
namespace imageForm;

use Error;

require_once "./imageFormQuery.php";

if($_SERVER['REQUEST_METHOD'] === 'POST'){
  $image = $_FILES['image_uploads'] ?? null;
  if(!isset($image)){
    http_response_code(500);
    throw new Error("image not found");
  }

  $isSuccess = ImageFormQuery::insert($image['name']);
  if($isSuccess){
    // move_uploaded_file($image['tmp_name'], '../../public/'. $image['name']);
  }
}