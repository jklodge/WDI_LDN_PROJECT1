function init() {

  let player = null;
  let Xturn = true;
  const $display = $('#display');
  const $board = $('#board');
  const $screenbox = $('.screen');
  const $button = $('button');
  const $spinner = $('.circle-container');
  const $circle = $('.circle');
  const $timer = $('.timer');
  const $nomore = $('.message');
  const $getInitials = $('form');
  const $welcome = $('.answer');
  let choice = '';
  let timer = 5;
  let name = '';

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
          .toggleClass('pulse')
          .html(timer);
        timer--;
      }
    }, 1000);
  }

  function doSomething() {
    // alert('No more bets');
    $nomore.show();
    $button.prop('disabled', true);
    nextOne();
  }


  //move the class around $spinner
  // function nextOne() {
  //   let timesSpun = 0;
  //   const startSpinner = setInterval(() => {
  //     // const $lis = $('.circle-container > li');
  //     const $current = $('.topheader');
  //     let $next = $current.next();
  //     // if no next then we're at the end
  //     if( !$next.length ) {
  //       timesSpun++;
  //       $next = $current.parent().find('li:first'); // get the first li element in the parent
  //     }
  //     $next.addClass('.highlight');
  //     $current.removeClass('.highlight');
  //     if(timesSpun === 5) clearInterval(startSpinner);
  //   }, 1000);
  // }
  // move the class around the board
  function nextOne() {
    console.log('next');
    let timesSpun = 0;
    const $lis = $('.circle-container > li');
    let currentActive = 0;
    setInterval(function() {
      currentActive = (currentActive + 1) % $lis.length;
      $lis.removeClass('flash').eq(currentActive).addClass('flash');
    }, 150);
  }

  $getInitials.submit(function(e) {
    e.preventDefault();
    const $input = $('#initials');
    // const $name = $($input).val();
    name = $input.val();
    $input.val('');
    console.log(name);
    countdown();
  });

  // which color is chosen
  $button.on('click', (e) => {
    if(!name) return false;
    choice = $(e.target).val();
    console.log(choice);
    $welcome.html(`${name} you chose ${choice}`);
  });
}

$(init);
