window.addEventListener('load', () => {
    const Game = new IronHarch('ironHarchCanvas')

    // Home music
    Game.homeMusic(true)

    const canvasBoard = document.getElementById('canvasBoard')
    const restartBtn = document.getElementById('restartGame')
    const pauseGame = document.getElementById('pauseGame')
    const startGame = document.getElementById('startGame')
    const resumeGame = document.getElementById('resumeGame')
    const archeroImg = document.querySelector('.hero-img')

    // Game Start
    startGame.addEventListener('click', () => startGameFunc())

    // Game Buttons listeners
    document.addEventListener('keydown', event => {
        Game.onKeyEvent(event)
    })
    
    document.addEventListener('keyup', event => {
        Game.onKeyEvent(event)
    })


    // Pause Game
    pauseGame.addEventListener('click', () => pauseGameFunc())
    // Resume Game btn1
    restartBtn.addEventListener('click', () => resumeGameFunc())
    // Resume Game btn 2
    resumeGame.addEventListener('click', () => resumeGameFunc())
    

    // Start, Pause & Resume functions
    let startGameFunc = () => {
        canvasBoard.style.display = 'block'
        startGame.style.display = 'none'
        Game.start()
        Game.createLevel()
        pauseGame.style.display = 'inline'
        archeroImg.style.display = 'none'
    }
    let resumeGameFunc = () => {
        Game.start()
        pauseGame.style.display = 'inline'
        restartBtn.style.display = 'none'
        resumeGame.style.display = 'none'
    }
    let pauseGameFunc = () => {
        Game.stop()
        Game.intervalId = undefined
        pauseGame.style.display = 'none'
        restartBtn.style.display = 'inline'
        resumeGame.style.display = 'inline'
    }
})