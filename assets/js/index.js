window.addEventListener('load', () => {
    // ==========================================
    // START GAME
    // ==========================================
    const Game = new IronHarch('ironHarchCanvas')

    const canvasBoard = document.getElementById('canvasBoard')
    const restartBtn = document.getElementById('restartGame')
    const pauseGame = document.getElementById('pauseGame')
    const startGame = document.getElementById('startGame')
    const resumeGame = document.getElementById('resumeGame')
    const archeroImg = document.querySelector('.hero-img')
    const mainGameBlock = document.getElementById('mainGame')
    const openCanvasBtn = document.getElementById('openCanvas')
    const introGame = document.getElementById('intro')


    // Background Selector
    // ==========================================
    const map1 = document.getElementById('map-1')
    const map2 = document.getElementById('map-2')
    const map3 = document.getElementById('map-3')
    let bg = 1 // Default background

    map1.addEventListener('click', () => {
        map1.classList.remove('opacity-img');
        map2.classList.add('opacity-img');
        map3.classList.add('opacity-img');
        bg = 1
    })

    map2.addEventListener('click', () => {
        map1.classList.add('opacity-img');
        map2.classList.remove('opacity-img');
        map3.classList.add('opacity-img');
        bg = 2
    })

    map3.addEventListener('click', () => {
        map1.classList.add('opacity-img');
        map2.classList.add('opacity-img');
        map3.classList.remove('opacity-img');
        bg = 3
    })

    // Create background
    const createBackground = () => {
        Game.createBackground(bg)
    }

    // Open game canvas
    openCanvasBtn.addEventListener('click', () => {
        introGame.style.display = "none"
        mainGameBlock.style.display = "block"
        // Create Background
        createBackground()
        // Solución al LAG en Safari
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        // Start Home Music
        Game.homeMusic(true)
    })


    // ==========================================
    // GAME START BTN
    // ==========================================
    startGame.addEventListener('click', () => startGameFunc())

    // ==========================================
    // COMPUTER EVENTS
    // ==========================================
    document.addEventListener('keydown', event => {
        Game.onKeyEvent(event)
    })
    document.addEventListener('keyup', event => {
        Game.onKeyEvent(event)
    })

    
    // ==========================================
    // Start, Pause & Resume functions
    // ==========================================
    // Pause Game
    pauseGame.addEventListener('click', () => pauseGameFunc())
    // Resume Game btn1
    restartBtn.addEventListener('click', () => resumeGameFunc())
    // Resume Game btn 2
    resumeGame.addEventListener('click', () => resumeGameFunc())

    const startGameFunc = () => {
        canvasBoard.style.display = 'block'
        startGame.style.display = 'none'
        Game.start()
        Game.changingLevel = true
        Game.selectAdvantage()
        pauseGame.style.display = 'inline'
        archeroImg.style.display = 'none'

        // Debug
        //Game.debug()
    }
    const resumeGameFunc = () => {
        Game.start()
        pauseGame.style.display = 'inline'
        restartBtn.style.display = 'none'
        resumeGame.style.display = 'none'
    }
    const pauseGameFunc = () => {
        Game.stop()
        Game.intervalId = undefined
        pauseGame.style.display = 'none'
        restartBtn.style.display = 'inline'
        resumeGame.style.display = 'inline'
    }


    const checkScreen = () => {
        if ("ontouchstart" in window || navigator.msMaxTouchPoints) { 
            return true; 
        } else { 
            return false; 
        } 
    }

    if(checkScreen()){
        alert('Por el momento, este juego sólo es compatible en dispositivos con teclado')
        window.location = 'no-compatible.html'
    }

})