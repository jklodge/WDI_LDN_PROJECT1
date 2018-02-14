function init() {

  let player = null;
  let Xturn = true;
  const $display = $('#display');
  const $addWinner = $('.addWinner');
  const $allbuttons = $('button');
  const $colorButton = $('.btn-container');
  const $spinner = $('.circle-container');
  const $circle = $('.circle');
  const $timer = $('.timer');
  const $nomore = $('.message');
  const $submitForm = $('form');
  const $chosenColor = $('.answer');
  const $fullScreen = $('.fullScreen');
  const $popup = $('.winorlose');
  const $popButton = $('.nextRound');
  const $colorHeader = $('.chooseColor');
  const $enter = $('.enter');
  const $lowNums = $('.evenButton');
  const $highNums = $('.oddButton');
  const $bonusCircle = $('.bonus');
  const $highCircle = $('.high');
  const $numButtons = $('numButtons');
  const $body = $('body');
  let choice = '';
  let choiceNum = '';
  let timer = 5;
  let total = 0;
  let name = '';
  let $winner = '';
  let $input = '';


  $fullScreen.hide();
  $nomore.hide();
  $lowNums.hide();
  $highNums.hide();
  $bonusCircle.hide();
  $highCircle.hide();


  // countdown timer
  function countdown() {
    const timerId = setInterval(() => {
      if (timer === -1) {
        clearInterval(timerId);
        console.log('check');
        nomoreBets();
      } else {
        $timer
          .toggleClass('pulse').html(timer);
        timer--;
      }
    }, 1000);
  }

  //submit form
  $submitForm.submit(function(e) {
    e.preventDefault();
    $input = $('#initials');
    $submitForm.hide();
    name = $input.val().toUpperCase();
    $input.val('');
    console.log(name);
    $colorHeader.addClass('flash');
    countdown();
  });

  // which color is chosen
  $colorButton.on('click', (e) => {
    if(!name) return false; //what does return false actually do
    choice = $(e.target).val();
    console.log(choice);
    $chosenColor.show();
    $colorHeader.removeClass('flash');
    if(choice === true && choiceNum === true){
    $('.topheader').toggleClass('flash');
  }// should i return false

  });

  // which num is chosen
  $numButtons.on('click', (e) => {
    if(!name) return false;
    choiceNum = $(e.target).val();
    console.log(choiceNum);
    $colorHeader.removeClass('flash');
    $chosenColor.show();
    $chosenColor.html(`${name} chose ${choice}`);
    if(choice === true && choiceNum === true){
    $('.topheader').toggleClass('flash');
  }
  });

  //add bet function
  $('.total').text(total);
  // When button is clicked
  $('.add').click(function(){
  //Add 10 to total
    total = total + 10;
    // Display total
    if(total >= 0) {
      $('.total').text(total);
      $('.final').html(`${name} placed ${total} bets on ${choice}`);
      $('.topheader').removeClass('flash');
    }
  });
  //Subtract
  $('.remove').click(function(){
    total = total - 10;
    if(total >= 0) {
      $('.total').text(total);
      $('.final').html(`${name} placed ${total} bets on ${choice}`);
      $('.topheader').removeClass('flash');
    }
  });
  // Reset
  $('.reset').click(function(){
    total = 0;
    $('.total').text(total);
    $('.final').html(`${name} placed ${total} bets on ${choice}`);
    $('.topheader').removeClass('flash');
  });

  function nomoreBets() {
    // alert('No more bets');
    $nomore.show().toggleClass('flash');
    $allbuttons.prop('disabled', true);
    $('.final').html(`${name} placed ${total} bets on ${choice}`);
    setTimeout(spinIt, 2000);
  }

  // move the class around the board
  function spinIt() {
    let currentActive = 0;
    let timesSpun = 0;
    const $lis = $('.circle-container > li');
    const ranNum = Math.floor(Math.random() * 9) + 5;
    console.log(`what is the ${ranNum}`);
    const startSpinner =  setInterval(function() {
      console.log('ranNum', ranNum);
      currentActive = (currentActive + 1) % $lis.length;
      $lis.removeClass('flash').eq(currentActive).addClass('flash');
      timesSpun += 1;
      console.log('timesspun:', timesSpun);
      if(timesSpun === ranNum){
        clearInterval(startSpinner);
        $winner = $lis.eq(currentActive);
        console.log($winner);
        $winner.addClass('yellowWin');
        $nomore.show().removeClass('flash');
      }
    }, 180);// why did i put 180 here?
    winorLose();
  }

  /// win or winorlose
  function decisionRoundone() {
    if(choice === 'Blue' && $winner.hasClass('blue')){
      console.log('You won');
      $fullScreen.delay(1000).show(0);
      $allbuttons.prop('disabled', false);
      $popup.html('');
      $popButton.html('');
      $popup.append(`Congratualations ${name} you won! You're through to round two!`);
      $popButton.append('Next Round');
      $popButton.on('click', roundOne);
    } else if (choice === 'Red' && $winner.hasClass('red')){
      console.log('You won');
      $fullScreen.delay(1000).show(0);
      $allbuttons.prop('disabled', false);
      $popup.html('');
      $popButton.html('');
      $popup.append(`Congratualations ${name} you won! You're through to round two!`);
      $popButton.append('Next Round');
      $popButton.on('click', roundOne);
    }else {
      console.log('YOU LOST');
      $fullScreen.delay(1000).show(0);
      $allbuttons.prop('disabled', false);
      $popup.html('');
      $popButton.html('');
      $popup.append(`Unlucky ${name}! Your bets didn't match this time. Have another go...?`);
      $popButton.append('Play again?');
      $popButton.on('click', roundOne);
    }
  }

  // round two winorLose
  function decisionRoundtwo() {
    if(choice === 'Blue' && choice === 'low' && $winner.hasClass('blue')){
      console.log('You won');
      $fullScreen.delay(1000).show(0);
      $allbuttons.prop('disabled', false);
      $popup.html('');
      $popButton.html('');
      $popup.append(`Congratualations ${name} you won! You're through to round two!`);
      $popButton.append('Next Round');
      $popButton.on('click', roundOne);
    } else if (choice === 'Red' && $winner.hasClass('red')){
      console.log('You won');
      $fullScreen.delay(1000).show(0);
      $allbuttons.prop('disabled', false);
      $popup.html('');
      $popButton.html('');
      $popup.append(`Congratualations ${name} you won! You're through to round two!`);
      $popButton.append('Next Round');
      $popButton.on('click', roundOne);
    }else {
      console.log('YOU LOST');
      $fullScreen.delay(1000).show(0);
      $allbuttons.prop('disabled', false);
      $popup.html('');
      $popButton.html('');
      $popup.append(`Unlucky ${name}! Your bets didn't match this time. Have another go...?`);
      $popButton.append('Play again?');
      $popButton.on('click', roundOne);
    }
  }

  const winStrategy = {
    Red: 'red', 'high',
    Blue: 'blue', 'low',
  };

   const choiceArr = Object.keys(winStrategy);

  function restart() {
    $fullScreen.hide();
    $nomore.hide();
    $chosenColor.hide();
    $winner.removeClass('yellowWin');
    total = 0;
    $('.total').text(total);
    $popup.html('');
    $popButton.html('');
    $('.final').hide();
    $enter.html(`Welcome back ${name}!`);
    console.log(name);
    $('.chooseColor').addClass('flash');
  }

  //round one
  function roundOne() {
    restart();
    timer = 5;
    $colorButton.click(function() {
      $('.chooseColor').removeClass('flash');
      countdown();
    });
  }

  // round two
  function roundTwo() {
    restart();
    $spinner.removeClass('flash');
    $circle.removeClass('flash');
    timer = 10;
    $body.addClass('bg2');
    $highCircle.show();
    $lowNums.show();
    $highNums.show();
    $spinner.removeClass('has-eight');
    $spinner.addClass('has-twelve');
    $($addWinner).append(`${name}: 10`);
    $colorHeader.append(' and range!');
    $colorButton.click(function() {
      $('.chooseColor').removeClass('flash');
      countdown();
    });
    console.log(`what is choice ${choice}`);


  // round three
  // function roundThree() {
  //     restart();
  //     $highCircle.show();
  //     $lowNums.show();
  //     $highNums.show();
  //     $popup.html('');
  //     $popButton.html('');
  //     $spinner.removeClass('has-eight');
  //     $spinner.addClass('has-twelve');
  //     $bonusCircle.show();
  //     $($addWinner).append(`${name}: 30`);
  //     timer = 10;
  //   }




  // $('.confirm').click(function(){
  //   $('.final').html(`${name} placed ${total} bets on ${choice}`);
  // });
}



//win Statements
function winStatement() {
  if(round === 1 && $winner.hasClass(choice.toLowerCase()) ||
    round > 1 && $winner.hasClass(choice.toLowerCase())&& $winner.hasClass(choiceNum.toLowerCase())){
    round += 1;
    winRoundone();
  } else {
    loseRoundone();
  }
}


//
// //win Statements
// function winoneStatement() {
//   if($winner.hasClass(choice.toLowerCase())){
//     round += 1;
//     winRoundone();
//   } else {
//     loseRoundone();
//   }
// }
//
// // win Two Statements
// function wintwoStatements() {
//   if($winner.hasClass(choice.toLowerCase())&& $winner.hasClass(choiceNum.toLowerCase())) {
//     round += 1;
//     winRoundtwo();
//   }else {
//     loseRoundtwo();
//   }
// }
//
// // win Three Statements
// function winthreeStatements() {
//   if($winner.hasClass(choice.toLowerCase())&& $winner.hasClass(choiceNum.toLowerCase())){
//     round += 1;
//     winRoundthree();
//   }else if
//   (choice === 'Green' && $winner.hasClass('green')) {
//     winRoundthree();
//     round += 1;
//   } else {
//     loseRoundthree();
//   }
// }


  // function winRoundone() {
  //   $fullScreen.delay(3000).show(0);
  //   $allbuttons.prop('disabled', false);
  //   $popup.html('').append(`Congratualations ${name} you won! You're through to round two!`);
  //   $popButton.html('').append('Next Round').on('click', roundTwo);
  // }

  // function loseRoundone() {
  //   $fullScreen.delay(3000).show(0);
  //   $allbuttons.prop('disabled', false);
  //   $popup.html('');
  //   $popup.append(`Unlucky ${name}! Your bets didn't match this time. Have another go...?`);
  //   $popButton.html('').append('Play again?').on('click', roundOne);
  // }
  //
  // function loseRoundtwo() {
  //   $fullScreen.delay(3000).show(0);
  //   $allbuttons.prop('disabled', false);
  //   $popup.html('');
  //   $popup.append(`Unlucky ${name}! Your bets didn't match this time. Have another go...?`);
  //   $popButton.html('').append('Play again?').on('click', roundTwo);
  // }
  //
  // function winRoundtwo() {
  //   $fullScreen.delay(3000).show(0);
  //   $allbuttons.prop('disabled', false);
  //   $popup.html('').append(`Congratualations ${name} you won! You're through to round three!`);
  //   $popButton.html('').append('Next Round').on('click', roundThree);
  // }
  // // lose round three
  // function loseRoundthree() {
  //   $fullScreen.delay(3000).show(0);
  //   $allbuttons.prop('disabled', false);
  //   $popup.html('');
  //   $popup.append(`Unlucky ${name}! Your bets didn't match this time. Have another go...?`);
  //   $popButton.html('').append('Play again?').on('click', roundThree);
  // }
  //
  // // lose round three
  // function winRoundthree() {
  //   $fullScreen.delay(3000).show(0);
  //   $allbuttons.prop('disabled', false);
  //   $popup.html('').append(`Congratualations ${name} you won! You're very lucky, want to play again?`);
  //   $popButton.html('').append('Play again?').on('click', roundOne);
  // }

  // //roundOne
  // function roundOne() {
  //   restart();
  //   timer = 5;
  // }
  //
  // // round two
  // function roundTwo() {
  //   restart();
  //   timer = 15;
  //   $body.addClass('bg2');
  //   $highCircle.show();
  //   $numButtons.show();
  //   $spinner.removeClass('has-eight');
  //   $spinner.addClass('has-twelve');
  //   $($addWinner).append(`${name}: 10`);
  //   $colorHeader.append(' and range!');
  // }

  // round three
  // function roundThree() {
  //   restart();
  //   roundTwo();
  //   $body.addClass('bg3');
  //   timer = 15;
  //   $bonusCircle.show();
  //   $($addWinner).append(`${name}: 30`);
  // }


$(init);
