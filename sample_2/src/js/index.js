let game = new Phaser.Game(800, 600, Phaser.AUTO, null, {
  preload, create, update,
});

let player, platforms;
let cursors;
let zKey;
// let heroJson = require('@/assets/hero.json');
// log(heroJson);

function preload() {
  game.scale.pageAlignVertically = true;
  game.scale.pageAlignHorizontally = true;
  game.stage.backgroundColor = '#eee';

  game.load.image('ground', require('@/assets/platform.png'));
  game.load.spritesheet('player', require('@/assets/player.png'), 50, 100);
  game.load.atlas('hero', require('@/assets/hero.png'), require('@/assets/hero.json'), Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  player = game.add.sprite(0, game.world.height - 150, 'hero');
  player.anchor.set(0, 1);
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.gravity.y = 3000;
  player.body.collideWorldBounds = true;
  // player.body.linearDamping = 1;
  player.animations.add('stand', Phaser.Animation.generateFrameNames('stand_0', 1, 2, '.png'), 3, this);
  player.animations.add('walk', Phaser.Animation.generateFrameNames('walk_0', 1, 3, '.png'), 9, this);
  player.animations.add('jump', Phaser.Animation.generateFrameNames('jump_0', 1, 2, '.png'), 1, this);
  player.animations.add('attack1', Phaser.Animation.generateFrameNames('attack1_0', 1, 2, '.png'), 10, this);
  player.animations.add('attack2', Phaser.Animation.generateFrameNames('attack2_0', 1, 2, '.png'), 1, this);

  player.body.velocity.y = 200;
  player.gameStatus = {
    jumpTimer: 0,
    attack1Timer: 0,
  };

  platforms = game.add.group();
  platforms.enableBody = true;
  let ground = platforms.create(0, game.world.height - 20, 'ground');
  ground.scale.setTo(10, 2);

  platforms.create(450, 400, 'ground');
  platforms.create(650, 500, 'ground');
  platforms.setAll('body.immovable', true);
  cursors = game.input.keyboard.createCursorKeys();
  zKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
}

function update() {

  player.body.setSize(player.width * player.scale.x, player.height);
  game.physics.arcade.collide(player, platforms);
  player.body.velocity.x = 0;
  

  if (zKey.isDown) {
    player.animations.play('attack1')
  } else if (cursors.left.isDown) {
    if (player.scale.x === 1) player.x += player.width;
    player.scale.x = -1;
    player.body.velocity.x = -200;
    if (player.body.touching.down) player.animations.play('walk');
  } else if (cursors.right.isDown) {
    if (player.scale.x === -1) player.x += player.width;
    player.scale.x = 1;
    player.body.velocity.x = 200;
    if (player.body.touching.down) player.animations.play('walk');
  } else {
    player.animations.play('stand');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.body.velocity.y = -300;
    player.gameStatus.jumpTimer = 1;
    player.animations.play('jump', 2, false);
  } else if (cursors.up.isDown && player.gameStatus.jumpTimer !== 0) {
    if (player.gameStatus.jumpTimer > 20) {
      player.gameStatus.jumpTimer = 0;
    } else if (player.gameStatus.jumpTimer > 0 && player.gameStatus.jumpTimer < 10) {
      player.gameStatus.jumpTimer++;
      player.body.velocity.y = -400;
    } else {
      player.gameStatus.jumpTimer++;
      player.body.velocity.y = -350;
    }
  } else { player.gameStatus.jumpTimer = 0; }

  if (!player.body.touching.down) {
    // player.animations.play('jumping')
    player.frameName = 'jump_02.png';
  }

  game.debug.spriteInfo(player, 32, 32);
  game.debug.body(player);
  game.debug.spriteBounds(player, 'green', false);

}

function render() {

}
