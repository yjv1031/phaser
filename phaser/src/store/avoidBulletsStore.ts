import { observable } from 'mobx';
import { Game } from 'phaser';
import AvoidBulletsScene from '../pages/avoidBullets/avoidBulletsScene';

const setting = {
  height: 500,
  width: 1000,
}

interface AvoidBullets {
  avoidBulletsScene: typeof AvoidBulletsScene|null;
  handleCanvas: () => void;
}

export const AvoidBulletsStore = observable<AvoidBullets>({
  avoidBulletsScene: null,
  handleCanvas() {
    //탭으로 새로 진입할 때마다 게임을 초기화한다
    /* 
    const AvoidBulletsGameDiv: Element | null = document.querySelector('#AvoidBulletsGameDiv');
    if(AvoidBulletsGameDiv != null && AvoidBulletsGameDiv.firstChild != null) {
      AvoidBulletsGameDiv.removeChild(AvoidBulletsGameDiv.firstChild);
    }
    */
    if(this.avoidBulletsScene == null) {
      this.avoidBulletsScene = AvoidBulletsScene;
      this.avoidBulletsScene.gameCreate();
    } else {
      this.avoidBulletsScene.gameDestroy();
      this.avoidBulletsScene.gameCreate();
    }
  }
});