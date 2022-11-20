import {playerSprite} from './roomEscapeConstant';
import {resourcePath} from './roomEscapeConstant';

let createSprite = (gameScene: Phaser.Scene) => {
  playerSprite.forEach((item: any) => {
    gameScene.load.spritesheet(`${item.name}`, `/phaser/resource/${resourcePath.playerSpritePath}/${item.name}.png`, { frameWidth: 64, frameHeight: 64 });
  });
}

let createSpriteAnimation = (gameScene: Phaser.Scene) => {
  const anims: Phaser.Animations.AnimationManager = gameScene.anims;
  // Player
  playerSprite.forEach((item: any) => {
    anims.create({
      key: `${item.name}4`, frameRate: 10, repeat: -1,
      frames: gameScene.anims.generateFrameNumbers(item.name, { start: 9, end: 17 }),
    });
    anims.create({
        key: `${item.name}2`, frameRate: 10, repeat: -1,
        frames: gameScene.anims.generateFrameNumbers(item.name, { start: 27, end: 35 }),
    });
    anims.create({
        key: `${item.name}1`, frameRate: 10, repeat: -1,
        frames: gameScene.anims.generateFrameNumbers(item.name, { start: 0, end: 8 }),
    });
    anims.create({
        key: `${item.name}3`, frameRate: 10, repeat: -1,
        frames: gameScene.anims.generateFrameNumbers(item.name, { start: 18, end: 26 }),
    });
  });
}

export {
  createSprite,
  createSpriteAnimation
};