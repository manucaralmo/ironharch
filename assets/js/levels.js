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
*   10. Enemy Image
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
            [80, 130, true, 90, 50, 1, 70, 'blueDiamondSprite', 16, 4],
            [160, 130, false, 90, 50, 1, 70, 'blueDiamondSprite', 16, 4],
            [230, 130, false, 90, 50, 1, 70, 'blueDiamondSprite', 16, 4],
        ],
        obstacles: [
            [35, 500, 'rock'],
            [70, 500, 'rock'],
            [105, 500, 'rock'],
            [140, 500, 'rock'],
            [330, 355, 'rock'],
            [295, 355, 'rock'],
            [260, 355, 'rock'],
            [225, 355, 'rock'],
        ]
    },
    // NIVEL 2
    2: {
        enemies: [
            [0, 0, true, 115, 50, 1, 100, 'blueDiamondSprite', 16, 4],
            [120, 0, true, 115, 50, 1, 150, 'redBallSprite', 16, 5]
        ],
        obstacles: [
            [35, 500, 'rock'],
            [70, 500, 'rock'],
            [105, 500, 'rock'],
            [140, 500, 'rock'],
            [330, 355, 'rock'],
            [295, 355, 'rock'],
            [260, 355, 'rock'],
            [225, 355, 'rock'],
        ]
    },
    // NIVEL 3
    3: {
        enemies: [
            [25, 0, false, 115, 50, 1, 150, 'redBallSprite', 16, 5],
            [120, 0, false, 115, 50, 1, 150, 'redBallSprite', 16, 5],
            [220, 0, false, 115, 50, 1, 150, 'redBallSprite', 16, 5],
        ],
        obstacles: [
            [80, 325, 'rock'],
            [275, 325, 'rock']
        ]
    },
    // NIVEL 4
    4: {
        enemies: [
            [0, 0, false, 115, 50, 1, 100, 'blueDiamondSprite', 16, 6],
            [120, 12, false, 115, 50, 1, 100, 'blueDiamondSprite', 16, 6],
            [120, 100, false, 115, 50, 1, 100, 'blueDiamondSprite', 16, 6],
            [120, 200, false, 115, 50, 1, 100, 'blueDiamondSprite', 16, 6]
        ],
        obstacles: [
            [80, 325, 'rock'],
            [275, 325, 'rock']
        ]
    }
}