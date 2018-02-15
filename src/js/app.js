function init() {

  // const $addWinner = $('.addWinner');
  const $allbuttons = $('button');
  const $spinner = $('.circle-container');
  const $circle = $('.circle');
  const $timer = $('.timer');
  const $nomore = $('.message');
  const $submitForm = $('.getInitials');
  const $colorChoice = $('.answer');
  const $fullScreen = $('.fullScreen');
  const $winorlosemessage = $('.winorlose');
  const $nextRound = $('.nextRound');
  const $cashout = $('.cashout');
  const $colorHeader = $('.chooseColor');
  const $enter = $('.enter');
  const $bonusCircle = $('.bonus');
  const $numButtons = $('.numButtons');
  const $colorButtons = $('.colorButtons');
  const $body = $('body');
  const $winningsScreen = $('.totalWinnings');
  const $greenButton = $('.green');
  const $tableHeader = $('.topheader');
  const $betsMessage = $('.final');
  const $totalBet = $('.total');
  const $betCalc = $('.reset, .add, .remove');
  const $addtoLeader = $('.addLeader');
  const $nextroundButtons = $('.roundButtons');
  const $closedChest = $('.closedChest');
  const $chest = $('.chest');
  const $welcomeForm = $('.welcomeForm');
  const $amountHeader = $('.amountheader');
  const $welcomePopup = $('.welcomepop');
  const $welcomeMessage = $('.welcomemessage');
  const $giphy = $('.giphy');
  const $firstPopup = $('.firstPopup');
  let choice = '';
  let choiceNum = '';
  let timer = 5;
  let total = 0;
  let totalWinnings = 0;
  let name = '';
  let $winner = '';
  let $input = '';
  let round = 1;
  let amountAdded = 0;
  let amount = 0;
  let timerHasStarted = false;
  const $inputAm = $('.value');
  const $welcomeButton = $('.welcomeButton');

  // hidden elements
  $fullScreen.hide();
  $nomore.hide();
  $numButtons.hide();
  $greenButton.hide();
  $colorButtons.hide();
  $colorHeader.hide();
  $closedChest.hide();
  $welcomePopup.hide();
  $welcomeForm.hide();
  $nextroundButtons.show();
  $giphy.hide();

  //Call welcome screen
  welcome();

  function welcome() {
    $welcomePopup.show();
    $welcomeForm.show();
    round = 0;
    $fullScreen.delay(30).show(0);
    console.log(`what round ${round}`);
    $nextroundButtons.hide();
  }

  $welcomeForm.keypress(function (e) {
    e.preventDefault();
  });

  $welcomeButton.on('click',(e) => {
    e.preventDefault();
    amountAdded = $inputAm.val();
    amount = (amountAdded - total) + totalWinnings;
    $amountHeader.html(`You Have £${amountAdded}`);
    console.log($inputAm.val());
    round = 1;
    $welcomePopup.hide();
    $fullScreen.hide();
    $nextroundButtons.show();
  });

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
    $betsMessage.html(`${name} placed ${total} bets on ${choice}`);
    setTimeout(spinIt, 2000);
  }

  // move the class around the board and win statements
  function spinIt() {
    console.log('spinIt');
    let currentActive = 0;
    let totalMoves = 0;
    const $lis = $('.circle-container > li:not(.hidden)');
    const randTimes = Math.floor(Math.random() * 8) + 2;
    const randMove = Math.floor(Math.random() * $lis.length);
    let speed = 100;
    let spinTimer = null;
    function spin() {
      spinTimer = setTimeout(function() {
        console.log('spin');
        $lis.removeClass('flash, flashBorder').eq(currentActive).addClass('flash, flashBorder');
        if(totalMoves >= randTimes * $lis.length + randMove - 16){
          speed += 10;
          console.log(totalMoves, randTimes * $lis.length + randMove);
          if(totalMoves === randTimes * $lis.length + randMove) {
            $winner = $lis.eq(currentActive);
            console.log('currentActive', currentActive);
            $winner.addClass('yellowWin');
            $nomore.show().removeClass('flash');
            $tableHeader.removeClass('flash');
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

    if(round === 1 && $winner.hasClass(choice.toLowerCase()) || round > 1 && ($winner.hasClass(choice.toLowerCase()) && $winner.hasClass(choiceNum.toLowerCase()))){
      round += 1;
      totalWinnings = totalWinnings + (total * 2);
      console.log(`winnings are ${totalWinnings}`);
      console.log(`win equals round ${round}`);
      $addtoLeader.append(`<p>${name}: ${round * 10}</p>`);
      win();
    } else if (round === 3 && $winner.hasClass(choice.toLowerCase())){
      win();
      totalWinnings = total * 3;
      console.log(`winnings are ${totalWinnings}`);
    } else {
      lose();
      totalWinnings = totalWinnings - total;
      if(totalWinnings <= 0) totalWinnings = 0;
      console.log(`lose equals round ${round}`);
    }
    amount = (amountAdded - total) + totalWinnings;
  }

  // restart the board calls the count down when color buttons are clicked
  function restart() {
    $nextroundButtons.show();
    $fullScreen.hide();
    $spinner.removeClass('flash');
    $circle.removeClass('flash');
    $nomore.hide();
    $winner.removeClass('yellowWin');
    total = 0;
    $totalBet.text(total);
    $winorlosemessage.html('');
    $betsMessage.hide();
    $enter.html(`Welcome back ${name}!`);
    $colorHeader.addClass('flash');
    $colorHeader.addClass('highlight');
    $betCalc.show().on('click');
  }

  $colorButtons.click(function() {
    $colorHeader.removeClass('flash');
    if(!timerHasStarted) countdown();
  });

  function win() {
    $fullScreen.delay(3000).show(0);
    $allbuttons.prop('disabled', false);
    console.log(`what round ${round}`);
    amount = (amountAdded - total) + totalWinnings;
    $winorlosemessage.html(`Congratualations ${name} you won £${totalWinnings}! You're through to Round ${round}!`);
    const message = (round === 3) ? 'Play again?' : 'Next Round';
    $nextRound.html(message).on('click', nextRound);
    $cashout.html('Cashout?').on('click', cashoutGif);
    if(round === 3){
      $winorlosemessage.html(`Congratualations ${name} you won £${totalWinnings}! Cash out or play again?`);
    }
  }

  function lose() {
    $fullScreen.delay(3000).show(0);
    $allbuttons.prop('disabled', false);
    $closedChest.show();
    $chest.hide();
    amount = (amountAdded - total) + totalWinnings;
    if(round === 1) $winorlosemessage.append(`Unlucky ${name}! Your bets didn't match this time. Have another go...?`);
    if(round > 1) $winorlosemessage.append(`Unlucky ${name}! Your bets didn't match this time you lost £${totalWinnings}. Have another go...?`);
    $nextRound.html('Play again?').on('click', nextRound);
    $cashout.html('TopUp?').on('click', topUp);
    $amountHeader.html(`You have £${amount}`);
  }

  function topUp() {
    welcome();
    $winorlosemessage.html('');
    $welcomeMessage.html('How much would you like to top up?');
    $welcomeButton.on('click',(e) => {
      e.preventDefault();
      restart();
    });
  }
  // 
  // function cashoutGif() {
  //   $giphy.show();
  //   // $fullScreen.show();
  //   // $welcomePopup.hide();
  //   // $firstPopup.hide();
  // }

  function nextRound() {
    restart();
    if(round === 1) timer = 2;
    if(round > 1) {
      timer = 10;
      amount = (amountAdded - total) + totalWinnings;
      $amountHeader.html(`You Have £${amount}`);
      $winningsScreen.html(totalWinnings);
      $body.addClass('bg2');
      $numButtons.show();
      $circle.removeClass('hidden');
      $bonusCircle.hide();
      $spinner.removeClass('has-eight').addClass('has-twelve');
      $colorHeader.html('Select color and range!');
    }
    if(round > 2) {
      $body.removeClass('bg2').addClass('bg3');
      timer = 10;
      $bonusCircle.show();
      $greenButton.show();
      // $addWinner.html(`${name}: 30`);
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
    $colorButtons.show();
    $colorHeader.show();
    // countdown();
  });

  // which color is chosen
  $colorButtons.on('click', (e) => {
    if(!name) return false; //what does return false actually do
    choice = $(e.target).val();
    $colorChoice.show();
    $colorHeader.removeClass('flash');
    $colorChoice.html(`${name} chose ${choice}`);
    if(round > 1 && choiceNum) {
      $tableHeader.toggleClass('flash');
    } else if (round === 1) {
      $tableHeader.toggleClass('flash');
    }
  });

  // which num is chosen
  $numButtons.on('click', (e) => {
    if(!name) return false;
    if(choice === 'Green') return false;
    choiceNum = $(e.target).val();
    $colorHeader.removeClass('flash');
    $colorChoice.show().html(`${name} chose ${choice} and ${choiceNum}`);
    if(choice && choiceNum) $tableHeader.toggleClass('flash');
  });

  function updateBet(e) {
    if(
      $(e.target).hasClass('add') &&
      amount > 0 &&
      total < amount
    ) total = total + 10;
    else if($(e.target).hasClass('remove') && total > 0) total = total - 10;
    else if($(e.target).hasClass('reset')) total = 0;

    $totalBet.text(total);
    $betsMessage.html(`${name} placed ${total} bets on ${choice}`);
    $tableHeader.removeClass('flash');
  }

  // Reset
  $betCalc.click(updateBet);
}

$(init);
