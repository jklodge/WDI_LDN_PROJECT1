function init() {

  let player = null;
  let Xturn = true;
  const $display = $('#display');
  const $board = $('.addLeader > p');
  const $addWinner = $('.addWinner');
  const $allbuttons = $('button');
  const $button = $('.btn-container');
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
  const $even = $('.evenButton');
  const $odd = $('.oddButton');
  const $bonusCircle = $('.bonus');
  const $highCircle = $('.high');
  const $body = $('body');
  let choice = '';
  let timer = 5;
  let total = 0;
  let name = '';
  let $winner = '';
  let $input = '';


  // $('body').css('background-image', 'url(https://i.imgur.com/AqqXtnq.jpg)');
  $fullScreen.hide();
  $nomore.hide();
  $even.hide();
  $odd.hide();
  $bonusCircle.hide();
  $highCircle.hide();
  // $( "ul li:nth-last-child(2)" ).remove( "<span> - 2nd to last!</span>" );
  // $('ul.circle-container li.high').remove();
  // countdown timer
  function countdown() {

    const timerId = setInterval(() => {
      if (timer === -1) {
        clearInterval(timerId);
        console.log('check');
        doSomething();
      } else {
        $timer
          .toggleClass('pulse').html(timer);
        timer--;
      }
    }, 1000);
  }

  function doSomething() {
    // alert('No more bets');
    $nomore.show().toggleClass('flash');
    $allbuttons.prop('disabled', true);
    $('.final').html(`${name} placed ${total} bets on ${choice}`);
    setTimeout(nextOne, 2000);
    // nextOne();
    // $spinner.toggleClass('spinning');
  }

  // move the class around the board
  function nextOne() {
    let currentActive = 0;
    let timesSpun = 0;
    const $lis = $('.circle-container > li');
    const ranNum = Math.floor(Math.random() * 8) + 5;
    const startSpinner =  setInterval(function() {
      console.log('ranNum', ranNum);
      currentActive = (currentActive + 1) % $lis.length;
      $lis.removeClass('flash').eq(currentActive).addClass('flash');
      timesSpun += 1;
      console.log('timesspun:', timesSpun);
      if(timesSpun === ranNum){
        clearInterval(startSpinner);
        $spinner.removeClass('spinning');
        $winner = $lis.eq(currentActive);
        $winner.toggleClass('.winner');
        if(choice === 'Blue' && $winner.hasClass('odd')){
          $($addWinner).append(`${name}: 10`);
          $nomore.show().removeClass('flash');
          console.log('You won');
          $fullScreen.delay(1000).show(0);
          $allbuttons.prop('disabled', false);
          $popup.append(`Congratualations ${name} you won! You're through to round two!`);
          $popButton.append('Next Round');
          $popButton.one('click', roundTwo);
        } else if (choice === 'Red' && $winner.hasClass('even')){
          $($addWinner).append(`${name}: 10`);
          $nomore.show().removeClass('flash');
          console.log('You won');
          $fullScreen.delay(1000).show(0);
          $allbuttons.prop('disabled', false);
          $popup.append(`Congratualations ${name} you won! You're through to round two!`);
          $popButton.append('Next Round');
          $popButton.one('click', roundTwo);
        }else {
          $nomore.show().removeClass('flash');
          console.log('YOU LOST');
          $fullScreen.delay(1000).show(0);
          $allbuttons.prop('disabled', false);
          $popup.append(`Unlucky ${name}! Your bets didn't match this time. Have another go...?`);
          $popButton.append('Play again?');
          $popButton.one('click', restart);
        }
      }
    }, 180);
  }
  // $popButton.click(function() {
  //   restart();
  // });

// round two
  function roundTwo() {
    restart();
    $body.addClass('bg2');
    $highCircle.show();
    $even.show();
    $odd.show();
    $spinner.removeClass('has-eight');
    $spinner.addClass('has-twelve');
    $($addWinner).append(`${name}: 20`);
  }

  // round three
  function roundThree() {
      restart();
      $highCircle.show();
      $even.show();
      $odd.show();
      $spinner.removeClass('has-eight');
      $spinner.addClass('has-twelve');
      $bonusCircle.show();
      $($addWinner).append(`${name}: 30`);
    }

  function restart() {
    $fullScreen.hide();
    // $submitForm[0].reset();
    // $submitForm.show();
    $nomore.hide();
    $chosenColor.hide();
    $winner.removeClass('.winner');
    total = 0;
    $('.total').text(total);
    $popup.html('');
    $popButton.html('');
    $('.final').hide();
    $enter.html(`Welcome back ${name}!`);
    console.log(name);
    timer = 5;
    $colorHeader.toggleClass('flash');
    $('.chooseColor').toggleClass('flash');
    if($button.click(function() {
      countdown();
      console.log('color button clicked');
    }))
      console.log('i clicked');
  }

  $submitForm.submit(function(e) {
    e.preventDefault();
    $input = $('#initials');
    $submitForm.hide();
    // const $name = $($input).val();
    name = $input.val().toUpperCase();
    $input.val('');
    console.log(name);
    $colorHeader.toggleClass('flash');
    $('.chooseColor').toggleClass('flash');
    countdown();
  });

  // which color is chosen
  $button.on('click', (e) => {
    if(!name) return false;
    choice = $(e.target).val();
    console.log(choice);
    $chosenColor.show();
    $chosenColor.html(`${name} chose ${choice}`);
    $('.topheader').toggleClass('flash');
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
