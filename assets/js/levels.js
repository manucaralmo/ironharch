/* ==== PARAMETERS ====
************************
* ENEMIES
************************
*   1. x
*   2. y
*   3. isMoving
*   4. shootingInterval
*   5. shotPower
*   6. collisionPower
*   7. health
*   8. Weapon - Bullet
*   9. Bullet Size
************************

************************
* OBSTACLES
************************
*  1. x
*  2. y
*  3. Type - img
************************
* ==================== */

const LEVELS = {
    // NIVEL 1
    1: {
        enemies: [
            [80, 130, false, 90, 50, 1, 70, 'redBallSprite', 16],
            [160, 130, false, 90, 50, 1, 70, 'redBallSprite', 16],
            [230, 130, false, 90, 50, 1, 70, 'redBallSprite', 16],
        ],
        obstacles: [
            [80, 325, 'rock'],
            [275, 325, 'rock']
        ]
    },
    // NIVEL 2
    2: {
        enemies: [
            [0, 0, true, 115, 50, 1, 100, 'blueLightSprite', 22],
            [120, 0, true, 115, 50, 1, 100, 'blueLightSprite', 22]
        ],
        obstacles: [
            [80, 325, 'rock'],
            [275, 325, 'rock']
        ]
    },
    // NIVEL 3
    3: {
        enemies: [
            [0, 0, false, 115, 50, 1, 100, 'blueDiamondSprite', 16],
            [120, 0, false, 115, 50, 1, 100, 'blueDiamondSprite', 16]
        ],
        obstacles: [
            [80, 325, 'rock'],
            [275, 325, 'rock']
        ]
    },
    // NIVEL 4
    4: {
        enemies: [
            [0, 0, false, 115, 50, 1, 100, 'blueDiamondSprite', 16],
            [120, 12, false, 115, 50, 1, 100, 'blueDiamondSprite', 16],
            [120, 100, false, 115, 50, 1, 100, 'blueDiamondSprite', 16],
            [120, 200, false, 115, 50, 1, 100, 'blueDiamondSprite', 16]
        ],
        obstacles: [
            [80, 325, 'rock'],
            [275, 325, 'rock']
        ]
    }
}