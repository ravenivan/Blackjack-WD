// Build a BlackJack Game

// variables representing two cards 
let firstCard;
let secondCard;


let cards = []
let lastTries = localStorage.scores ? JSON.parse(localStorage.scores) : []
console.log(lastTries);
let lastOutcomes = []
let hasBlackJack = false
let isAlive = true
let messageEl = document.getElementById('message-el')
let sumEl = document.getElementById('sum-el')
let cardsEl = document.getElementById('cards-el')
let tries = document.getElementById('last-tries')
let outcomes = document.getElementById('last-outcomes')
let userName = document.getElementById('name-name')


let sum = 0;



const addTries = (score) => {
    if (lastTries.length != 4) {
        lastTries.push(score)
        localStorage.scores = JSON.stringify(lastTries)
    } else {
        lastTries[0] = lastTries[1]
        lastTries[1] = lastTries[2]
        lastTries[2] = lastTries[3]
        lastTries[3] = score
        localStorage.scores = JSON.stringify(lastTries)
        console.log(lastTries)
    }
}

const addOutcomes = () => {
    lastOutcomes = []
    lastTries.map((score) => {
        if (score != 21) {
            lastOutcomes.push("lose")
        } else {
            lastOutcomes.push("win")
        }
    })
}

const renderGame = () => {

    let cardsDisplay = "Cards:"

    cards.map((card) => {
        cardsDisplay += " " + card
    })

    cardsEl.innerHTML = cardsDisplay

    sumEl.innerHTML = `Sum: ${sum}`

    if (sum < 21) {
        messageEl.innerHTML = "Do you want to draw a new card? 🙂"
    } else if (sum == 21) {
        messageEl.innerHTML = "Wohoo! You've got Blackjack! 🥳"
        hasBlackJack = true
        isAlive = false
    } else {
        messageEl.innerHTML = "You're out of the game! 😭"
        isAlive = false
    }
}

const newCard = () => {
    if (isAlive) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}

const startGame = () => {
    if (sum != 0) {
        addTries(sum)
        addOutcomes()
        tries.innerHTML = "Last tries:"
        outcomes.innerHTML = "Last outcomes:"
        lastTries.map((score) => {
            tries.innerHTML += " " + score
        })
        lastOutcomes.map((outcome) => {
            outcomes.innerHTML += " " + outcome
        })
    }
    isAlive = true
    cards = []
    firstCard = getRandomCard()
    secondCard = getRandomCard()
    cards.push(firstCard)
    cards.push(secondCard)
    sum = firstCard + secondCard
    renderGame()
}

const getRandomCard = () => {
    let cardValue = Math.floor(Math.random() * 13) + 1
    if (cardValue == 1) {
        return 11;
    } else if (cardValue > 9) {
        return 10;
    } else {
        return cardValue;
    }
}

/* Local Storage */

const clearStorage = () => {
    let keepName = localStorage.username
    localStorage.clear()
    localStorage.username = keepName
    lastTries = []
    tries.innerHTML = "Last tries:"
    outcomes.innerHTML = "Last outcomes:"
    console.log("Cleared");
}

const changeName = () => {
    let nameInput = prompt("Enter your name: ")
    localStorage.username = nameInput
    userName.innerHTML = localStorage.username
}

if (localStorage.username) {
    userName.innerHTML = localStorage.username
} else {
    let nameInput = prompt("Enter your name: ")
    localStorage.username = nameInput
    userName.innerHTML = localStorage.username
}

if (localStorage.scores) {
    lastTries.map((score) => {
        tries.innerHTML += " " + score
    })
    addOutcomes()
    lastOutcomes.map((outcome) => {
        outcomes.innerHTML += " " + outcome
    })
}



