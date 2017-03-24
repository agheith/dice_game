/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

scores = [0,0]; //stores the score for both players
roundScore = 0;
activePlayer = 0;

//The dice- we need to calculate a random number. Math.random() Math.floor(Math.random()*6)+1

//dice = Math.floor(Math.random()*6)+1 ..moved inside the addEventListener function, I need it only when a user clicks

//--------------------------------------------------

//            DOM MANIPULATION

//--------------------------------------------------

// .querySelector---> select stuff exactly the way we do it in CSS, it only selects the first element it finds

// document.querySelector('#current-' + activePlayer).textContent = dice; //This MANIPULATION changed values in the page

document.querySelector('.dice').style.display = "none";

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


//--------------------------------------------------
//                  EVENTS

//Notifications that are sent to notify the code that something happened on the webpage.
//examples - clicking a button, resizing a window, scrolling down or pressing a key.
//Event  listener - A function that preforms an action on a certain event. It waits for a specific event to happen
// An event listenr reacts to an even.

// How do events process?
// Execution stack - an event can be processed as soon as the execution stack is empty, which means all the functions have returned.
// The message queue - where all events that happened in the browser are put, they sit there waiting to be processed.
// Only happens when the execution stack is empty.

//--------------------------------------------------
/*
1- How to set up an event handler.
2- What a callback function is;
3- What an anonymous function is;
4-Another way to select elements by ID;
5-How to change the image in an <img> element
*/
//--------------------------------------------------

--> //selct the element where the even is gona happen


document.querySelector('.btn-roll').addEventListener('click', function(){
    //do something here...

    //1. Random number
    var dice = Math.floor(Math.random()*6)+1  //declared it cuz It is used inside, not globally

    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block'; //This brings back the dice from a 'none'
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Update the roundscore but only IF the rolled number was not a 1. If rolled 1, the player loses
    if (dice !== 1){
        //Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore; //This MANIPULATION changed values in the page. Display it in the interface
        //roundScore = roundScore + dice;
    } else{
        //Next player
        nextPlayer();
    }

});

//--------------------------------------------------
//                  UPDATE SCORE
//              CHANGING THE ACTIVE PLAYER
//--------------------------------------------------

// The Event listenr function can call the function (e.g addEventListener('click', btn)
//I can call the function inside the addEventListener function, that's called an anonymous function.
//a function that doesnt have a name, and cannot be reused.



//--------------------------------------------------
//             SET UP THE EVENT LISTENERS
//
//--------------------------------------------------

document.querySelector('.btn-hold').addEventListener('click', function(){
    //What happens when the user clicks the button..
    //add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;


    //then update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


    //check if the player has won the game.
    if(scores[activePlayer] >= 100){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    } else {
        //Next Player
        nextPlayer();
    }

});


function nextPlayer() {
    //Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;// Ternary Operator
    // if(activePlayer === 0){
    //  activePlayer = 1;
    //} else {
    //  activePlayer = 0:
    //}
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = "none"; //This hides the dice when a player rolls 1.
}
