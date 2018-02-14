function init() {

  const $addWinner = $('.addWinner');
  const $allbuttons = $('button');
  const $spinner = $('.circle-container');
  const $circle = $('.circle');
  const $timer = $('.timer');
  const $nomore = $('.message');
  const $submitForm = $('form');
  const $colorChoice = $('.answer');
  const $fullScreen = $('.fullScreen');
  const $popup = $('.winorlose');
  const $popButton = $('.nextRound');
  const $colorHeader = $('.chooseColor');
  const $enter = $('.enter');
  const $bonusCircle = $('.bonus');
  const $numButtons = $('.numButtons');
  const $colorButtons = $('.colorButtons');
  const $body = $('body');
  const $winningsScreen = $('.totalWinnings');
  const $greenButton = $('.green');
  let choice = '';
  let choiceNum = '';
  let timer = 5;
  let total = 0;
  let totalWinnings = 0;
  let name = '';
  let $winner = '';
  let $input = '';
  let round = 1;
  let timerHasStarted = false;

  // hidden elements
  $fullScreen.hide();
  $nomore.hide();
  $numButtons.hide();
  $greenButton.hide();

  // countdown timer
  function countdown() {
    timerHasStarted = true;
    const timerId = setInterval(() => {
      console.log('countdown');
      if (timer === -1) {
        clearInterval(timerId);
        timerHasStarted = false;
        nomoreBets();
      } else {
        $timer.html(timer);
        timer--;
      }
    }, 1000);
  }

  // no more bets
  function nomoreBets() {
    $nomore.show().toggleClass('flash');
    $allbuttons.prop('disabled', true);
    $('.final').html(`${name} placed ${total} bets on ${choice}`);
    setTimeout(spinIt, 2000);
  }

  // move the class around the board and win statements
  function spinIt() {
    console.log('spinIt');
    let currentActive = 0;
    let totalMoves = 0;
    const $lis = $('.circle-container > li:not(.hidden)');
    const randTimes = Math.floor(Math.random() * 8) + 3;
    const randMove = Math.floor(Math.random() * $lis.length);
    let speed = 100;
    let spinTimer = null;
    function spin() {
      spinTimer = setTimeout(function() {
        console.log('spin');
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
        if(currentActive === $lis.length) currentActive = 0;
        spin();
      }, speed);
    }
    spin();
  }

  //win Statements
  function winCheck() {
    if(round === 1 && $winner.hasClass(choice.toLowerCase()) ||
      round > 1 && ($winner.hasClass(choice.toLowerCase()) && $winner.hasClass(choiceNum.toLowerCase()))){
      round += 1;
      totalWinnings = totalWinnings + (total * 2);
      console.log(`winnings are ${totalWinnings}`);
      console.log(`win equals round ${round}`);
      win();
    } else if (round === 3 && $winner.hasClass(choice.toLowerCase())){
      win();
      totalWinnings = total * 2;
      console.log(`winnings are ${totalWinnings}`);
    } else {
      lose();
      totalWinnings = 0;
      console.log(`lose equals round ${round}`);
    }
  }

  // restart the board calls the count down when color buttons are clicked
  function restart() {
    $fullScreen.hide();
    $spinner.removeClass('flash');
    $circle.removeClass('flash');
    $nomore.hide();
    $colorChoice.hide();
    $winner.removeClass('yellowWin');
    total = 0;
    $('.total').text(total);
    $popup.html('');
    $popButton.html('');
    $('.final').hide();
    $enter.html(`Welcome back ${name}!`);
    $('.chooseColor').addClass('flash');
  }

  $colorButtons.click(function() {
    $('.chooseColor').removeClass('flash');
    if(!timerHasStarted) countdown();
  });

  function win() {
    $fullScreen.delay(3000).show(0);
    $allbuttons.prop('disabled', false);
    const message = round === 3 ? 'Play again?' : 'Next Round';
    $popup.html(`Congratualations ${name} you won! You're through to round two!`);
    $popButton.html(message).on('click', nextRound);
  }

  function lose() {
    $fullScreen.delay(3000).show(0);
    $allbuttons.prop('disabled', false);
    $popup.html('');
    $popButton.html('');
    $popup.append(`Unlucky ${name}! Your bets didn't match this time. Have another go...?`);
    $popButton.append('Play again?').on('click', nextRound);
  }

  function nextRound() {
    restart();
    if(round === 1) timer = 5;
    if(round > 1) {
      timer = 10;
      $winningsScreen.html(totalWinnings);
      $body.addClass('bg2');
      $numButtons.show();
      $circle.removeClass('hidden');
      $bonusCircle.hide();
      $spinner.removeClass('has-eight').addClass('has-twelve');
      $addWinner.html(`${name}: 20`);
      $colorHeader.html('Select color and range!');
    }
    if(round > 2) {
      $body.removeClass('bg2').addClass('bg3');
      timer = 15;
      $bonusCircle.show();
      $greenButton.show();
      $addWinner.html(`${name}: 30`);
    }
  }

  //submit form only shown once and calls the countdown once submitted
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
  $colorButtons.on('click', (e) => {
    if(!name) return false; //what does return false actually do
    choice = $(e.target).val();
    $colorChoice.show();
    $colorHeader.removeClass('flash');
    $colorChoice.html(`${name} chose ${choice}`);
    $('.topheader').toggleClass('flash');
  });

  // which num is chosen
  $numButtons.on('click', (e) => {
    if(!name) return false;
    choiceNum = $(e.target).val();
    $colorHeader.removeClass('flash');
    $colorChoice.show().html(`${name} chose ${choice} and ${choiceNum}`);
    if(choice && choiceNum) $('.topheader').toggleClass('flash');
  });

  function updateBet(e) {
    if($(e.target).hasClass('add') && total <= 90) total = total + 10;
    else if($(e.target).hasClass('remove')) total = total - 10;
    else if($(e.target).hasClass('reset')) total = 0;
    console.log('reset');
    if(total >= 0) {
      $('.total').text(total);
      $('.final').html(`${name} placed ${total} bets on ${choice}`);
      $('.topheader').removeClass('flash');
    }
  }

  // Reset
  $('.reset, .add, .remove').click(updateBet);
}

$(init);
