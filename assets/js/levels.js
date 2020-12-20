// LEVELS

/* ==== PARAMETERS ====
*   1. x
*   2. y
*   3. isMoving
*   4. shootingInterval
*   5. shotPower
*   6. collisionPower
*   7. health
*   8. Weapon - Bullet
*   9. Bullet Size
* ==================== */

const LEVELS = {
    // NIVEL 1
    1: {
        enemies: [
            [80, 130, false, 90, 50, 1, 50, 'redBallSprite', 16],
            [160, 130, false, 115, 50, 1, 50, 'redBallSprite', 16],
            [240, 130, false, 115, 150, 1, 50, 'redBallSprite', 16],
            [150, 130, true, 155, 50, 1, 50, 'redBallSprite', 16],
            [250, 130, true, 155, 50, 1, 50, 'redBallSprite', 16],
        ]
    },
    // NIVEL 2
    2: {
        enemies: [
            [0, 0, true, 115, 50, 1, 200, 'redDiamondSprite', 16],
            [120, 0, true, 115, 50, 1, 200, 'redDiamondSprite', 16],
            [220, 0, true, 115, 50, 1, 200, 'redDiamondSprite', 16],
        ]
    },
    // NIVEL 3
    3: {
        enemies: [
            [800, 350, true, 115, 50, 1, 200],
            [270, 350, false, 115, 50, 1, 200],
            [80, 150, true, 115, 50, 1, 200],
            [800, 350, false, 115, 50, 1, 200],
            [270, 350, false, 115, 50, 1, 200],
            [80, 150, false, 115, 50, 1, 200],
        ]
    }
}