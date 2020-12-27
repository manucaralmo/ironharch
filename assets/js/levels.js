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
*  3. Type - img (1, 3, 4, 5, 6)
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
            [41, 0, false, 115, 50, 1, 150, 'redBallSprite', 16, 5],
            [167, 0, false, 115, 50, 1, 150, 'redBallSprite', 16, 5],
            [300, 0, false, 115, 50, 1, 150, 'redBallSprite', 16, 5],
        ],
        obstacles: [
            [90, 325, 'rock'],
            [90, 360, 'rock'],
            [90, 395, 'rock'],
            [90, 430, 'rock'],
            [275, 325, 'rock'],
            [275, 360, 'rock'],
            [275, 395, 'rock'],
            [275, 430, 'rock']
        ]
    },
    // NIVEL 4
    4: {
        enemies: [
            [95, 200, false, 115, 50, 1, 100, 'blueDiamondSprite', 16, 6],
            [220, 200, false, 115, 50, 1, 100, 'blueDiamondSprite', 16, 6],
            [41, 0, true, 115, 50, 1, 150, 'redBallSprite', 16, 5],
            [167, 0, true, 115, 50, 1, 150, 'redBallSprite', 16, 5],
            [300, 0, true, 115, 50, 1, 150, 'redBallSprite', 16, 5],
        ],
        obstacles: [
            [90, 325, 'rock'],
            [90, 360, 'rock'],
            [90, 395, 'rock'],
            [90, 430, 'rock'],
            [275, 325, 'rock'],
            [275, 360, 'rock'],
            [275, 395, 'rock'],
            [275, 430, 'rock']
        ]
    },
    // NIVEL 5
    5: {
        enemies: [
            [41, 200, false, 100, 50, 1, 115, 'blueDiamondSprite', 16, 6],
            [167, 200, false, 50, 50, 1, 115, 'blueDiamondSprite', 16, 6],
            [300, 200, false, 100, 50, 1, 115, 'blueDiamondSprite', 16, 6],
        ],
        obstacles: [
            [90, 325, 'rock'],
            [90, 360, 'rock'],
            [90, 395, 'rock'],
            [90, 430, 'rock'],
            [275, 325, 'rock'],
            [275, 360, 'rock'],
            [275, 395, 'rock'],
            [275, 430, 'rock']
        ]
    },
    // NIVEL 6
    6: {
        enemies: [
            [41, 200, false, 100, 50, 1, 115, 'blueDiamondSprite', 16, 6],
            [167, 200, false, 50, 50, 1, 115, 'blueDiamondSprite', 16, 6],
            [300, 200, false, 100, 50, 1, 115, 'blueDiamondSprite', 16, 6],
        ],
        obstacles: [
            [35, 320, 'rock'],
            [70, 320, 'rock'],
            [105, 320, 'rock'],
            [260, 320, 'rock'],
            [295, 320, 'rock'],
            [330, 320, 'rock'],
        ]
    },
    // NIVEL 7
    7: {
        enemies: [
            [41, 200, true, 100, 50, 1, 115, 'blueDiamondSprite', 16, 6],
            [167, 200, false, 50, 50, 1, 115, 'blueDiamondSprite', 16, 6],
            [300, 200, true, 100, 50, 1, 115, 'blueDiamondSprite', 16, 6],
        ],
        obstacles: [
            [35, 320, 'rock'],
            [70, 320, 'rock'],
            [105, 320, 'rock'],
            [260, 320, 'rock'],
            [295, 320, 'rock'],
            [330, 320, 'rock'],
        ]
    },
    // NIVEL 8
    8: {
        enemies: [
            [46, 200, false, 100, 50, 1, 115, 'blueDiamondSprite', 16, 6],
            [300, 300, false, 100, 50, 1, 115, 'blueDiamondSprite', 16, 6],
            [300, 175, false, 100, 50, 1, 115, 'blueDiamondSprite', 16, 6],
        ],
        obstacles: [
            [120, 270, 'rock'],
            [120, 305, 'rock'],
            [120, 340, 'rock'],
            [120, 375, 'rock'],
            //
            [260, 410, 'rock'],
            [295, 410, 'rock'],
            [330, 410, 'rock'],
            [225, 410, 'rock'],
            [190, 410, 'rock'],
            [155, 410, 'rock'],
            [120, 410, 'rock'],
        ]
    }
}