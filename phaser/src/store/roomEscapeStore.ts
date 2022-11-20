import { observable } from 'mobx';
import { Game } from 'phaser';
import RoomEscapeScene from '../pages/roomEscape/roomEscapeScene';
import { ChatList } from '../pages/roomEscape/roomEscapeInterface';

interface RoomEscape {
  gameReadyFlag: boolean;
  insertGameReadyFlag: (flag: boolean, characterName: string, nick: string) => void;
  mySprite: string;
  myNick: string;
  chatList: Array<ChatList>;
  insertChat: (nick: string, content: string) => void
  roomEscapeScene: typeof RoomEscapeScene|null;
}

export const RoomEscapeStore = observable<RoomEscape>({
  gameReadyFlag: false,
  insertGameReadyFlag(flag: boolean, characterName: string, nick: string) {
    if(flag) {
      this.mySprite = characterName;
      this.myNick = nick;
      if(this.roomEscapeScene == null) {
        this.roomEscapeScene = RoomEscapeScene;
        this.roomEscapeScene.gameCreate();
      } else {
        this.roomEscapeScene.gameDestroy();
        this.roomEscapeScene.gameCreate();
      }
    } else {
      if(this.roomEscapeScene != null) {
        this.roomEscapeScene.gameDestroy();
      }
    }
    this.gameReadyFlag = flag;
  },
  mySprite: '',
  myNick: '',
  chatList: [],
  insertChat(nick: string, content: string) {
    const today = new Date();
    const date: string = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const param = {
      nick: nick,
      content: content,
      date: date
    };
    this.chatList.push(param);

    const scollDiv: HTMLParagraphElement|null = document.querySelector('#RoomEscapeGameChatArea');

    //스크롤 이벤트를 실행한다.
    if(scollDiv) {
      console.log(scollDiv.clientHeight + scollDiv.scrollTop);
      console.log(scollDiv.scrollHeight);
      if(scollDiv.clientHeight + scollDiv.scrollTop >= scollDiv.scrollHeight) {
        setTimeout(() => {
          scollDiv.scrollTop = scollDiv.scrollHeight;
        }, 100);
      }
    }

    //단, 유저가 이미 스크롤을 가장 최하단으로 유지했을 경우에만 실행한다
    /*
    if(scollDiv) {
      console.log('이전');
      console.log(scollDiv.scrollTop);
      console.log(scollDiv.scrollHeight);
      if(scollDiv.scrollTop == scollDiv.scrollHeight) {
        setTimeout(() => {
          console.log('이후');
          scollDiv.scrollTop = scollDiv.scrollHeight;
        }, 100);
      }
    }
    */
  },
  roomEscapeScene: null
});