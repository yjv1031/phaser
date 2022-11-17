let createSpriteAnimation = (gameScene: Phaser.Scene) => {
  const anims: Phaser.Animations.AnimationManager = gameScene.anims;

  const spriteArr = [
    'lidia',
    'lidiaRed'
  ];

  // Player
  spriteArr.forEach((item) => {
    anims.create({
      key: `${item}4`, frameRate: 10, repeat: -1,
      frames: gameScene.anims.generateFrameNumbers(item, { start: 9, end: 17 }),
    });
    anims.create({
        key: `${item}2`, frameRate: 10, repeat: -1,
        frames: gameScene.anims.generateFrameNumbers(item, { start: 27, end: 35 }),
    });
    anims.create({
        key: `${item}1`, frameRate: 10, repeat: -1,
        frames: gameScene.anims.generateFrameNumbers(item, { start: 0, end: 8 }),
    });
    anims.create({
        key: `${item}3`, frameRate: 10, repeat: -1,
        frames: gameScene.anims.generateFrameNumbers(item, { start: 18, end: 26 }),
    });
  });
}

export {
  createSpriteAnimation
};