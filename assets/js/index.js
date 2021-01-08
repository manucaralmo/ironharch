window.addEventListener('load', () => {

    // PRELOADER
    setTimeout(() => {
        document.querySelector('.i-preloader').style.display = 'none'
    }, 3000)

    // PRELOAD IMGS
    let imgs = [
        "assets/images/enemies/enemy-1.png",
        "assets/images/enemies/enemy-3.png",
        "assets/images/enemies/enemy-4.png",
        "assets/images/enemies/enemy-5.png",
        "assets/images/enemies/enemy-6.png",
        "assets/images/player/player-1.png",
        "assets/images/player/player-2.png",
    ]

    let images = new Array()
    imgs.forEach((img, id) => {
        try {
            images[id] = new Image()
            images[id].src = img
        } catch (error) {
            console.log(error)
        }
    })
    // ==========================================


    // GAME CONFIG
    const gameConfig = {
        coinsPocket: localStorage.getItem("IronHarchCoins"),
        players: {
            player1: true,
            player2: false
        },
        backgrounds: {
            background1: true,
            background2: localStorage.getItem("background2") || false,
            background3: localStorage.getItem("background3") || false
        },
        playerName: localStorage.getItem("IronHarchPlayerName") || undefined
    }
    // ==========================================


    const Game = new IronHarch('ironHarchCanvas') // Create game
    const canvasBoard = document.getElementById('canvasBoard')
    const archeroImg = document.querySelector('.hero-img')

    // Buttons
    const startGame = document.getElementById('startGame')
    const restartBtn = document.getElementById('restartGame')
    const pauseGame = document.getElementById('pauseGame')
    const resumeGame = document.getElementById('resumeGame')
    const openCanvasBtn = document.getElementById('openCanvas')
    const buyBackground2 = document.getElementById('buy-background2')
    const buyBackground3 = document.getElementById('buy-background3')
    const soundBtn = document.getElementById('soundBtn')
    const player2select = document.getElementById('player2select')
    const player1select = document.getElementById('player1select')
    const map1 = document.getElementById('map-1')
    const map2 = document.getElementById('map-2')
    const map3 = document.getElementById('map-3')

    // Screens
    const introGame = document.getElementById('intro')
    const mainGameBlock = document.getElementById('mainGame')
    const resumeScreen = document.getElementById('resumeScreen')
    const loseScreen = document.getElementById('loseScreen')
    const winScreen = document.getElementById('winScreen')
    const newBestScreen = document.getElementById('newBestScreen')
    const instrucciones = document.getElementById('instrucciones')
    const nameInput = document.getElementById('nameInput')
    const nameSet = document.getElementById('nameSet')

    // Text & info
    const levelToScreen = document.getElementById('levelToScreen')
    const levelToScreenLose = document.getElementById('levelToScreenLose')
    const levelToScreenWin = document.getElementById('levelToScreenWin')

    // MODALS
    const theCapital = new bootstrap.Modal(document.getElementById('theCapital'))
    const castilloPerdido = new bootstrap.Modal(document.getElementById('castilloPerdido'))

    // INPUTS
    const playerName = document.getElementById('playerName')
    // ==========================================


    // ======================================================
    // set Name
    // ======================================================
    if(gameConfig.playerName !== undefined){
        document.getElementById('gameInfo').style.display = "block"
        document.getElementById('playerNamePrint').innerHTML = gameConfig.playerName
        document.getElementById('coins').innerHTML = localStorage.getItem("IronHarchCoins") || 0
        document.getElementById('best').innerHTML = localStorage.getItem("IronHarchRecord") || 0
        nameInput.style.display = 'none'
        nameSet.style.display = 'block'
    } else {
        document.getElementById('gameInfo').style.display = "none"
        nameInput.style.display = 'block'
        nameSet.style.display = 'none'
    }

    const setPlayerName = () => {
        if(playerName.value.trim().length > 0){
            localStorage.setItem("IronHarchPlayerName", playerName.value.trim())
            gameConfig.playerName = playerName.value.trim()
            return true
        } else if(gameConfig.playerName !== undefined) {
            return true
        } else {
            return false
        }
    }
    // ==========================================

    // ======================================================
    // Player selector
    // ======================================================
    let playerImg = 1
    player1select.addEventListener('click', () => {
        player1select.classList.remove('opacity-img');
        player2select.classList.add('opacity-img');
        playerImg = 1
    })
    player2select.addEventListener('click', () => {
        player1select.classList.add('opacity-img');
        player2select.classList.remove('opacity-img');
        playerImg = 2
    })
    // ==========================================

    // ======================================================
    // Background Selector
    // ======================================================
    let bg = 1 // Default background

    map1.addEventListener('click', () => {
        map1.classList.remove('opacity-img');
        map2.classList.add('opacity-img');
        map3.classList.add('opacity-img');
        bg = 1
    })
    map2.addEventListener('click', () => {
        if(gameConfig.backgrounds.background2){
            map1.classList.add('opacity-img');
            map2.classList.remove('opacity-img');
            map3.classList.add('opacity-img');
            bg = 2
        } else {
            theCapital.show()
        }
    })
    map3.addEventListener('click', () => {
        if(gameConfig.backgrounds.background3){
            map1.classList.add('opacity-img');
            map2.classList.add('opacity-img');
            map3.classList.remove('opacity-img');
            bg = 3
        } else {
            castilloPerdido.show()
        }
    })
    // ==========================================


    // ==========================================
    // IRONHARCH SHOP
    // ==========================================

    if(gameConfig.backgrounds.background2){
        map2.src = 'assets/images/backgrounds/2.png'
    }
    if(gameConfig.backgrounds.background3){
        map3.src = 'assets/images/backgrounds/3.png'
    }

    buyBackground2.addEventListener('click', () => {
        if(Game.coinsPocket >= 50){
            buyBackground2Func()
        } else {
            alert('No tienes monedas suficientes')
        }
    })
    let buyBackground2Func = () => {
        localStorage.setItem("IronHarchCoins", Game.coinsPocket - 50)
        localStorage.setItem("background2", true)
        window.location.reload()
    }

    buyBackground3.addEventListener('click', () => {
        if(Game.coinsPocket >= 150){
            buyBackground3Func()
        } else {
            alert('No tienes monedas suficientes')
        }
    })
    let buyBackground3Func = () => {
        localStorage.setItem("IronHarchCoins", Game.coinsPocket - 150)
        localStorage.setItem("background3", true)
        window.location.reload()
    }

    // ==========================================


    // ======================================================
    // START GAME
    // ======================================================
    openCanvasBtn.addEventListener('click', () => {
        if(setPlayerName()){
            introGame.style.display = "none" // Hide intro screen
            mainGameBlock.style.display = "block" // Show Canvas 
            // Create bg & player
            Game.createBackgroundandPlayer(bg, playerImg) // Create Background & player
            // Solución al LAG en Safari
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();
            Game.homeMusic(true) // Start Home Music
        }
    })


    // ==========================================
    // GAME START BUTTON
    // ==========================================
    startGame.addEventListener('click', () => startGameFunc())

    // ==========================================
    // KEYBOARD EVENTS
    // ==========================================
    document.addEventListener('keydown', event => {
        if(gameConfig.playerName !== undefined){ 
            Game.onKeyEvent(event)
        }
    })
    document.addEventListener('keyup', event => {
        if(gameConfig.playerName !== undefined){ 
            Game.onKeyEvent(event)
        }
    })

    
    // ==========================================
    // Start, Pause & Resume functions
    // ==========================================

    // Start Game
    const startGameFunc = () => {
        canvasBoard.style.display = 'block'
        startGame.style.display = 'none'
        Game.start()
        Game.changingLevel = true
        Game.selectAdvantage()
        pauseGame.style.display = 'inline'
        archeroImg.style.display = 'none'
        instrucciones.classList.toggle('instrucciones')
        //Game.debug() // Debug
    }
    // Resume Game
    const resumeGameFunc = () => {
        Game.start()
        pauseGame.style.display = 'inline'
        restartBtn.style.display = 'none'
        resumeScreen.style.display = 'none'
    }
    // Pause Game
    const pauseGameFunc = () => {
        Game.stop()
        Game.intervalId = undefined
        pauseGame.style.display = 'none'
        restartBtn.style.display = 'inline'
        resumeScreen.style.display = 'block'
    }

    // Pause Game Btn
    pauseGame.addEventListener('click', pauseGameFunc)
    // Resume Game btn1
    restartBtn.addEventListener('click', resumeGameFunc)
    // Resume Game btn 2
    resumeGame.addEventListener('click', resumeGameFunc)


    // ==========================================
    // EXTRA FUNCTIONS
    // ==========================================

    // TOGGLE SOUND BTN
    const toggleSound = () => {
        Game.sound ? Game.sound = false : Game.sound = true
    }
    soundBtn.addEventListener('click', toggleSound)

    // Check touchScreens & redirect
    if ("ontouchstart" in window || navigator.msMaxTouchPoints) { 
        setTimeout(() => {
            alert('Por el momento, este juego sólo es compatible en dispositivos con teclado')
            window.location = 'no-compatible.html' 
        }, 5000)
    }

})