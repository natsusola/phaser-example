let game = new Phaser.Game(800, 600, Phaser.AUTO, null, {
  preload, create, update
});

let player, platforms;
let cursors;

function preload() {
  game.scale.pageAlignVertically = true;
  game.scale.pageAlignHorizontally = true;
  game.stage.backgroundColor = '#eee';

  game.load.image('ground', require('@/assets/platform.png'));
  game.load.spritesheet('player', require('@/assets/player.png'), 50, 100);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  player = game.add.sprite(0, game.world.height - 150, 'player');
  player.anchor.set(0.5);
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.gravity.y = 1000;
  player.body.collideWorldBounds = true;
  player.animations.add('stand', [0, 1], 3, this);
  player.animations.add('walk', [2, 3, 4, 3], 9, this);
  player.animations.add('jump', [5, 6], 10, this);
  player.body.velocity.y = 200;
  player.gameStatus = {
    jumpTimer: 0
  };

  platforms = game.add.group();
  platforms.enableBody = true;
  let ground = platforms.create(0, game.world.height - 20, 'ground');
  ground.scale.setTo(10, 2);

  platforms.create(450, 400, 'ground');
  platforms.create(650, 500, 'ground');
  platforms.setAll('body.immovable', true);
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  game.physics.arcade.collide(player, platforms);
  player.body.velocity.x = 0;

  if (cursors.left.isDown) {
    player.scale.x = -1;
    player.body.velocity.x = -200;
    if (player.body.touching.down) player.animations.play('walk')
  } else if (cursors.right.isDown) {
    player.scale.x = 1;
    player.body.velocity.x = 200;
    if (player.body.touching.down) player.animations.play('walk');
  } else {
    player.animations.play('stand');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -200;
    player.gameStatus.jumpTimer = 1;
    player.animations.play('jump', 2, false);
  } else if (cursors.up.isDown && player.gameStatus.jumpTimer !== 0) {
    if (player.gameStatus.jumpTimer > 20) {
      player.gameStatus.jumpTimer = 0;
    } else {
      player.gameStatus.jumpTimer++;
      player.body.velocity.y = -250;
    }
  } else { player.gameStatus.jumpTimer = 0; }

  if (!player.body.touching.down) {
    player.frame = 6;
  }

}
