window.log = console.log.bind(this, `%c LOG `, 'background: #FF7818; color: white');
if (!__DEV__) console.log = () => {};

import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
