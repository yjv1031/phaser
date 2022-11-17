import { Pair } from 'matter';
import Phaser, { Game } from 'phaser'
import InputText from 'phaser3-rex-plugins/plugins/inputtext.js';
import Button from 'phaser3-rex-plugins/plugins/Button.js';
import {createSpriteAnimation} from './roomEscapeSpriteModule';

interface ChrFlag {
  downX: number,
  downY: number,
  speed: number,
  position: String,
  msg: Phaser.GameObjects.Text|null,
  msgText: string|undefined,
  msgTimer: number,
  msgEnterFlag: boolean,
  spriteName: string
}

interface CharacterSet {
  chrFlag: ChrFlag,
  character: Phaser.GameObjects.Sprite|null
}

class RoomEscapeScene extends Phaser.Scene {
  private gameInstance: Game|null = null;
  private gameSetting = {
    width: 1024,
    height: 768,
    msgTimer: 200,
    continueTimer: 200
  }

  //나의 캐릭터 객체
  private myCharacterSet = <CharacterSet>{
    chrFlag: {
      downX: 300,
      downY: 500,
      speed: 5,
      position: "3",
      msg: null,
      msgText: "",
      msgTimer: 0,
      msgEnterFlag: true,
      id: '',
      spriteName: 'lidiaRed'
    },
    character:  null
  }

  /* 
  private myCharacter: Phaser.GameObjects.Sprite|null = null;
  private myCharacterFlag = <ChrFlag>{
    downX: 300,
    downY: 500,
    speed: 5,
    position: "3",
    msg: null,
    msgText: "",
    msgTimer: 0,
    msgEnterFlag: true,
    id: '',
    spriteName: 'lidiaRed'
  };
  */

  //기타 멀티플레이어들
  private orterCharacter: Array<Phaser.GameObjects.Sprite|null> = [];

  private inputChat: InputText|null = null;

  constructor() {
    super({ key: 'RoomEscapeGameMain', active: true })
  }

  preload(): void {
   this.load.spritesheet("lidia", "/phaser/resource/lidia.png", { frameWidth: 64, frameHeight: 64 });
   this.load.spritesheet("lidiaRed", "/phaser/resource/lidia2.png", { frameWidth: 64, frameHeight: 64 });
   this.load.image('inputBtn', '/phaser/resource/sopa.png');
  }
  
  create(): void {
    const paramScene: Phaser.Scene = this;
    //스프라이트 생성펑션
    createSpriteAnimation(paramScene);
    
    //캐릭터 객체 생성
    this.myCharacterSet.character = this.matter.add.sprite(300, 500, 'lidiaRed', undefined, {label: 'character'}).setScale(1);

    console.log(this.matter.world);

    //말풍선
    this.myCharacterSet.chrFlag.msg = this.add.text(this.myCharacterSet.character.x, this.myCharacterSet.character.y -50, "", {
        font: "15px Arial",
        //fill: "#ff0044",
        align: "center"
    });

    //채팅 입력창 생성
    this.inputChat = new InputText(this.scene.scene, 400, this.gameSetting.height - 50, 500, 30, {backgroundColor: '#FFFFFF', type: 'text', color: '#000000'}).setInteractive();
    this.scene.scene.add.existing(this.inputChat);
    this.inputChat.on('keydown', (inputText: any, e: any) => { 
      //엔터입력 취급
      if(e.code == 'NumpadEnter' || e.code == 'Enter') {
        if(this.myCharacterSet.chrFlag.msgEnterFlag) {
          if(this.inputChat) {
            this.myCharacterSet.chrFlag.msgEnterFlag = false;
            this.myCharacterSet.chrFlag.msgText = this.inputChat.text;
            this.myCharacterSet.chrFlag.msgTimer = this.gameSetting.msgTimer;
            this.inputChat.setText("");
            //연속 입력행위를 제한한다
            setTimeout(() => {
              this.myCharacterSet.chrFlag.msgEnterFlag = true;
            },this.gameSetting.continueTimer);
          }
        } else {
          if(this.inputChat) {
            this.inputChat.setText("");
          }
        }
      }
    });

    //채팅데이터 입력 버튼
    const inputBtn = this.matter.add.sprite(700, this.gameSetting.height - 50, 'inputBtn', undefined, {label: 'inputBtn'}).setScale(0.2).setStatic(true).setInteractive();
    inputBtn.on('pointerdown', () => {
      if(this.inputChat) {
        this.myCharacterSet.chrFlag.msgText = this.inputChat.text;
        this.inputChat.setText("");
        this.myCharacterSet.chrFlag.msgTimer = this.gameSetting.msgTimer;
      }
    });
    
    //마우스 바닥 클릭 이벤트
    this.input.on('pointerdown', (event: any, param: any) => {
      if(event.downY < this.gameSetting.height - 100){
        this.myCharacterSet.chrFlag.downX = event.downX;
        this.myCharacterSet.chrFlag.downY = event.downY;
      }
    });
  }
  
  update(time: number, delta: number): void {
    //캐릭터 움직임
    
    if(this.myCharacterSet.character) {
      //캐릭터의 목표 방향과 실제 캐릭터의 위치를 계산하여 무빙한다
      if(Math.abs(this.myCharacterSet.chrFlag.downY - this.myCharacterSet.character.y) >= this.myCharacterSet.chrFlag.speed * 2 || Math.abs(this.myCharacterSet.chrFlag.downX - this.myCharacterSet.character.x) >= this.myCharacterSet.chrFlag.speed * 2) {
        const downY = this.myCharacterSet.chrFlag.downY;
        const downX = this.myCharacterSet.chrFlag.downX;
        const curY = this.myCharacterSet.character.y;
        const curX = this.myCharacterSet.character.x;
        //두점의 거리를 계산한다
        let y = (downY - curY) / Math.sqrt( Math.pow((downY - curY),2) + Math.pow((downX - curX),2) );
        //y = curY < downY ? y : -y;

        let x = (downX - curX) / Math.sqrt( Math.pow((downY - curY),2) + Math.pow((downX - curX),2) );
        //x = curX < downX ? x : -x;

        this.myCharacterSet.character.y += y * this.myCharacterSet.chrFlag.speed;
        this.myCharacterSet.character.x += x * this.myCharacterSet.chrFlag.speed;
        
        //캐릭터가 바라보고 있는 방향 설정
        // 1 => 위 , 2 => 오른쪽, 3 => 아래, 4 => 왼쪽
        const curP = this.myCharacterSet.chrFlag.position;
        let characterP = `${this.myCharacterSet.chrFlag.spriteName}3`;
        if( y < 0 && Math.abs(y) >= Math.abs(x) ) {
          characterP = `${this.myCharacterSet.chrFlag.spriteName}1`;
        } else if( x > 0 && Math.abs(y) <= Math.abs(x) ) {
          characterP = `${this.myCharacterSet.chrFlag.spriteName}2`;
        } else if( y > 0 && Math.abs(y) >= Math.abs(x) ) {
          characterP = `${this.myCharacterSet.chrFlag.spriteName}3`;
        } else {
          characterP = `${this.myCharacterSet.chrFlag.spriteName}4`;
        }

        //캐릭터가 바라보는 방향이 변경된 경우이다
        if(curP != characterP) {
          this.myCharacterSet.chrFlag.position = characterP;
          this.myCharacterSet.character.anims.stop();
          this.myCharacterSet.character.anims.play(String(characterP), true);
        }

        //말풍선이 함께 무빙
        this.myCharacterSet.chrFlag.msg?.setX(this.myCharacterSet.character.x);
        this.myCharacterSet.chrFlag.msg?.setY(this.myCharacterSet.character.y - 50);
        
      } else {
        //정지되어 있는 상태
        this.myCharacterSet.character.anims.stop();
      }

      //채팅내용 동기화
      if(this.myCharacterSet.chrFlag.msgText) {
        if(this.myCharacterSet.chrFlag.msgTimer > 0) {
          this.myCharacterSet.chrFlag.msg?.setText(this.myCharacterSet.chrFlag.msgText);
          this.myCharacterSet.chrFlag.msgTimer -= 1;
        } else {
          this.myCharacterSet.chrFlag.msg?.setText("");
          this.myCharacterSet.chrFlag.msgTimer = 0;
        }
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
      backgroundColor: "#555555",
      scene: [ RoomEscapeScene ],
      dom: {
        createContainer: true
      },
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