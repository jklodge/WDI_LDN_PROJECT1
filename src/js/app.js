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
  const $getInitials = $('form');
  const $welcome = $('.answer');
  let choice = '';
  let timer = 5;
  let name = '';
  let $winner = '';
  let $input = '';


  $nomore.hide();
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
    $nomore.show();
    $allbuttons.prop('disabled', true);
    $('.final').html(`${name} placed ${total} bets on ${choice}`);
    nextOne();
    $spinner.toggleClass('spinning');
  }

  // move the class around the board
  function nextOne() {
    let currentActive = 0;
    let timesSpun = 0;
    const $lis = $('.circle-container > li');
    const startSpinner =  setInterval(function() {
      currentActive = (currentActive + 1) % $lis.length;
      $lis.removeClass('flash').eq(currentActive).addClass('flash');
      timesSpun += 1;
      if(timesSpun === Math.floor(Math.random() * 4) + 1){
        clearInterval(startSpinner);
        $spinner.removeClass('spinning');
        $winner = $lis.eq(currentActive);
        $winner.css({border: '5px solid #FFA500'});
        if(choice === 'Blue' && $winner.hasClass('odd')){
          $($addWinner).append(`${name}: 10`);
          console.log('You won');
        }else if (choice === 'Red' && $winner.hasClass('even')){
          $($addWinner).append(`${name}: 10`);
          console.log('You won');
        }else {
          console.log('YOU LOST');
        }
      }
    }, 180);
  }





  $getInitials.submit(function(e) {
    e.preventDefault();
    $input = $('#initials');
    $getInitials.hide();
    // const $name = $($input).val();
    name = $input.val().toUpperCase();
    $input.val('');
    console.log(name);
    countdown();
  });

  // which color is chosen
  $button.on('click', (e) => {
    if(!name) return false;
    choice = $(e.target).val();
    console.log(choice);
    $welcome.html(`${name} chose ${choice}`);
    // ('.topheader').toggleClass('flash');
  });

  let total = 0;
  $('.total').text(total);

  // When button is clicked
  $('.add').click(function(){
  //Add 10 to total
    total = total + 10;
    // Display total
    if(total >= 0) {
      $('.total').text(total);
      $('.final').html(`${name} placed ${total} bets on ${choice}`);
    }
  });

  //Subtract
  $('.remove').click(function(){
    total = total - 10;
    if(total >= 0) {
      $('.total').text(total);
      $('.final').html(`${name} placed ${total} bets on ${choice}`);
    }
  });

  // Reset
  $('.reset').click(function(){
    total = 0;
    $('.total').text(total);
    $('.final').html(`${name} placed ${total} bets on ${choice}`);
  });

  // $('.confirm').click(function(){
  //   $('.final').html(`${name} placed ${total} bets on ${choice}`);
  // });
}

$(init);
