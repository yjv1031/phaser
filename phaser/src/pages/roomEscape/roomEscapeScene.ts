import { Pair } from 'matter';
import Phaser, { Game } from 'phaser'

class RoomEscapeScene extends Phaser.Scene {
  private gameInstance: Game|null = null;
  private gameSetting = {
    width: 1024,
    height: 768
  }
  private myCharacter: Phaser.GameObjects.Sprite|null = null
  private myCharacterFlag = {
    downX: 300,
    downY: 500,
    speed: 5,
    position: "3" 
  };

  constructor() {
    super({ key: 'RoomEscapeGameMain', active: true })
  }

  preload(): void {
    this.load.image('robot', '/phaser/resource/sopa2.png');
    this.load.spritesheet("lidia", "/phaser/resource/lidia.png", { frameWidth: 64, frameHeight: 64 });
  }
  
  create(): void {
    this.createSpriteAnimation();
    //캐릭터 객체 생성
    //this.myCharacter = this.matter.add.image(300, 500, 'robot', undefined, {label: 'character'}).setScale(1).setInteractive();
    this.myCharacter = this.matter.add.sprite(300, 500, 'lidia', undefined, {label: 'character'}).setScale(1);

    this.myCharacter.on('pointerdown', () => {
      console.log('비행기 클릭');
    });

    console.log(this.matter.world);

    //마우스 바닥 클릭 이벤트
    this.input.on('pointerdown', (event: any, param: any) => {
      this.myCharacterFlag.downX = event.downX;
      this.myCharacterFlag.downY = event.downY;
    });
  }
  
  update(time: number, delta: number): void {
    if(this.myCharacter) {
      //캐릭터의 목표 방향과 실제 캐릭터의 위치를 계산하여 무빙한다
      if(Math.abs(this.myCharacterFlag.downY - this.myCharacter.y) >= this.myCharacterFlag.speed * 2 || Math.abs(this.myCharacterFlag.downX - this.myCharacter.x) >= this.myCharacterFlag.speed * 2) {
        const downY = this.myCharacterFlag.downY;
        const downX = this.myCharacterFlag.downX;
        const curY = this.myCharacter.y;
        const curX = this.myCharacter.x;
        //두점의 거리를 계산한다
        let y = (downY - curY) / Math.sqrt( Math.pow((downY - curY),2) + Math.pow((downX - curX),2) );
        //y = curY < downY ? y : -y;

        let x = (downX - curX) / Math.sqrt( Math.pow((downY - curY),2) + Math.pow((downX - curX),2) );
        //x = curX < downX ? x : -x;

        this.myCharacter.y += y * this.myCharacterFlag.speed;
        this.myCharacter.x += x * this.myCharacterFlag.speed;
        
        //캐릭터가 바라보고 있는 방향 설정
        // 1 => 위 , 2 => 오른쪽, 3 => 아래, 4 => 왼쪽
        const curP = this.myCharacterFlag.position;
        let characterP = "3";
        if( y < 0 && Math.abs(y) >= Math.abs(x) ) {
          characterP = "1";
        } else if( x > 0 && Math.abs(y) <= Math.abs(x) ) {
          characterP = "2";
        } else if( y > 0 && Math.abs(y) >= Math.abs(x) ) {
          characterP = "3";
        } else {
          characterP = "4";
        }

        //캐릭터가 바라보는 방향이 변경된 경우이다
        if(curP != characterP) {
          this.myCharacterFlag.position = characterP;
          this.myCharacter.anims.stop();
          this.myCharacter.anims.play(String(characterP), true);
        }
      } else {
        //정지되어 있는 상태
        this.myCharacter.anims.stop();
      }
    }
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

  createSpriteAnimation(): void {
    const anims = this.anims;
    // Player
    anims.create({
        key: "4", frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('lidia', { start: 9, end: 17 }),
    });
    anims.create({
        key: "2", frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('lidia', { start: 27, end: 35 }),
    });
    anims.create({
        key: "1", frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('lidia', { start: 0, end: 8 }),
    });
    anims.create({
        key: "3", frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('lidia', { start: 18, end: 26 }),
    });
    anims.create({
        key: "waiting", frameRate: 3, repeat: -1,
        frames: this.anims.generateFrameNumbers('lidia', { start: 19, end: 21 }),
    });
  }

  gameDestroy() {
    if(this.gameInstance) {
      this.gameInstance.destroy(true, false);
    }
  }
}

export default new RoomEscapeScene;