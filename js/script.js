//here we are defining all the variables we will use to build this game
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [   // all the combos which you can use to win. ( since its an array, the first div/cell is 0)
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
]
const cellElements = document.querySelectorAll('[data-cell]') //here these variables are set to our divs using the document.querySelectorALL  and calling the "data-cell" tag (in an array[])
const board = document.getElementById('board')//  we are setting the variable to the id board in our HTML
const winningMessageElement = document.getElementById('winningMessage')// same here
const restartButton = document.getElementById('restartButton')//same here
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')// you get the idea...
let circleTurn // seting a variable
startGame()// start game function
restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false // you literally defined it here dumbass 
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
     cell.addEventListener('click', handleClick,{once: true})// i actually do not understand why circle is always false??
})
setBoardHoverCLass()
winningMessageElement.classList.remove('show')
}


function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS: X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){    //check for a win
       endGame(false)
    }else if (isDraw()) {         //check for a draw
        endGame(true)
    }else{                        // swap turns
        swapTurns()
        setBoardHoverCLass()
    }
    
}   

function endGame(draw) {
    if(draw){
  winningMessageTextElement.innerText = 'Draw!'
    }else {
        winningMessageTextElement.innerText = `${circleTurn ? "oh's ": "X's "}Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
} 

function placeMark(cell, currentClass){
cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverCLass() {
board.classList.remove(X_CLASS)
board.classList.remove(CIRCLE_CLASS)
if(circleTurn) {
    board.classList.add(CIRCLE_CLASS)
}else {
    board.classList.add(X_CLASS)
}
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })

    })

}