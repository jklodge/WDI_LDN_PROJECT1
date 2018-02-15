function init() {
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
  const $topUp = $('.topUp');
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
  const $firstPopup = $('.firstPopup');
  let $newBalance = 0;
  let choice = '';
  let choiceNum = '';
  let timer = 5;
  let totalBets = 0;
  let totalWinnings = 0;
  let name = '';
  let $winner = '';
  let $input = '';
  let round = 1;
  let amountAdded = 0;
  let amountInput = 0;
  let timerHasStarted = false;
  const $inputAm = $('.value');
  const $welcomeButton = $('.welcomeButton');
  let totalLoses = 0;


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

  // event listeners
  $welcomeForm.keypress(function (e) {
    e.preventDefault();
  });

  $welcomeButton.on('click',(e) => {
    e.preventDefault();
    amountInput = parseFloat($inputAm.val());
    $amountHeader.html(`You Have £${amountInput}`);
    console.log($inputAm.val());
    round = 1;
    $welcomePopup.hide();
    $fullScreen.hide();
    $nextroundButtons.show();
  });

  function amountTopup() {
    const topUp = parseFloat($inputAm.val());
    amountInput += topUp;
    console.log();
    $amountHeader.html(`You Have £${amountInput}`);
    console.log($inputAm.val());
    round = 1;
    $welcomePopup.hide();
    $fullScreen.hide();
    $nextroundButtons.show();
  }
  // countdown timer
  function countdown() {
    timerHasStarted = true;
    const timerId = setInterval(() => {
      console.log('countdown');
      if (timer === -1) {
        clearInterval(timerId);
        timerHasStarted = false;
        nomoreBets();
        // $tableHeader.removeClass('flash');
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
    $betsMessage.html(`${name} placed ${totalBets} bets on ${choice}`);
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
            // $tableHeader.removeClass('flash');
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
      $topUp.hide();
      console.log(`winnings are ${totalWinnings}`);
      console.log(`win equals round ${round}`);
      console.log(`win equals total ${totalBets}`);
      console.log(`win equals amountadded ${amountAdded}`);
      console.log(`win equals amount ${amountInput}`);
      win();
    } else if (round === 3 && $winner.hasClass(choice.toLowerCase())){
      win();
      $topUp.hide();
      totalWinnings = totalBets * 2 + totalWinnings;
      console.log(`winnings are ${totalWinnings}`);
    } else {
      lose();
      $topUp.show();
      if(round > 1 && totalWinnings >= totalBets) totalLoses = totalWinnings - totalBets;
      console.log(`whats total bets ${totalBets}`);
      console.log(`whats total bets ${totalWinnings}`);
    }

  }

  // restart the board calls the count down when color buttons are clicked
  function restart() {
    $nextroundButtons.show();
    $fullScreen.hide();
    $spinner.removeClass('flash');
    $circle.removeClass('flash');
    $nomore.hide();
    $winner.removeClass('yellowWin');
    totalBets = 0;
    $totalBet.text(totalBets);
    $winorlosemessage.html('');
    $betsMessage.hide();
    $enter.html(`Welcome back ${name}!`);
    $colorHeader.addClass('flash');
    $colorHeader.addClass('highlight');
    $betCalc.show().on('click');
  }

  function win() {
    $addtoLeader.append(`<p>${name}: ${round * 10}</p>`);
    $fullScreen.delay(3000).show(0);
    $allbuttons.prop('disabled', false);
    console.log(`what round ${round}`);
    if (round === 1)totalWinnings = (totalBets * 1.5);
    if (round === 2)totalWinnings = (totalBets * 1.7) + totalWinnings;
    if (round === 3)totalWinnings = (totalBets * 1.8) + totalWinnings;
    $winorlosemessage.html(`Congratualations ${name} you won £${totalWinnings}! You're through to Round ${round}!`);
    const message = (round === 3) ? 'Play again?' : 'Next Round';

    $nextRound.html(message).on('click', nextRound);
    $topUp.hide();
    if (amountInput >= 10)$cashout.html('Cashout?').on('click', cashoutGif);
    if (amountInput <10)$cashout.html.hide();
    // if(round === 3) cashoutGif();
  }

  function lose() {
    $fullScreen.delay(3000).show(0);
    $allbuttons.prop('disabled', false);
    $closedChest.show();
    $chest.hide();
    if(round === 1) $winorlosemessage.append(`Unlucky ${name}! Your bets didn't match this time you lost ${totalBets}. Have another go...?`);
    if(round > 1 && totalWinnings > 0) $winorlosemessage.append(`Unlucky ${name}! Your bets didn't match this time you lost £${totalBets} and have £${totalLoses} from the last round. Have another go...?`);
    $nextRound.html('Play again?').on('click', nextRound);
    $topUp.html('TopUp?').on('click', topUp);
    if (amountInput >= 10)$cashout.html('Cashout?').on('click', cashoutGif);
  }

  function cashoutGif() {
    $fullScreen.show();
    $welcomePopup.hide();
    $newBalance = 0;
    if(round === 4) {
      $firstPopup.show();
      $winorlosemessage.html(`Wow you are Lucky! Here's your winnings of £${totalWinnings}. We hope you come back soon!`);
    }
    $firstPopup.show();
    $winorlosemessage.html(`Here's your winnings of £${totalWinnings}. We hope you come back soon!`);
    $nextroundButtons.show();
    $cashout.hide();
    $nextRound.show();
    round = 1;
    $nextRound.html('Play again?').on('click', nextRound);
  }

  function topUp() {
    welcome();
    $winorlosemessage.html('');
    $welcomeMessage.html('How much would you like to top up?');
    $welcomeButton.on('click',(e) => {
      e.preventDefault();
      restart();
      amountTopup();
    });
  }


  function nextRound() {
    restart();
    if(round === 1) timer = 5;
    if(round > 1) {
      timer = 10;
      $amountHeader.html(`You Have £${$newBalance + totalWinnings}`);
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
      $addtoLeader.html(`${name}: 30`);
    }
  }

  $colorButtons.click(function() {
    $colorHeader.removeClass('flash');
    if(!timerHasStarted) countdown();
  });

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
  });

  // which color is chosen
  $colorButtons.on('click', (e) => {
    if(!name) return false; //what does return false actually do
    choice = $(e.target).val();
    $colorChoice.show();
    $colorHeader.removeClass('flash');
    $colorChoice.html(`${name} chose ${choice}`);
    if(round === 1 && choice) $tableHeader.toggleClass('flash');
  });

  // which num is chosen
  $numButtons.on('click', (e) => {
    if(!name) return false;
    if(choice === 'Green') return false;
    choiceNum = $(e.target).val();
    $colorHeader.removeClass('flash');
    $colorChoice.show().html(`${name} chose ${choice} and ${choiceNum}`);
    if(round > 1 && choiceNum) $tableHeader.toggleClass('flash');
  });

  function updateBet(e) {
    console.log(e.currentTarget);
    if(
      $(e.target).hasClass('add') &&
      amountInput > 0 &&
      totalBets < amountInput
    ) totalBets = totalBets + 10;
    else if($(e.target).hasClass('remove') && totalBets > 0) totalBets = totalBets - 10;
    else if($(e.target).hasClass('reset')) totalBets = 0;

    $newBalance = (amountInput - totalBets);
    $amountHeader.html(`You have £${$newBalance}`);
    $totalBet.text(totalBets);
    $betsMessage.html(`${name} placed ${totalBets} bets on ${choice}`);
    $tableHeader.toggleClass('flash');
  }

  // Reset
  console.log('assigning updateBet');
  $betCalc.click(updateBet);
}

$(init);
