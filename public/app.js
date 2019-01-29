var app = angular.module("HangmanApp", []);
app.controller("GameController", ['$scope', function ($scope) {

  var word = ["indara", "indear", "indeed", "indent", "indian", "indice", "indigo", "indish",
    "indium", "indols", "induce", "indure", "indult", "indart", "indebt", "indict",
    "indene", "indias", "indole", "indoor", "induct", "indign", "indite", "indore"];
  $scope.incorrectLettersChosen = [];
  $scope.correctLettersChosen = [];
  $scope.guess = 6;
  $scope.displayWord = '';
  $scope.input = {
    letter: ''
  }
  $scope.selectedWord = '';
  $scope.progress = 0;
  $scope.progressWidth = 16.667;
  $scope.head = true;
  $scope.body = true;
  $scope.leftHand = true;
  $scope.rightHand = true;
  $scope.leftLeg = true;
  $scope.rightLeg = true;

  var selectRandomWord = function () {
    var index = Math.round(Math.random() * (word.length - 1))
    return word[index];
  }

  var newGame = function () {
    $scope.incorrectLettersChosen = [];
    $scope.correctLettersChosen = [];
    $scope.guess = 6;
    $scope.displayWord = '';
    
    selectedWord = selectRandomWord();
    var tempDisplayWord = '';
    for (var i = 0; i < selectedWord.length; i++) {
      tempDisplayWord += '*';
    }
    $scope.displayWord = tempDisplayWord;
    $scope.selectedWord = selectedWord;
  }

  $scope.letterChosen = function () {
    for (var i = 0; i < $scope.correctLettersChosen.length; i++) {
      if ($scope.correctLettersChosen.length[i] == $scope.input.letter) {
        $scope.input.letter = "";
        return;
      }
    }

    for (var i = 0; i < $scope.incorrectLettersChosen.length; i++) {
      if ($scope.incorrectLettersChosen.length[i] == $scope.input.letter) {
        $scope.input.letter = "";
        return;
      }
    }

    var correct = false;
    for (var i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] == $scope.input.letter) {
        $scope.displayWord = $scope.displayWord.slice(0, i) + $scope.input.letter + $scope.displayWord.slice(i + 1);
        $scope.progress += 10;
        $scope.progressWidth += 16.667;
        correct = true;
      }
    }

    if (correct == true) {
      $scope.correctLettersChosen.push($scope.input.letter);
    } else {
      $scope.incorrectLettersChosen.push($scope.input.letter);
      $scope.guess--;
      if(($scope.guess)==5){
        $scope.head = false;      
      }
      if(($scope.guess)== 4){
        $scope.head = true;
        $scope.body = false;
      }
      if(($scope.guess)== 3){
        $scope.head = true;
        $scope.body = true;
        $scope.rightHand = false;
      }
      if(($scope.guess)== 2){
        $scope.head = true;
        $scope.body = true;
        $scope.rightHand = true;
        $scope.leftHand = false;
      }
      if(($scope.guess)== 1){
        $scope.head = true;
        $scope.body = true;
        $scope.leftHand = true;
        $scope.rightHand = true;
        $scope.leftLeg = false;
      }
      if(($scope.guess)== 0){
        $scope.head = true;
        $scope.body = true;
        $scope.leftHand = true;
        $scope.rightHand = true;
        $scope.leftLeg = true;
        $scope.rightLeg = false;
      }
    }
    $scope.input.letter = '';
    if ($scope.guess == 0) {
      alert("You lose");
      newGame();
    }
    if ($scope.displayWord.indexOf("*") == -1) {
      alert("you win");
      newGame();
    }
  }

  newGame();

   // Color hex values
  //  var orange = "#e67e22";
  //  var red = "#e74c3c";
  //  var green = "#2ecc71";
 
   // Breakpoints for colors
   var breakToWarning = 20;
   var breakToDanger = 40;
 
   // Color change
   $scope.$watch('progress', function () {
     if ($scope.progress >= breakToDanger) {
       $scope.barColor = 'lightgreen';
     } else if ($scope.progress < breakToDanger && $scope.progress > breakToWarning) {
       $scope.barColor = 'orange';
     } else if ($scope.progress < breakToWarning) {
       $scope.barColor = 'red';
     }
   });

}]);
