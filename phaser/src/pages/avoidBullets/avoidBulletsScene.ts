import Phaser, { Game } from 'phaser'

class AvoidBulletsScene extends Phaser.Scene {
  private gameInstance: Game|null = null;
  private gameSetting = {
    width: 1024,
    height: 768
  }
  private characterSetting = {
    speed: 5
  }
  private character: Phaser.GameObjects.Image|null = null
  private upKey:     Phaser.Input.Keyboard.Key|null = null
  private downKey:   Phaser.Input.Keyboard.Key|null = null
  private leftKey:   Phaser.Input.Keyboard.Key|null = null
  private rightKey:  Phaser.Input.Keyboard.Key|null = null

  private a1 : Phaser.GameObjects.Image|null = null
  private a2 : Phaser.GameObjects.Image|null = null

  constructor() {
    super({ key: 'main', active: true })
  }

  preload(): void {
    this.load.image('robot', '/phaser/resource/robot.png');
  }

  create(): void {
    this.character = this.matter.add.image(100, 150, 'robot').setScale(0.1);

    const a1 = this.matter.add.image(100, 200, 'robot').setScale(0.1).setStatic(true);
    const a2 = this.matter.add.image(200, 200, 'robot').setScale(0.1).setStatic(true);

    //키설정
    this.upKey     = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.downKey   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    this.leftKey   = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    this.rightKey  = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
  }

  aaa(): void {
    console.log('충돌');
  }

  aaa2(): void {
    console.log('충돌2');
  }

  update(time: number, delta: number): void {
    if (this.upKey?.isDown && this.character) {
      this.character.y -= this.characterSetting.speed;
    }
    if (this.downKey?.isDown && this.character) {
      this.character.y += this.characterSetting.speed;
    } 
    if (this.leftKey?.isDown && this.character) {
      this.character.x -= this.characterSetting.speed;
    }
    if (this.rightKey?.isDown && this.character) {
      this.character.x += this.characterSetting.speed;
    }

    if(this.character && this.a1 && this.a2) {
      //this.matter.setCollisionGroup([this.character ,this.a1, this.a2], 1);
      this.matter.overlap(this.character, [this.a1, this.a2], this.aaa, this.aaa2, this);
    }
  }

  destroy(): void {
  }

  gameCreate(): void {
    const game: Phaser.Game = new Phaser.Game({
      width: this.gameSetting.width,
      height: this.gameSetting.height,
      parent: 'AvoidBulletsGameDiv',
      scene: [ AvoidBulletsScene ],
      physics: {
        default: 'matter', // arcade, matter 중 1택
        // matter 물리엔진 설정
        matter: {
          // 월드에 중력 설정
          gravity: {
            x: 0,
            y: 0
          }
        }
      }
    })
    this.gameInstance = game;
  }

  gameDestroy() {
    if(this.gameInstance) {
      this.gameInstance.destroy(true, false);
    }
  }

  getInstance() {

  }
}

export default new AvoidBulletsScene;