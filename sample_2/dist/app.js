webpackJsonp([0],[,function(e,a,i){"use strict";function o(){s.scale.pageAlignVertically=!0,s.scale.pageAlignHorizontally=!0,s.stage.backgroundColor="#eee",s.load.image("ground",i(2)),s.load.spritesheet("player",i(3),50,100),s.load.atlas("hero",i(4),i(5),Phaser.Loader.TEXTURE_ATLAS_JSON_HASH)}function t(){s.physics.startSystem(Phaser.Physics.ARCADE),n=s.add.sprite(0,s.world.height-150,"player"),n.anchor.set(.5),s.physics.enable(n,Phaser.Physics.ARCADE),n.body.gravity.y=1e3,n.body.collideWorldBounds=!0,n.animations.add("stand",[0,1],3,this),n.animations.add("walk",[2,3,4,3],9,this),n.animations.add("jump",[5,6],10,this),n.body.velocity.y=200,n.gameStatus={jumpTimer:0},c=s.add.group(),c.enableBody=!0,c.create(0,s.world.height-20,"ground").scale.setTo(10,2),c.create(450,400,"ground"),c.create(650,500,"ground"),c.setAll("body.immovable",!0),u=s.input.keyboard.createCursorKeys()}function r(){s.physics.arcade.collide(n,c),n.body.velocity.x=0,u.left.isDown?(n.scale.x=-1,n.body.velocity.x=-200,n.body.touching.down&&n.animations.play("walk")):u.right.isDown?(n.scale.x=1,n.body.velocity.x=200,n.body.touching.down&&n.animations.play("walk")):n.animations.play("stand"),u.up.isDown&&n.body.touching.down?(n.body.velocity.y=-200,n.gameStatus.jumpTimer=1,n.animations.play("jump",2,!1)):u.up.isDown&&0!==n.gameStatus.jumpTimer?n.gameStatus.jumpTimer>20?n.gameStatus.jumpTimer=0:(n.gameStatus.jumpTimer++,n.body.velocity.y=-250):n.gameStatus.jumpTimer=0,n.body.touching.down||(n.frame=6)}var s=new Phaser.Game(800,600,Phaser.AUTO,null,{preload:o,create:t,update:r}),n=void 0,c=void 0,u=void 0},function(e,a,i){e.exports=i.p+"e4514b222d029bf620bef34f4d45c50b.png"},function(e,a,i){e.exports=i.p+"7547799ff8fdb923406e233f639ee704.png"},function(e,a,i){e.exports=i.p+"886a260fa386e2274784b5218c487b44.png"},function(e,a){e.exports={frames:[{filename:"attack1_01.png",frame:{x:93,y:90,w:38,h:90},spriteSourceSize:{x:3,y:3,w:60,h:93},sourceSize:{w:60,h:93}},{filename:"attack1_02.png",frame:{x:0,y:87,w:51,h:90},spriteSourceSize:{x:4,y:3,w:60,h:93},sourceSize:{w:60,h:93}},{filename:"attack2_01.png",frame:{x:93,y:0,w:39,h:89},spriteSourceSize:{x:3,y:4,w:60,h:93},sourceSize:{w:60,h:93}},{filename:"attack2_02.png",frame:{x:0,y:0,w:59,h:86},spriteSourceSize:{x:0,y:7,w:60,h:93},sourceSize:{w:60,h:93}},{filename:"jump_01.png",frame:{x:133,y:0,w:37,h:87},spriteSourceSize:{x:3,y:6,w:43,h:93},sourceSize:{w:43,h:93}},{filename:"jump_02.png",frame:{x:52,y:87,w:40,h:88},spriteSourceSize:{x:1,y:5,w:43,h:93},sourceSize:{w:43,h:93}},{filename:"stand_01.png",frame:{x:171,y:92,w:36,h:92},spriteSourceSize:{x:3,y:1,w:43,h:93},sourceSize:{w:43,h:93}},{filename:"stand_02.png",frame:{x:132,y:90,w:38,h:89},spriteSourceSize:{x:3,y:4,w:43,h:93},sourceSize:{w:43,h:93}},{filename:"walk_01.png",frame:{x:171,y:0,w:37,h:91},spriteSourceSize:{x:3,y:2,w:43,h:93},sourceSize:{w:43,h:93}},{filename:"walk_02.png",frame:{x:209,y:0,w:32,h:90},spriteSourceSize:{x:9,y:3,w:43,h:93},sourceSize:{w:43,h:93}},{filename:"walk_03.png",frame:{x:208,y:92,w:33,h:89},spriteSourceSize:{x:6,y:4,w:43,h:93},sourceSize:{w:43,h:93}}],meta:{image:"main.png",size:{w:256,h:256},scale:"1"}}}],[1]);