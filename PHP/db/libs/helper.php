<?php
namespace db;

function generatePlaceholderByLength(int $countArray){
  return rtrim(str_repeat('?,', $countArray), ',');
}