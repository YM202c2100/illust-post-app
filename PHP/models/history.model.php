<?php
namespace models;

require_once __DIR__."/abstract.model.php";
require_once __DIR__."/RecieveModel/history.recieve.php";

class HistoryModel extends IsLogin{
  public $history;

  static function convFromReceiveModel($receivedArray){
    $historyElems = [];

    foreach($receivedArray as $recieved){
      $historyElems[] = new HistoryElementModel($recieved);
    }

    return $historyElems;
  }
}

class HistoryElementModel{
  public ContestOverview $contest;
  public $rankPoints;
  public $filePath;

  public function __construct(HistoryReceiveModel $historyElem) {
    $this->rankPoints = $historyElem->rank_points;
    $this->filePath = $historyElem->file_name;
    $this->contest = new ContestOverview(
      $historyElem->round_num, 
      $historyElem->subject,
      $historyElem->judge_end_date
    );
  }
}

class ContestOverview {
  public $roundNum;
  public $subject;
  public $judgeEndDate;

  public function __construct($round_num, $subject, $judge_end_date) {
    $this->roundNum = $round_num;
    $this->subject = $subject;
    $this->judgeEndDate = $judge_end_date;
  }
}