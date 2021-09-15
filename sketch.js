var rocket, rocketImage
var star, starGroup, starImage, starSound
var asteroid, asteroidGroup, asteroidImage, asteroidSound
var bg, backgroundImage
var fireball, fireballImage, fireballGroup
var score = 0
var lives = 3
var PLAY = 1, END = 0
var gameState = PLAY
var gameOver, gameOverImage, gameOverSound
var restart, restartImage
var hasFired = false
var live3Image, live2Image, live1Image, life
var backgroundSound
var white3Image, white2Image, white1Image, white


function preload() {
    backgroundImage = loadImage("images/background.png")
    rocketImage = loadImage("images/rocket.png")
    starImage = loadImage("images/star.png")
    fireballImage = loadImage("images/fireball.png")
    asteroidImage = loadImage("images/asteroids.png")
    starSound = loadSound("starSound.ogg")
    asteroidSound = loadSound("asteroidSound.mp3")
    restartImage = loadImage("images/restart.png")
    gameOverImage = loadImage("images/gameOver.jpg")
    gameOverSound = loadSound("endSound.wav")
    live1Image = loadImage("images/1 heart.png")
    live2Image = loadImage("images/2 hearts.png")
    live3Image = loadImage("images/3 hearts.png")
    backgroundSound = loadSound("background.mp3")
    white3Image = loadImage("images/3 white.png")
    white2Image = loadImage("images/2 white.png")
    white1Image = loadImage("images/1 white.png")

}
function setup() {
    createCanvas(800, 600)
    bg = createSprite(400, 300)
    bg.addImage(backgroundImage)
    bg.scale = 1
    bg.velocityY = 2

    rocket = createSprite(100, 300)
    rocket.addImage(rocketImage)
    rocket.scale = 0.7

    restart = createSprite(400, 350)
    restart.addImage(restartImage)
    restart.scale = 0.15


    gameOver = createSprite(380, 200)
    gameOver.addImage(gameOverImage)
    gameOver.scale = 0.2

    life = createSprite(750, 100)
    life.addImage(live3Image)
    life.scale = 0.2

    white = createSprite(750, 105)
    white.scale = 0.5
    white.visible = false




    starGroup = new Group()
    asteroidGroup = new Group()
    fireballGroup = new Group()
}




function draw() {
    background("black")

    if (gameState === PLAY) {

        restart.visible = false
        gameOver.visible = false
        if (bg.y > 500) {
            bg.y = 300
        }
        if (keyDown("space") && hasFired === false) {

            fireball = createSprite(rocket.x + 50, rocket.y)
            fireball.addImage(fireballImage)
            fireball.scale = 0.1
            fireball.velocityX = 8
            fireballGroup.add(fireball)
            hasFired = true

        }

        if (frameCount % 10 === 0) {
            hasFired = false
        }
        //  rocket.y += random(-10, 10)
        if (keyDown("up")) {
            rocket.y += -6
        }

        if (keyDown("down")) {
            rocket.y += 6
        }


        for (var i = 0; i < starGroup.length; i++) {
            if (fireballGroup.isTouching(starGroup.get(i))) {
                starGroup.get(i).destroy()
                fireballGroup.destroyEach()
                starSound.play()
                score += 5
            }
        }
        for (var i = 0; i < asteroidGroup.length; i++) {
            if (fireballGroup.isTouching(asteroidGroup.get(i))) {
                asteroidGroup.get(i).destroy()
                fireballGroup.destroyEach()
                asteroidSound.play()
                lives -= 1
            }
        }


        spawnStars()
        spawnAsteroids()
        if (lives === 2) {
            life.addImage(live2Image)
            white.addImage(white1Image)
            white.visible = true
        }
        if (lives === 1) {
            life.addImage(live1Image)
            white.addImage(white2Image)
        }
        if (lives === 0) {
            white.addImage(white3Image)
            gameState = END

        }



    }
    if (gameState === END) {
        //background("black")
        gameOverSound.play()
        gameOver.visible = true
        restart.visible = true
        rocket.visible = false
        star.visible = false
        asteroid.visible = false
        background.visible = false
        background.velocityY = 0
        star.velocityY = 0
        asteroid.velocityY = 0

        if (mousePressedOver(restart)) {
            reset();
        }
    }

    drawSprites()
    fill("white")
    textSize(20)
    text("Score:" + score, 10, 50)
    // text("Lives:" + lives, 700, 50)
    //  text("Level:" + levels, 100, 50)


}
function reset() {
    gameState = PLAY;
    rocket.visible = true
    life.addImage(live3Image)
    score = 0
    lives = 3
    levels = 0
}




function spawnStars() {
    if (frameCount % 100 === 0) {
        star = createSprite(700, -50)
        star.x = random(300, 700)
        star.addImage(starImage)
        star.scale = 0.4
        star.velocityY = 4 + score / 20
        starGroup.add(star)
        star.lifetime = 200
    }
}

function spawnAsteroids() {
    if (frameCount % 200 === 0) {
        asteroid = createSprite(700, -50)
        asteroid.x = random(300, 700)
        asteroid.addImage(asteroidImage)
        asteroid.scale = 0.2
        asteroid.velocityY = 4 + score / 20
        asteroidGroup.add(asteroid)
        asteroid.lifetime = 200
    }
}

