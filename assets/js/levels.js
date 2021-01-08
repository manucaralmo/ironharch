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
            [230, 130, false, 90, 50, 1, 70, 'blueDiamondSprite', 16, 4]
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
            [260, 410, 'rock'],
            [295, 410, 'rock'],
            [330, 410, 'rock'],
            [225, 410, 'rock'],
            [190, 410, 'rock'],
            [155, 410, 'rock'],
            [120, 410, 'rock'],
        ]
    },
    // NIVEL 9
    9: {
        enemies: [
            [46, 200, true, 70, 50, 1, 115, 'blueDiamondSprite', 16, 6],
            [300, 300, true, 70, 50, 1, 115, 'blueDiamondSprite', 16, 6],
            [300, 175, false, 40, 50, 1, 115, 'blueDiamondSprite', 16, 6],
        ],
        obstacles: [
            [120, 270, 'rock'],
            [120, 305, 'rock'],
            [120, 340, 'rock'],
            [120, 375, 'rock'],
            [260, 410, 'rock'],
            [295, 410, 'rock'],
            [330, 410, 'rock'],
            [225, 410, 'rock'],
            [190, 410, 'rock'],
            [155, 410, 'rock'],
            [120, 410, 'rock'],
        ]
    },
    // NIVEL 10 -- MONSTRUO 1
    10: {
        enemies: [
            [180, 200, false, 35, 50, 1, 500, 'blueDiamondSprite', 30, 3],
        ],
        obstacles: []
    },
    // NIVEL 11
    11: {
        enemies: [
            [46, 200, true, 70, 65, 1.1, 125, 'redBallSprite', 16, 5],
            [300, 300, true, 70, 65, 1.1, 125, 'redBallSprite', 16, 5],
            [300, 175, false, 40, 50, 1, 200, 'blueDiamondSprite', 16, 6],
        ],
        obstacles: []
    },
    // NIVEL 12
    12: {
        enemies: [
            [46, 200, true, 70, 65, 1.1, 145, 'blueDiamondSprite', 16, 4],
            [92, 300, true, 60, 75, 1.1, 125, 'redBallSprite', 16, 5],
            [200, 300, true, 70, 65, 1.1, 145, 'blueDiamondSprite', 16, 4],
        ],
        obstacles: [
            [35, 520, 'rock'],
            [70, 520, 'rock'],
            [105, 520, 'rock'],
            [260, 520, 'rock'],
            [295, 520, 'rock'],
            [330, 520, 'rock'],
        ]
    },
    // NIVEL 13
    13: {
        enemies: [
            [46, 200, false, 70, 65, 1.1, 145, 'blueDiamondSprite', 16, 4],
            [150, 200, false, 60, 75, 1.1, 125, 'redBallSprite', 16, 5],
            [250, 200, false, 70, 65, 1.1, 145, 'blueDiamondSprite', 16, 4],
            [80, 200, true, 60, 75, 1.1, 125, 'redBallSprite', 16, 5],
            [220, 200, true, 70, 65, 1.1, 145, 'blueDiamondSprite', 16, 4],
        ],
        obstacles: [
            [35, 520, 'rock'],
            [70, 520, 'rock'],
            [105, 520, 'rock'],
            [260, 520, 'rock'],
            [295, 520, 'rock'],
            [330, 520, 'rock'],
        ]
    },
    // NIVEL 14
    14: {
        enemies: [
            [90, 200, false, 115, 70, 1.1, 150, 'blueDiamondSprite', 16, 6],
            [265, 200, false, 115, 70, 1.1, 150, 'blueDiamondSprite', 16, 6],
            [41, 0, true, 115, 70, 1.1, 150, 'redBallSprite', 16, 5],
            [167, 0, true, 115, 70, 1.1, 150, 'redBallSprite', 16, 5],
            [300, 0, true, 115, 70, 1.1, 150, 'redBallSprite', 16, 5],
        ],
        obstacles: [
            [90, 290, 'rock'],
            [90, 325, 'rock'],
            [90, 360, 'rock'],
            [90, 395, 'rock'],
            [90, 430, 'rock'],
            [90, 465, 'rock'],
            [90, 500, 'rock'],
            [265, 290, 'rock'],
            [265, 325, 'rock'],
            [265, 360, 'rock'],
            [265, 395, 'rock'],
            [265, 430, 'rock'],
            [265, 465, 'rock'],
            [265, 500, 'rock'],
            [125, 500, 'rock'],
            [160, 500, 'rock'],
            [195, 500, 'rock'],
            [230, 500, 'rock'],
        ]
    },
    // NIVEL 15
    15: {
        enemies: [
            [90, 200, false, 110, 70, 1.1, 160, 'blueDiamondSprite', 16, 6],
            [265, 200, false, 110, 70, 1.1, 160, 'blueDiamondSprite', 16, 6],
            [41, 0, true, 110, 70, 1.1, 160, 'redBallSprite', 16, 5],
            [167, 0, true, 110, 70, 1.1, 160, 'redBallSprite', 16, 5],
            [300, 0, true, 110, 70, 1.1, 160, 'redBallSprite', 16, 5],
        ],
        obstacles: [
            [90, 290, 'rock'],
            [90, 325, 'rock'],
            [90, 360, 'rock'],
            [90, 395, 'rock'],
            [90, 430, 'rock'],
            [90, 465, 'rock'],
            [90, 500, 'rock'],
            [265, 290, 'rock'],
            [265, 325, 'rock'],
            [265, 360, 'rock'],
            [265, 395, 'rock'],
            [265, 430, 'rock'],
            [265, 465, 'rock'],
            [265, 500, 'rock']
        ]
    },
    // NIVEL 16
    16: {
        enemies: [
            [41, 0, false, 80, 80, 1.1, 200, 'redBallSprite', 16, 5],
            [167, 0, false, 80, 80, 1.1, 200, 'redBallSprite', 16, 5],
            [300, 0, false, 80, 80, 1.1, 200, 'redBallSprite', 16, 5],

            [167, 0, true, 115, 50, 1.1, 150, 'blueDiamondSprite', 16, 4],
            [300, 0, true, 115, 50, 1.1, 150, 'blueDiamondSprite', 16, 4],
        ],
        obstacles: [
            [35, 510, 'rock'],
            [70, 510, 'rock'],
            [105, 510, 'rock'],
            [140, 510, 'rock'],
            [175, 510, 'rock'],
            [210, 510, 'rock'],
            [245, 510, 'rock'],

            [330, 405, 'rock'],
            [295, 405, 'rock'],
            [260, 405, 'rock'],
            [225, 405, 'rock'],
            [190, 405, 'rock'],
            [155, 405, 'rock'],
            [120, 405, 'rock'],

            [35, 310, 'rock'],
            [70, 310, 'rock'],
            [105, 310, 'rock'],
            [140, 310, 'rock'],
            [175, 310, 'rock'],
            [210, 310, 'rock'],
            [245, 310, 'rock'],
        ]
    },
    // NIVEL 17
    17: {
        enemies: [
            [41, 0, false, 70, 80, 1.1, 200, 'redBallSprite', 16, 5],
            [167, 0, false, 70, 80, 1.1, 200, 'redBallSprite', 16, 5],
            [300, 0, false, 70, 80, 1.1, 200, 'redBallSprite', 16, 5],

            [167, 0, true, 115, 50, 1.1, 250, 'blueDiamondSprite', 16, 4],
            [300, 0, true, 115, 50, 1.1, 250, 'blueDiamondSprite', 16, 4],
        ],
        obstacles: []
    },
    // NIVEL 18
    18: {
        enemies: [
            [167, 0, true, 100, 50, 1.1, 250, 'blueDiamondSprite', 16, 6, 1.6],
            [300, 0, true, 300, 50, 1.1, 250, 'blueDiamondSprite', 16, 6, 1.6],
            [300, 400, true, 100, 50, 1.1, 250, 'blueDiamondSprite', 16, 6, 1.6],
            [167, 400, true, 200, 50, 1.1, 250, 'blueDiamondSprite', 16, 6, 1.6],
        ],
        obstacles: []
    },
    // NIVEL 19
    19: {
        enemies: [
            [167, 400, true, 200, 80, 1.1, 450, 'blueDiamondSprite', 16, 6, 1.9],
        ],
        obstacles: []
    },
    // NIVEL 20 -- MONSTRUO 2
    20: {
        enemies: [
            [100, 200, false, 35, 50, 1, 550, 'blueDiamondSprite', 30, 3],
            [250, 200, false, 30, 50, 1, 550, 'blueDiamondSprite', 30, 1],
        ],
        obstacles: []
    },
    // NIVEL 21
    21: {
        enemies: [
            [100, 200, true, 150, 80, 1.1, 450, 'blueDiamondSprite', 20, 1, 1.9],
            [200, 200, true, 200, 80, 1.1, 450, 'blueDiamondSprite', 20, 1, 1.9],
            [300, 200, true, 100, 80, 1.1, 450, 'blueDiamondSprite', 20, 1, 1.9],
        ],
        obstacles: []
    },
    // NIVEL 22
    22: {
        enemies: [
            [50, 200, false, 100, 80, 1.1, 450, 'blueLightSprite', 30, 1, 1.9],
            [100, 200, false, 100, 80, 1.1, 450, 'blueLightSprite', 30, 1, 1.9],
            [150, 200, false, 150, 80, 1.1, 450, 'blueDiamondSprite', 20, 1, 1.9],
            [200, 200, false, 100, 80, 1.1, 450, 'blueLightSprite', 30, 1, 1.9],
            [250, 200, false, 50, 80, 1.1, 450, 'blueDiamondSprite', 20, 1, 1.9],
            [300, 200, false, 50, 80, 1.1, 450, 'blueDiamondSprite', 20, 1, 1.9],
        ],
        obstacles: []
    },
    // NIVEL 23
    23: {
        enemies: [
            [50, 200, false, 100, 80, 1.1, 450, 'blueLightSprite', 30, 1, 1.9],
            [100, 200, false, 100, 80, 1.1, 450, 'blueLightSprite', 30, 1, 1.9],
            [150, 200, true, 150, 80, 1.1, 450, 'blueDiamondSprite', 20, 1, 1.9],
            [200, 200, false, 100, 80, 1.1, 450, 'blueLightSprite', 30, 1, 1.9],
            [250, 200, true, 50, 80, 1.1, 450, 'blueDiamondSprite', 20, 1, 1.9],
            [300, 200, false, 50, 80, 1.1, 450, 'blueDiamondSprite', 20, 1, 1.9],
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
    // NIVEL 24
    24: {
        enemies: [
            [50, 200, true, 100, 80, 1.1, 450, 'blueLightSprite', 30, 1, 1],
            [100, 200, true, 100, 80, 1.1, 450, 'blueLightSprite', 30, 3, 1.9],
            [150, 200, true, 150, 80, 1.1, 450, 'blueDiamondSprite', 20, 1, 1],
            [200, 200, true, 100, 80, 1.1, 450, 'blueLightSprite', 30, 3, 1.9],
            [250, 200, true, 50, 80, 1.1, 450, 'blueDiamondSprite', 20, 1, 1],
            [300, 200, true, 50, 80, 1.1, 450, 'blueDiamondSprite', 20, 3, 1.9],
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
    // NIVEL 25 -- MONSTRUO FINAL
    25: {
        enemies: [
            [100, 200, false, 35, 50, 1, 550, 'blueLightSprite', 40, 3],
            [175, 200, false, 30, 50, 1, 750, 'blueDiamondSprite', 30, 1],
            [250, 200, false, 30, 50, 1, 550, 'blueLightSprite', 40, 3],
        ],
        obstacles: []
    }
}