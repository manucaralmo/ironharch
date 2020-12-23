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
            
        ]
    },
    // NIVEL 2
    2: {
        enemies: [
            [0, 0, true, 115, 50, 1, 100, 'blueDiamondSprite', 16],
            [120, 0, true, 115, 50, 1, 100, 'blueDiamondSprite', 16]
        ]
    },
    // NIVEL 3
    3: {
        enemies: [
            [0, 0, false, 115, 50, 1, 100, 'blueDiamondSprite', 16],
            [120, 0, false, 115, 50, 1, 100, 'blueDiamondSprite', 16]
        ]
    },
    // NIVEL 4
    4: {
        enemies: [
            [0, 0, false, 115, 50, 1, 100, 'blueDiamondSprite', 16],
            [120, 0, false, 115, 50, 1, 100, 'blueDiamondSprite', 16]
        ]
    }
}