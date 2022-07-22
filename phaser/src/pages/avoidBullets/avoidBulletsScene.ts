import Phaser, { Game } from 'phaser'

export class AvoidBulletsScene extends Phaser.Scene {
  private gameInstance: Game|null = null;
  private gameSetting = {
    width: 1024,
    height: 768
  }
  private character: Phaser.GameObjects.Image|null = null
  private upKey:     Phaser.Input.Keyboard.Key|null = null
  private downKey:   Phaser.Input.Keyboard.Key|null = null
  private leftKey:   Phaser.Input.Keyboard.Key|null = null
  private rightKey:  Phaser.Input.Keyboard.Key|null = null
  
  private random: number = 0;

  constructor() {
    super({ key: 'main', active: true })
  }

  preload(): void {
    this.random = Math.random();
    this.load.image('robot', '/resource/avoidBullets/robot.png');
  }

  create(): void {
    this.character = this.add.image(100, 150, 'robot')
    //키설정
    this.upKey     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.downKey   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    this.leftKey   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    this.rightKey  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
  }

  update(time: number, delta: number): void {
    console.log(this.random);

    if (this.upKey?.isDown)     console.log('위');
    if (this.downKey?.isDown)   console.log('아래');
    if (this.leftKey?.isDown)   console.log('왼쪽');
    if (this.rightKey?.isDown)  console.log('오른쪽');
  }

  destroy(): void {
  }

  gameCreate(): void {
    debugger;
    const game: Phaser.Game = new Phaser.Game({
      width: this.gameSetting.width,
      height: this.gameSetting.height,
      parent: 'AvoidBulletsGameDiv',
      scene: [ AvoidBulletsScene ]
    })
    this.gameInstance = game;
  }

  gameDestroy() {
    if(this.gameInstance) {
      this.gameInstance.destroy(true, true);
    }
  }

  getInstance() {

  }
}