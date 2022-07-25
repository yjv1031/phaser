import { Pair } from 'matter';
import Phaser, { Game } from 'phaser'

class RoomEscapeScene extends Phaser.Scene {
  private gameInstance: Game|null = null;
  private gameSetting = {
    width: 1024,
    height: 768
  }
  private character: Phaser.GameObjects.Image|null = null

  constructor() {
    super({ key: 'RoomEscapeGameMain', active: true })
  }

  preload(): void {
    this.load.image('robot', '/phaser/resource/sopa2.png');
  }
  
  create(): void {
    //캐릭터 객체 생성
    this.character = this.matter.add.image(300, 500, 'robot', undefined, {label: 'character'}).setScale(1).setInteractive();
    this.character.on('pointerdown', () => {
      console.log('비행기 클릭');
    });
  }
  
  update(time: number, delta: number): void {
  }

  destroy(): void {
  }

  gameCreate(): void {
    const game: Phaser.Game = new Phaser.Game({
      width: this.gameSetting.width,
      height: this.gameSetting.height,
      parent: 'RoomEscapeGameDiv',
      scene: [ RoomEscapeScene ],
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
}

export default new RoomEscapeScene;