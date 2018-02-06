// window.log = console.log.bind(this, `%c LOG `, 'background: #FF7818; color: white');
// if (!__DEV__) console.log = () => {};
//
// import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
// import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
// import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

let game = new Phaser.Game(800, 600, Phaser.AUTO, null, {
  preload, create, update
});

let ball, paddle, bricks, newBrick, brickInfo;
let isStart = false;

function preload() {
  handleRemoteImagesOnJSFiddle();
  // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#eee';

  game.load.image('ball', 'img/ball.png');
  game.load.image('paddle', 'img/paddle.png');
  game.load.image('brick', 'img/brick.png');
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.checkCollision.down = false;

  ball = game.add.sprite(game.world.width * 0.5, game.world.height - 35, 'ball');
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.anchor.set(0.5);
  // ball.body.velocity.set(250, -250);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);
  ball.checkWorldBounds = true;
  ball.events.onOutOfBounds.add(() => {
    alert('Game Over!');
  }, this);

  paddle = game.add.sprite(game.world.width * 0.5, game.world.height - 15, 'paddle');
  game.physics.enable(paddle, Phaser.Physics.ARCADE);
  paddle.anchor.set(0.5, 1);
  paddle.body.immovable = true;
  initBricks();

  game.input.onDown.addOnce(() => {
    ball.body.velocity.set(250, -250);
    isStart = true;
  }, this);
}

function update() {
  game.physics.arcade.collide(ball, paddle, ballHitPaddle);
  game.physics.arcade.collide(ball, bricks, ballHitBrick);
  paddle.x = game.input.x || game.world.width * 0.5;
  if (!isStart) {
    ball.x = paddle.x;
  }
}

/* -----------  Init Functions  ----------- */

function initBricks() {
  brickInfo = {
    width: 50,
    height: 20,
    count: { row: 7, col: 3 },
    offset: { top: 50, left: 60 },
    padding: 10
  };

  bricks = game.add.group();
  for (let i = 0; i < brickInfo.count.row; i++) {
    for (let j = 0; j < brickInfo.count.col; j++) {
      let _bx = i * (brickInfo.width + brickInfo.padding) + brickInfo.offset.left;
      let _by = j * (brickInfo.height + brickInfo.padding) + brickInfo.offset.left;
      newBrick = game.add.sprite(_bx, _by, 'brick');
      game.physics.enable(newBrick, Phaser.Physics.ARCADE);
      newBrick.body.immovable = true;
      newBrick.anchor.set(0.5);
      bricks.add(newBrick);
    }
  }
}

/* -----------  Hit Functions  ----------- */

function ballHitPaddle(ball, paddle) {
  log(paddle.x, ball.x, -1 * 5 * (paddle.x - ball.x));
  ball.body.velocity.x = -1 * 5 * (paddle.x - ball.x);
}

function ballHitBrick(ball, brick) {
  brick.kill();
}

function handleRemoteImagesOnJSFiddle() {
	game.load.baseURL = 'https://end3r.github.io/Gamedev-Phaser-Content-Kit/demos/';
	game.load.crossOrigin = 'anonymous';
}
