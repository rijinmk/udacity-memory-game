/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var starcheck = 3;
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// function shuffle_cards(){
//   var ri = shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
//   var all_cards = document.querySelectorAll('.card');
//   $('.deck').html('');
//   for(var i=0; i<ri.length; i++){
//     $('.deck').append(all_cards[ri[i]]);
//   }
// }
//
// shuffle_cards();

function shuffle_cards(){
  var ri = shuffle([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
  var cards_class = document.querySelectorAll('.deck .card .fa');
  // var cards = document.querySelectorAll('.deck .card');
  var cards_class_list = []; 
  for(var i=0; i<cards_class.length; i++){
    cards_class_list.push(cards_class[i].classList.value.split(' ')[1]);
  }
  for(var i = 0; i < cards_class.length; i++) {
    console.log('OLD');
    console.log(cards_class[i]);
    for(var j = 0; j < cards_class_list.length; j++) {
      console.log(cards_class[i].classList.remove(cards_class_list[j]));
    }
    cards_class[i].classList.add(cards_class_list[ri[i]]);
    console.log('NEW');
    console.log(cards_class[i]);
  }
}

shuffle_cards();

var click_counter = 0;
var moves = 0;
var h = [];
var now, end, matches;

function notMatch(clicked_cards){         //cards not match
  console.log(clicked_cards);
  clicked_cards[0].removeClass('open show');
  clicked_cards[1].removeClass('open show');
  h = [];
  click_counter = 0;
}

var tempCounter = 0;
var gameTimer = 0;
var end_this_time;
var start_timer;
var start_timer_check = 0;

function startTimer(){
  var seconds = 0;        //timer start function
  var minutes = -1;
  start_timer = setInterval(function(){
    if(seconds%59==0){
      minutes++;
      seconds = 0;
    }
    seconds++;
    $('#timer').text(minutes+"m : "+seconds+"s");
  },1000);
}

function endTimer(){          //timer end function
  end_this_time = window.clearInterval(start_timer);
  // console.log("Game finished: Started at "+gameTimer+" and ended at "+myEndTimer+" and difference is "+diff);
  // console.log("Time taken = "+time);
}

function match(clicked_cards){        //card match
  clicked_cards[0].addClass('match');
  clicked_cards[1].addClass('match');
  clicked_cards[0].removeClass('open show');
  clicked_cards[1].removeClass('open show');
  matches = document.getElementsByClassName('match');
  if(matches.length === 16){
    endTimer();
    $('.modal-stars .stars').html('');
    for(var i=0; i<starcheck ; i++){
        $('.modal-stars .stars').append('<li><i class="fa fa-star"></i></li>');
    }
    $('#timer_result').text("Time taken: "+$('#timer').text());
    showScore();
  }
  h = [];
  click_counter = 0;
}

var flagstar1=0;
var flagstar2=0;

$('.card').click(function(){            //card click function
  if(start_timer_check==0){
    startTimer();
    start_timer_check = 1;
  }
  if($(this).attr('class') !== 'card open show'){
  if($(this).attr('class')!='card match'){
    h.push($(this));
    click_counter++;
    if(click_counter == 2){
      if(h[0][0] !== h[1][0]){
        var card_1 = h[0].children().attr('class').split(' ')[1];
        var card_2 = h[1].children().attr('class').split(' ')[1];
        moves++;
        $('.moves').text(moves);
        if(moves==12){
          $('#star-1').remove();
          flagstar1 = 1;
          starcheck--;
        }else if(moves==16){
          $('#star-2').remove();
          flagstar2 = 1;
          starcheck--;
        }
        if(card_1 === card_2){
          setTimeout(function(){match(h)},500);
        }else{
          setTimeout(function(){notMatch(h)},500);
        }
      }
    }

    $(this).toggleClass('open show');
  }
}
});

function showScore(){               //display of the modal after the game is over
  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];

  $('#modal-moves').text(moves);    //display moves in the modal

  if(starcheck==2){                //display stars in the modal
    $('#modalstar-1').remove();
  }else if(starcheck==1){
    $('#modalstar-2').remove();
  }

  modal.style.display = "block";

  span.onclick = function() {       //when close is clicked the modal closes
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  var rset = document.getElementById("restart");
}


function restartMoves(){
  moves=0;
  $('.moves').text('0');
}

$('.restart').click(function(){
  restartMoves();
  start_timer_check = 0;
  endTimer();
  starcheck = 3;
  $('#timer').text("0m : 0s");
  var stars_html = `<li><i id="star-1" class="fa fa-star"></i></li>
                    <li><i id="star-2" class="fa fa-star"></i></li>
                    <li><i id="star-3" class="fa fa-star"></i></li>`;
  shuffle_cards();
  $('ul.stars').html('');
  $('ul.stars').html(stars_html);
  $('.card').attr('class','card');
  
  var modal = document.getElementById('myModal');
  modal.style.display = "none";
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
