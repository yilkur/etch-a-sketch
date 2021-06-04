const grid = document.querySelector('.grid')
const resetButton = document.querySelector('button')

const changeColor = el => el.style.background = 'red'

const createGrid = size => {
  const numberOfSquares = size * size
  
  for (let i = 0; i < numberOfSquares; i++) {
    let square = document.createElement('div')
    square.classList.add('square')

    grid.appendChild(square).addEventListener('mouseover', () => changeColor(square))
  }

  const allSquares = document.querySelectorAll('.square')
  for (let i in allSquares) {
    allSquares[i].style.backgroundColor = 'royalblue'
  }
}

createGrid(16) // initial 16 x 16 grid


// reset grid and create new grid with user chosen size
resetButton.addEventListener('click', () => {
  let gridSize = 0

  // limit size 
  while (gridSize < 1 || gridSize > 100) {
    gridSize = prompt('Please enter a size between 1 and lower or equal 100')
  }
       
  grid.innerText = ''
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`

  createGrid(gridSize)
})
