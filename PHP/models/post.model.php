<?php
namespace models;

require_once __DIR__."/abstract.model.php";

class PostModel extends IsLogin {
  public $isWithinPeriod=true;
  public $submittedImage;
}