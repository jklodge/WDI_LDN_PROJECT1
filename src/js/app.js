function init() {


// need to start with the first list on active with maybe a 500ms delay

// then loop through maybe using next changing the active status

// then loop back round maybe using set interval every 1 second like timer doing the function you set it like

//
//
// const countdown = document.querySelector('.octagon');
// const screen = document.getElementsByClassName('screen')[1];
// let timer = 30;
// let timerIsRunning = false;
// let timerID = null;
// function runTimer() {
//   if(!timerIsRunning) {
//     timerID = setInterval(function(){
//       screen.innerHTML = --timer;
//       if(timer === 0) {
//         clearInterval(timerID);
//         alarm.classList.toggle('ringing');
//         // timer = 10; // or if button clicked
//       }
//
//     },1000);
//     timerIsRunning = true;
//   } else {
//     clearInterval(timerID);
//     timerIsRunning = false;
//   }
// }

const $countdown = $('.screen');


$countdown.on('click', (e)=> {
  $countdown.toggleClass('pulse');
  $circle.toggleClass('ringing');

  e.target
  console.log('hello');
});
}
window.addEventListener('DOMContentLoaded', init);
