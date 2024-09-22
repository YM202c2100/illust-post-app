<?php
namespace libs;

class Validate{
  private $errors;
  public $label;

  public function requiered($value){
    if(empty($value)){
      $this->errors[$this->label][] = "入力必須";
    }
  }

  public function getErrors(){
    return $this->errors;
  }
}