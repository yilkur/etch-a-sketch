const grid = document.querySelector('.grid')
const resetButton = document.querySelector('.reset')
const blackAndWhiteButton = document.querySelector('.black-and-white')
const randomButton = document.querySelector('.random')
const grayScaleButton = document.querySelector('.grayscale')

let colorMode = 'blackAndWhite'

const generateRandomRGB = () => {
  const randomNum = () => Math.floor(Math.random() * 256)

  let R = randomNum()
  let G = randomNum()
  let B = randomNum()

  return [R, G, B]
}

const increaseGrayscale = el => {
  const getColor = el.style.backgroundColor.match(/\d+/g)
  const color =  getColor ? getColor.map(Number) : [255, 255, 255]

  let red = color[0]
  let green = color[1]
  let blue = color[2]

  red = red >= 25.5 ? color[0] - 25.5 : red
  green = green >= 25.5 ? color[1] - 25.5 : green
  blue = green >= 25.5 ? color[2] - 25.5 : green

  return [red, green, blue]
}

const changeColor = el => {
  if (colorMode === 'blackAndWhite') {
    el.style.background = 'black'
  } else if (colorMode === 'random') {
    const randomRGB = generateRandomRGB()
    el.style.background = `rgb(${randomRGB[0]}, ${randomRGB[1]}, ${randomRGB[2]})`
  } else if (colorMode === 'grayscale') {
    const [red, green, blue] = increaseGrayscale(el)
    el.style.background = `rgb(${red}, ${green}, ${blue})`
  }
}

const createGrid = size => {
  const numberOfSquares = size * size
  
  for (let i = 0; i < numberOfSquares; i++) {
    let square = document.createElement('div')
    square.classList.add('square')

    grid.appendChild(square).addEventListener('mouseover', () => changeColor(square))
  }

  const allSquares = [...document.querySelectorAll('.square')]
  for (let i in allSquares) {
    allSquares[i].style.backgroundColor = 'white'
  }
}

createGrid(16) // initial 16 x 16 grid

// reset grid and create new grid with user chosen size
resetButton.addEventListener('click', () => {
  let gridSize = 0

  // limit size 
  while (gridSize < 1 || gridSize > 100) {
    gridSize = prompt('Please enter a size between 1 and lower or equal 100', 16)
  }
       
  grid.innerText = ''
  grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`

  createGrid(gridSize)
})

blackAndWhiteButton.addEventListener('click', () => {
  colorMode = 'blackAndWhite'
})

randomButton.addEventListener('click', () => {
  colorMode = 'random'
})

grayScaleButton.addEventListener('click', () => {
  colorMode = 'grayscale'
})
