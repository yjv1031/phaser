import { Pair } from 'matter';
import Phaser, { Game } from 'phaser'
import InputText from 'phaser3-rex-plugins/plugins/inputtext.js';
import Button from 'phaser3-rex-plugins/plugins/Button.js';
import {createSprite, createSpriteAnimation} from './roomEscapeSpriteModule';
import {ChrFlag, CharacterSet} from './roomEscapeInterface';
import {createCharacter, updateCharacterMove} from './roomEscapeMoveModule';
import {callWsCreateCharacter,callWsResetList,callWsSendChatMsg,callWsMoveCharacterMsg} from './roomEscapeWsModule';
import {resourcePath} from './roomEscapeConstant';
//import { RoomEscapeStore } from '../../store/roomEscapeStore';
import { RoomEscapeStore } from '../../store/roomEscapeStore';

class RoomEscapeScene extends Phaser.Scene {
  private gameInstance: Game|null = null;
  private gameSetting = {
    width: 800,
    height: 600,
    msgTimer: 200,
    continueTimer: 200
  }

  //나의 캐릭터 객체
  private myCharacterSet = <CharacterSet>{
    chrFlag: {
      downX: 400,
      downY: 300,
      speed: 5,
      position: "3",
      msg: null,
      msgText: "",
      msgTimer: 0,
      msgEnterFlag: true,
      id: '',
      spriteName: '',
      nick: '',
    },
    character:  null,
    myFlagObject: null
  }

  //기타 멀티플레이어들
  private orterCharacterSet: Array<CharacterSet> = [];

  private inputChat: InputText|null = null;

  constructor() {
    super({ key: 'RoomEscapeGameMain', active: true })
  }

  preload(): void {
   //스프라이트 리소스 콜
   createSprite(this);

   //배경타일 로딩
   this.load.image('tile', `/phaser/resource/${resourcePath.objectPath}/tile.png`);

   //각종리소스 호출
   //pc1
   this.load.image('pc1', `/phaser/resource/${resourcePath.objectPath}/pc1.png`);
   //pc2
   this.load.image('pc2', `/phaser/resource/${resourcePath.objectPath}/pc2.png`);
   //desk1
   this.load.image('desk1', `/phaser/resource/${resourcePath.objectPath}/desk1.png`);
   //flower1
   this.load.image('flower1', `/phaser/resource/${resourcePath.objectPath}/flower1.png`);
   //bord1
   this.load.image('board1', `/phaser/resource/${resourcePath.objectPath}/board1.png`);
   //bord2
   this.load.image('board2', `/phaser/resource/${resourcePath.objectPath}/board2.png`);

   this.load.image('rdesk1', `/phaser/resource/${resourcePath.objectPath}/rdesk1.png`);

   //입력버튼 호출
   this.load.image('inputBtn', `/phaser/resource/${resourcePath.objectPath}/inputBtn.png`);
   //내 캐릭터 표시 이미지 호출
   this.load.image('myFlag', `/phaser/resource/${resourcePath.objectPath}/myFlag.png`);
  }
  
  create(): void {
    //스프라이트 생성펑션
    createSpriteAnimation(this);

    //바닥 타일 생성
    this.add.image(400, 225, 'tile');
    //pc1 생성
    //this.matter.add.image(500, 100, 'pc1').setScale(0.07).setStatic(true);
    //pc2 생성
    //this.matter.add.image(200, 50, 'pc2').setScale(0.07).setStatic(true);

    //desk1 생성
    let x = 120;
    this.matter.add.image(x, 430, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+40, 430, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+80, 430, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+120, 430, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+160, 430, 'desk1').setScale(0.07).setStatic(true);

    this.matter.add.image(x, 330, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+40, 330, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+80, 330, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+120, 330, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+160, 330, 'desk1').setScale(0.07).setStatic(true);

    x = 500;
    this.matter.add.image(x, 430, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+40, 430, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+80, 430, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+120, 430, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+160, 430, 'desk1').setScale(0.07).setStatic(true);

    this.matter.add.image(x, 330, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+40, 330, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+80, 330, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+120, 330, 'desk1').setScale(0.07).setStatic(true);
    this.matter.add.image(x+160, 330, 'desk1').setScale(0.07).setStatic(true);

    //보드
    this.matter.add.image(200, 30, 'board1').setScale(0.1).setStatic(true);
    this.matter.add.image(300, 30, 'board2').setScale(0.12).setStatic(true);

    //this.matter.add.image(600, 100, 'rdesk1').setScale(0.07).setStatic(true);

    this.myCharacterSet.chrFlag.spriteName = RoomEscapeStore.mySprite;
    this.myCharacterSet.chrFlag.nick = RoomEscapeStore.myNick;
    console.log(this.myCharacterSet.chrFlag);
    //마이캐릭터 생성
    createCharacter(this, this.myCharacterSet, true);

    this.createInteraction();

    callWsCreateCharacter(this.setMyCharacterId, this.resetCharacters, this.receiveMoveMsg, this.receiveChatMsg);
  }
  
  update(time: number, delta: number): void {
    //캐릭터 움직임 갱신
    try {
      updateCharacterMove(this.myCharacterSet, true, this);
      this.orterCharacterSet.forEach((characterSet) => {updateCharacterMove(characterSet, false, this);});
    } catch(e) {
      console.log(`에러 ${this.orterCharacterSet.length}, myId: ${this.myCharacterSet.chrFlag.id}`);
      //, ${this.orterCharacterSet[0].chrFlag.id}, ${this.orterCharacterSet[1].chrFlag.id}
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

  //서버에서 나의 세션아이디를 세팅하는 함수
  setMyCharacterId = (id: string) => {
    this.myCharacterSet.chrFlag.id = id;

    const param = {
      flag: 're',
      downX: this.myCharacterSet.chrFlag.downX,
      downY: this.myCharacterSet.chrFlag.downY,
      speed: this.myCharacterSet.chrFlag.speed,
      id: this.myCharacterSet.chrFlag.id,
      spriteName: this.myCharacterSet.chrFlag.spriteName
    };
    callWsResetList(param);
  }

  //서버에서 다른사람의 채팅메세지를 전달 받았을 때 세팅하는 함수
  receiveChatMsg = (param: any) => {
    const id = param.id;
    const nick = param.nick;
    this.orterCharacterSet.forEach((item) => {
      if(item.chrFlag.id == id) {
        item.chrFlag.msgText = param.msg;
        item.chrFlag.msgTimer = this.gameSetting.msgTimer;

        RoomEscapeStore.insertChat(nick, param.msg);
      }
    });
  }

  //서버에서 다른사람의 움직임을 전달받았을 경우
  receiveMoveMsg = (param: any) => {
    const id = param.id;
    this.orterCharacterSet.forEach((item) => {
      if(item.chrFlag.id == id) {
        item.chrFlag.downX = param.downX;
        item.chrFlag.downY = param.downY;
      }
    });
  }

  //서버에서 모든 사람들의 데이터를 전달받았을 경우
  resetCharacters = (onlineCharacterSetList: Array<any>) => {
    //루프를 순회한다.
    //해당 인원이 새로 발견된 경우, 이미 기존에 있는 경우, 사라진 경우를 분기한다
    //플레이어 자신에 대한 행위는 제외하고 진행
    const myId = this.myCharacterSet.chrFlag.id;
    //자기 자신은 제외하고 처리한다
    let onlineList = onlineCharacterSetList.filter((item) => {return myId != item.sessionId});

    for(let i= this.orterCharacterSet.length - 1; i>=0; i--) {
      const tempCharId = this.orterCharacterSet[i].chrFlag.id;
      let existFlag = false;
      for(let j=0; j<onlineList.length; j++) {
        const online = onlineList[j];
        const onlineId = online.sessionId;
        if(onlineId == tempCharId) {
          existFlag = true;
          //서버 캐릭터 리스트에서 삭제한다
          onlineList = onlineList.filter((item, idx) => {return j != idx});
          break;
        }
      }

      if(!existFlag) {
        //서버에 해당 플레이어가 존재하지 않는 경우 
        //해당 유저를 삭제한다
        
        if(this.orterCharacterSet[i]) {
          const tempSheet = this.orterCharacterSet[i];
          this.orterCharacterSet = this.orterCharacterSet.filter((item, idx) => {return i != idx});
          tempSheet.character?.destroy();
        }
      }
    }


    //서버에는 있지만 현재 클라이언트에 없는 캐릭터를 생성
    for(let i=0; i<onlineList.length; i++) {
      const tempChrFlag: ChrFlag = {
        downX: onlineList[i].downX,
        downY: onlineList[i].downY,
        speed: onlineList[i].speed,
        position: "3",
        msg: null,
        msgText: "",
        msgTimer: 0,
        msgEnterFlag: true,
        id: onlineList[i].sessionId,
        spriteName: onlineList[i].spriteName,
        nick: onlineList[i].nick
      }
      const param = {
        chrFlag: tempChrFlag,
        character: null,
        myFlagObject: null
      }
      createCharacter(this, param, false);
      this.orterCharacterSet.push(param);
    }
  }

  //사용자 조작 이벤트 관련
  createInteraction() {
    //사용자 입력 부분
    //채팅 입력창 생성
    this.inputChat = new InputText(this.scene.scene, 350, this.gameSetting.height - 50, 500, 30, {backgroundColor: '#000000', type: 'text', color: '#33ff33', fontFamily: 'Ycomputer-Regular'}).setInteractive();
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
            callWsSendChatMsg(this.myCharacterSet.chrFlag.msgText, this.myCharacterSet.chrFlag.id, this.myCharacterSet.chrFlag.nick);

            //나의 채팅데이터 입력
            RoomEscapeStore.insertChat(this.myCharacterSet.chrFlag.nick, this.myCharacterSet.chrFlag.msgText);

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
    const inputBtn = this.matter.add.sprite(670, this.gameSetting.height - 50, 'inputBtn', undefined, {label: 'inputBtn'}).setScale(1).setStatic(true).setInteractive();
    inputBtn.on('pointerdown', () => {
      if(this.inputChat) {
        this.myCharacterSet.chrFlag.msgText = this.inputChat.text;
        this.myCharacterSet.chrFlag.msgTimer = this.gameSetting.msgTimer;
        this.inputChat.setText("");
        callWsSendChatMsg(this.myCharacterSet.chrFlag.msgText, this.myCharacterSet.chrFlag.id, this.myCharacterSet.chrFlag.nick);
        //나의 채팅데이터 입력
        RoomEscapeStore.insertChat(this.myCharacterSet.chrFlag.nick, this.myCharacterSet.chrFlag.msgText);
      }
    });
    
    //마우스 바닥 클릭 이벤트
    this.input.on('pointerdown', (event: any, param: any) => {
      console.log(event);
      if(event.downY < this.gameSetting.height - 100){
        this.myCharacterSet.chrFlag.downX = event.worldX;
        this.myCharacterSet.chrFlag.downY = event.worldY;
        const param = {
          flag: 'move',
          downX: this.myCharacterSet.chrFlag.downX,
          downY: this.myCharacterSet.chrFlag.downY,
          speed: this.myCharacterSet.chrFlag.speed,
          id: this.myCharacterSet.chrFlag.id,
          spriteName: this.myCharacterSet.chrFlag.spriteName,
          nick: this.myCharacterSet.chrFlag.nick
        }
        //callWsMoveCharacterMsg(param);
      }
    });
  }
}

export default new RoomEscapeScene;