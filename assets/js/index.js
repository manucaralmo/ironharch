window.addEventListener('load', () => {
    // Cont Game -> new game
    const Game = new IronHarch('ironHarchCanvas')

    Game.start()

    // Event listeners
    document.addEventListener('keydown', event => {
        Game.onKeyEvent(event)
    })
    
    document.addEventListener('keyup', event => {
        Game.onKeyEvent(event)
    })
})