import { observable } from 'mobx';
import { Game } from 'phaser';
import RoomEscapeScene from '../pages/roomEscape/roomEscapeScene';

const setting = {
  height: 500,
  width: 1000,
}

const gameOption = {
}

interface RoomEscape {
  roomEscapeScene: typeof RoomEscapeScene|null;
  handleCanvas: () => void;
}

export const RoomEscapeStore = observable<RoomEscape>({
  roomEscapeScene: null,
  handleCanvas() {
    //다이얼로그 호출
    if(this.roomEscapeScene == null) {
      this.roomEscapeScene = RoomEscapeScene;
      this.roomEscapeScene.gameCreate();
    } else {
      this.roomEscapeScene.gameDestroy();
      this.roomEscapeScene.gameCreate();
    }
  }
});