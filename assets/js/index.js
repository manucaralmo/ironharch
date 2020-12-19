window.addEventListener('load', () => {
    const Game = new IronHarch('ironHarchCanvas')

    const canvasBoard = document.getElementById('canvasBoard')
    const restartBtn = document.getElementById('restartGame')
    const pauseGame = document.getElementById('pauseGame')
    const startGame = document.getElementById('startGame')
    const archeroImg = document.querySelector('.hero-img')

    startGame.addEventListener('click', () => {
        canvasBoard.style.display = 'block'
        startGame.style.display = 'none'
        Game.start()
        Game.createLevel()
        pauseGame.style.display = 'inline'
        archeroImg.style.display = 'none'
    })



    // Event listeners
    document.addEventListener('keydown', event => {
        Game.onKeyEvent(event)
    })
    
    document.addEventListener('keyup', event => {
        Game.onKeyEvent(event)
    })


    // Pause Game
    pauseGame.addEventListener('click', () => {
        Game.stop()
        Game.intervalId = undefined
        pauseGame.style.display = 'none'
        restartBtn.style.display = 'inline'
    })
    // Resume Game
    restartBtn.addEventListener('click', () => {
        Game.start()
        pauseGame.style.display = 'inline'
        restartBtn.style.display = 'none'
    })
})