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
  // const $lowNums = $('.evenButton');
  // const $highNums = $('.oddButton');
  const $bonusCircle = $('.bonus');
  const $highCircle = $('.high');
  const $numButtons = $('.numButtons');
  const $redorBlue = $('.colorButtons');
  const $body = $('body');
  let choice = '';
  let choiceNum = '';
  let timer = 5;
  let total = 0;
  let name = '';
  let $winner = '';
  let $input = '';
  let round = 1;

  // hidden elements
  $fullScreen.hide();
  $nomore.hide();
  $numButtons.hide();
  // $bonusCircle.hide();
  // $highCircle.hide();


  // countdown timer
  function countdown() {
    const timerId = setInterval(() => {
      if (timer === -1) {
        clearInterval(timerId);
        nomoreBets();
      } else {
        // $timer;
        // .toggleClass('pulse').html(timer);
        timer--;
      }
    }, 1000);
  }

  // no more bets
  function nomoreBets() {
    // alert('No more bets');
    $nomore.show().toggleClass('flash');
    $allbuttons.prop('disabled', true);
    $('.final').html(`${name} placed ${total} bets on ${choice}`);
    setTimeout(spinIt, 2000);
    // spinIt();
    // $spinner.toggleClass('spinning');
  }

  // move the class around the board and win statements
  function spinIt() {
    let currentActive = 0;
    let totalMoves = 0;
    const $lis = $('.circle-container > li:not(.hidden)');
    const randTimes = Math.floor(Math.random() * 8) + 3;
    const randMove = Math.floor(Math.random() * $lis.length);
    let speed = 100;
    let spinTimer = null;
    function spin() {
      spinTimer = setTimeout(function() {
        $lis.removeClass('flash').eq(currentActive).addClass('flash');
        if(totalMoves >= randTimes * $lis.length + randMove - 16){
          speed += 10;
          console.log(totalMoves, randTimes * $lis.length + randMove);
          if(totalMoves === randTimes * $lis.length + randMove) {
            $winner = $lis.eq(currentActive);
            console.log('currentActive', currentActive);
            $winner.addClass('yellowWin');
            $nomore.show().removeClass('flash');
            $('.topheader').removeClass('flash');
            clearTimeout(spinTimer);
            return winCheck();
          }
        }
        currentActive += 1;
        totalMoves += 1;
        if(currentActive === $lis.length) {
          currentActive = 0;
        }
        spin();
      }, speed);
    }
    spin();
  }

  //win Statements
  function winCheck() {
    if(round === 1 && $winner.hasClass(choice.toLowerCase()) ||
      round > 1 && $winner.hasClass(choice.toLowerCase())&& $winner.hasClass(choiceNum.toLowerCase())){
      round += 1;
      console.log(`round win equals ${round}`);
      win();
    } else if (round === 3 && $winner.hasClass(choice.toLowerCase())){
      win();
    } else {
      lose();
      console.log(`round lose equals ${round}`);
    }
  }

  // restart the board
  function restart() {
    $fullScreen.hide();
    $spinner.removeClass('flash');
    $circle.removeClass('flash');
    $nomore.hide();
    $chosenColor.hide();
    $winner.removeClass('yellowWin');
    total = 0;
    $('.total').text(total);
    $popup.html('');
    $popButton.html('');
    $('.final').hide();
    $enter.html(`Welcome back ${name}!`);
    $('.chooseColor').addClass('flash');
    $redorBlue.click(function() {
      $('.chooseColor').removeClass('flash');
      countdown();
    });
  }

  function win() {
    $fullScreen.delay(3000).show(0);
    $allbuttons.prop('disabled', false);
    $popup.html('');
    $popButton.html('');
    if(round === 1) {
      $popup.append(`Congratualations ${name} you won! You're through to round two!`);
      $popButton.html('').append('Next Round').on('click', nextRound);
    }
    if(round === 2){
      $popup.html('').append(`Congratualations ${name} you won! You're through to round three!`);
      $popButton.append('Next Round').on('click', nextRound);
    }
    if(round === 3){
      $popup.append(`Congratualations ${name} you won! You're very lucky, want to play again?`);
      $popButton.append('Play again?').on('click', nextRound);//or collect money
    }
  }


  function lose() {
    $fullScreen.delay(3000).show(0);
    $allbuttons.prop('disabled', false);
    $popup.html('');
    $popButton.html('');
    if(round === 1){
      $popup.append(`Unlucky ${name}! Your bets didn't match this time. Have another go...?`);
      $popButton.append('Play again?').on('click', nextRound);
    }
    if(round === 2){
      $popup.append(`Unlucky ${name}! Your bets didn't match this time. Have another go...?`);
      $popButton.append('Play again?').on('click', nextRound);
    }
    if(round === 3){
      $popup.append(`Unlucky ${name}! Your bets didn't match this time. Have another go...?`);
      $popButton.append('Play again?').on('click', nextRound);
    }
  }

  function nextRound() {
    restart();
    if(round === 1) timer = 5;
    if(round >= 2) {
      timer = 10;
      $body.addClass('bg2');
      $numButtons.show();
      $circle.removeClass('hidden');
      $bonusCircle.hide();
      $spinner.removeClass('has-eight');
      $spinner.addClass('has-twelve');
      $($addWinner).append(`${name}: 10`);
      $colorHeader.append(' and range!');
    }if(round === 3) {
      $body.addClass('bg3');
      timer = 15;
      $bonusCircle.show();
      $($addWinner).append(`${name}: 30`);
    }
  }


  //submit form
  $submitForm.submit(function(e) {
    e.preventDefault();
    $input = $('#initials');
    $submitForm.hide();
    name = $input.val().toUpperCase();
    $input.val('');
    $colorHeader.addClass('flash');
    countdown();
  });

  // which color is chosen
  $redorBlue.on('click', (e) => {
    if(!name) return false; //what does return false actually do
    choice = $(e.target).val();
    $chosenColor.show();
    $colorHeader.removeClass('flash');
    $chosenColor.html(`${name} chose ${choice}`);
    $('.topheader').toggleClass('flash');
  });

  // which num is chosen
  $numButtons.on('click', (e) => {
    if(!name) return false;
    choiceNum = $(e.target).val();
    $chosenColor.show();
    $colorHeader.removeClass('flash');
    $chosenColor.html(`${name} chose ${choice} and ${choiceNum}`);
    if(choice === true && choiceNum === true){//is this right?
      $('.topheader').toggleClass('flash');
    }
  });



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

  // $('.confirm').click(function(){
  //   $('.final').html(`${name} placed ${total} bets on ${choice}`);
  // });
}

$(init);
