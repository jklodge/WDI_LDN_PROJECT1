![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-30 Project 1 - Lucky Spin

For our first project, we were given four days to design and build an in-browser game using HTML, CSS and JavaScript (jQuery library used). Spinner was a consequence of a recent trip to Vegas, I wanted to put a fun twist on the roulette game. It requires the player to spin the board guessing whether it will land on red or blue, moving on to more difficult level if they win.

##### [Visit website](https://luckyspin.herokuapp.com/) for best playing experience (the game was not designed for mobile).

---

<p align="center"><img src="https://i.imgur.com/q6YfOg2.png" width="700"></p>

###### Level one gives the player 10 seconds to pick red or blue and place (fun(fake)) bets. Once the bets have been placed the board is frozen and the spinner starts. If it lands on the correct color the player can cash out or move on to the next level, else, they're asked if they would like to play again.


###### In level two, the difficulty increases as the player is given the choice of red or blue and odd or even.


```
if (round === 2){
  totalWinnings = (totalBets * 1.7) + totalWinnings;
  $winorlosemessage.html(`Congratualations ${name} you won £${totalWinnings}! You're through to Round ${round}!`);
}
```

###### If level 2 is beaten, the player is presented with a final cash out option and is able to play the game again.

---

I was pleased with the final product, which I feel looks good an plays well. The game could be developed into a larger game with new levels and challenges to further test the player’s luck.

<h4>Setup instructions</h4>
Clone or download the repo
Install dependencies with yarn install
Launch the app with gulp
NB: You will need to have installed gulp-cli globally
