
let deckId = ''
let player1Score = 0
let player2Score = 0
let winner = ''
document.querySelector('.draw').addEventListener('click', getFetch)
document.querySelector('.again').addEventListener('click', playAgain)

//Get the deck
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        deckId = data.deck_id
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

//Draw cards and game logic      
function getFetch(){
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        unMakeWarBig()
        unRotateCards()
        let val1 = Number(cardValue( data.cards[0].value ))
        let val2 = Number(cardValue( data.cards[1].value ))
        rotateCards()
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image
        if(val1 > val2){
          player1WinsRound()
        }else if(val1 < val2){
          player2WinsRound()
        }else{
          makeWarBig()
        }
        
        if (data.remaining === 0) {
          compareScores()
          declareWinner()
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function cardValue(val){
  if(val === "ACE"){
    return 14
  }else if (val === "KING"){
    return 13
  }else if(val === "QUEEN"){
    return 12
  }else if(val === "JACK"){
    return 11
  }else{
    return Number(val)
  }
}

function playAgain() {
  localStorage.clear()
  location.reload()
}

function compareScores() {
  if (player1Score > player2Score) {winner = 'Player 1 WON!'}
  else if (player1Score < player2Score) {winner = 'Player 2 WON!'}
  else {winner = 'DRAW!'}
}

function declareWinner() {
  document.querySelector('img').style.display = 'none'
  document.querySelector('button').style.display = 'none'
  document.querySelector('h3').innerText = winner
  document.querySelector('h3').style.fontSize = 'clamp(4rem, 10vw, 8rem)'
  document.querySelector('h3').style.margin = '0, auto'
  document.querySelector('.player-area').style.display = 'none'
  document.querySelector('.again').style.display = 'block'
}

function player1WinsRound() {
  player1Score+= 2
  document.querySelector('h3').innerText = 'Player 1 Scores!'
  document.querySelector('#player1Score').innerHTML = 'Player 1' + '<br>Score: ' + player1Score
}

function player2WinsRound() {
  player2Score+= 2
  document.querySelector('h3').innerText = 'Player 2 Scores!'
  document.querySelector('#player2Score').innerHTML = 'Player 2' + '<br>Score: ' + player2Score
}

//add random small rotation to each card
function rotateCards() {
  let a = Math.random() * 20
  let b = Math.random() * -17
  document.querySelector('#player1').style.transform = `rotate(${a}deg)`;
  document.querySelector('#player2').style.transform = `rotate(${b}deg)`;
};
function unRotateCards() {
  document.querySelector('#player1').style.transform = '';
  document.querySelector('#player2').style.transform = '';
}

//Transform text when WAR happens
function makeWarBig() {
  document.querySelector('h3').innerText = 'WAR!'
  document.querySelector('h3').style.fontSize = 'clamp(4rem, 11vw, 13rem)'
  document.querySelector('h3').style.fontFamily = '"Kolker Brush", cursive'
  document.querySelector('h3').style.color = 'red'
}
function unMakeWarBig() {
  document.querySelector('h3').style.fontFamily = '"Open Sans", sans-serif'
  document.querySelector('h3').style.color = 'azure'
  document.querySelector('h3').style.fontSize = 'clamp(1rem, 5vw, 4rem)'
}