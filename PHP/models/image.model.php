<?php
namespace modles;

class ImageModel {
  public $id; 
  public $file_name;
  public $user_id;
  public $user_name;
}

class ImageWithRP extends ImageModel{
  public $rank_points;
}